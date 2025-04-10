"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Loader2, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { Tables } from "@/types/supabase/types";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { CryptoButtons } from "./CryptoButtons"; // We'll create this component
import { CryptoPayment } from "./CryptoPayment";

export default function SubscriptionTable() {
  const supabase = createClient();
  const [subscription, setSubscription] =
    useState<Tables<"user_subscriptions"> | null>(null);
  const [plans, setPlans] = useState<Tables<"subscription_plans">[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedCycle, setSelectedCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [paymentMethod, setPaymentMethod] = useState<
    "paypal" | "crypto" | null
  >(null);
  const [{ isPending: isPayPalPending }, paypalDispatch] =
    usePayPalScriptReducer();

  useEffect(() => {
    fetchSubscriptionData();
  }, []);

  const fetchSubscriptionData = async () => {
    try {
      setLoading(true);

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch user's active subscription
      const { data: subscriptionData } = await supabase
        .from("user_subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .eq("status", "active")
        .single();

      // Fetch all available plans
      const { data: plansData } = await supabase
        .from("subscription_plans")
        .select("*")
        .order("price_monthly");

      setSubscription(subscriptionData);
      setPlans(plansData || []);
    } catch (err) {
      setError("Failed to load subscription data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createSubscriptionRecord = async (
    planId: string,
    billingCycle: "monthly" | "yearly",
    paymentMethod: string
  ) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    // First cancel any existing subscription
    if (subscription) {
      await supabase
        .from("user_subscriptions")
        .update({
          status: "canceled",
          updated_at: new Date().toISOString(),
        })
        .eq("id", subscription.id);
    }

    // Create new subscription
    const plan = plans.find((p) => p.id === planId);
    if (!plan) throw new Error("Plan not found");

    const now = new Date();
    const periodEnd = new Date();
    periodEnd.setMonth(
      periodEnd.getMonth() + (billingCycle === "yearly" ? 12 : 1)
    );

    const { data: newSubscription } = await supabase
      .from("user_subscriptions")
      .insert([
        {
          user_id: user.id,
          plan_id: planId,
          status: "active",
          billing_cycle: billingCycle,
          current_period_start: now.toISOString(),
          current_period_end: periodEnd.toISOString(),
          cancel_at_period_end: false,
          payment_method: paymentMethod,
        },
      ])
      .select()
      .single();

    setSubscription(newSubscription);

    // Log activity
    await supabase.from("activity_log").insert([
      {
        user_id: user.id,
        activity_type: "Subscription updated",
        details: {
          plan: plan.name,
          billing_cycle: billingCycle,
          payment_method: paymentMethod,
        },
      },
    ]);

    return newSubscription;
  };

  const handlePayPalPaymentSuccess = async (details: any) => {
    try {
      setUpdating(true);

      if (!selectedPlan) throw new Error("No plan selected");

      debugger;

      const subscription = await createSubscriptionRecord(
        selectedPlan,
        selectedCycle,
        "paypal"
      );

      // You might want to store the PayPal subscription ID
      if (details.subscriptionID) {
        await supabase
          .from("user_subscriptions")
          .update({
            payment_reference: details.subscriptionID,
          })
          .eq("id", subscription.id);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to process PayPal payment"
      );
      console.error(err);
    } finally {
      setUpdating(false);
      setPaymentMethod(null);
    }
  };

  // const handleCryptoPaymentSuccess = async (txHash: string, amount: number) => {
  //   try {
  //     setUpdating(true);

  //     if (!selectedPlan) throw new Error("No plan selected");

  //     const subscription = await createSubscriptionRecord(
  //       selectedPlan,
  //       selectedCycle,
  //       "crypto"
  //     );

  //     // Store the transaction hash
  //     await supabase
  //       .from("user_subscriptions")
  //       .update({
  //         payment_reference: txHash,
  //         payment_amount: amount,
  //       })
  //       .eq("id", subscription.id);
  //   } catch (err) {
  //     setError(
  //       err instanceof Error ? err.message : "Failed to process crypto payment"
  //     );
  //     console.error(err);
  //   } finally {
  //     setUpdating(false);
  //     setPaymentMethod(null);
  //   }
  // };

  // Update the handleCryptoPaymentSuccess function in SubscriptionTable:
  const handleCryptoPaymentSuccess = async (txHash: string, amount: number) => {
    try {
      setUpdating(true);

      if (!selectedPlan) throw new Error("No plan selected");

      const subscription = await createSubscriptionRecord(
        selectedPlan,
        selectedCycle,
        "crypto"
      );

      // Store the transaction hash
      await supabase
        .from("user_subscriptions")
        .update({
          payment_reference: txHash,
          payment_amount: amount,
        })
        .eq("id", subscription.id);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to process crypto payment"
      );
      console.error(err);
    } finally {
      setUpdating(false);
      setPaymentMethod(null);
    }
  };

  const handleCancel = async () => {
    if (!subscription) return;

    try {
      setUpdating(true);
      setError(null);

      await supabase
        .from("user_subscriptions")
        .update({
          status: "canceled",
          updated_at: new Date().toISOString(),
        })
        .eq("id", subscription.id);

      setSubscription(null);

      // Log activity
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("activity_log").insert([
          {
            user_id: user.id,
            activity_type: "Subscription canceled",
          },
        ]);
      }
    } catch (err) {
      setError("Failed to cancel subscription");
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const getPayPalPlanId = (planId: string, cycle: "monthly" | "yearly") => {
    // Map your database plan IDs to PayPal plan IDs
    const paypalPlans: Record<string, Record<string, string>> = {
      "bffe2330-daea-49b3-9dcd-505ad5a87d50": {
        // Premium plan ID from your DB
        monthly: "P-93X27371UW5678442M73YYJI", // Replace with actual PayPal monthly plan ID
        yearly: "P-4T052535TK328421VM73YY6A", // Replace with actual PayPal yearly plan ID
      },
      "a24fb135-c111-4517-8f57-dd801a11a9a5": {
        // Enterprise plan ID from your DB
        monthly: "P-ENTERPRISE-MONTHLY-ID", // Replace with actual PayPal monthly plan ID
        yearly: "P-ENTERPRISE-YEARLY-ID", // Replace with actual PayPal yearly plan ID
      },
    };

    // Debug logging
    console.log("Mapping plan:", {
      databasePlanId: planId,
      cycle,
      availablePlans: Object.keys(paypalPlans),
    });

    const paypalPlanId = paypalPlans[planId]?.[cycle];

    if (!paypalPlanId) {
      throw new Error(
        `PayPal plan not configured for database plan ID ${planId} (${cycle})`
      );
    }

    return paypalPlanId;
  };

  const getAmount = (planId: string, cycle: "monthly" | "yearly"): string => {
    const plan = plans.find((p) => p.id === planId);
    if (!plan) return "0";

    if (cycle === "yearly") {
      return plan.price_yearly?.toString() ?? "0";
    }

    return plan.price_monthly?.toString() ?? "0";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircle className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <div className="mt-2 text-sm text-red-700">{error}</div>
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={fetchSubscriptionData}
              >
                Retry
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Current Subscription */}
      {subscription ? (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Current Subscription
            </h3>
          </div>
          <div className="px-6 py-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h4 className="text-lg font-medium">
                  {plans.find((p) => p.id === subscription.plan_id)?.name ||
                    "Unknown Plan"}
                </h4>
                <p className="mt-1 text-sm text-gray-500">
                  Billing:{" "}
                  {subscription.billing_cycle === "yearly"
                    ? "Yearly"
                    : "Monthly"}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Payment Method:{" "}
                  {subscription.payment_method === "paypal"
                    ? "PayPal"
                    : subscription.payment_method === "crypto"
                      ? "Crypto"
                      : "Unknown"}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Status:{" "}
                  <span className="font-medium text-green-600">Active</span>
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Renews:{" "}
                  {new Date(
                    subscription.current_period_end
                  ).toLocaleDateString()}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button
                  variant="destructive"
                  onClick={handleCancel}
                  disabled={updating}
                >
                  {updating ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  Cancel Subscription
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-md bg-yellow-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                No active subscription
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                You're currently on the free plan with limited features.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Available Plans */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Available Plans
          </h3>
        </div>
        <div className="px-6 py-5">
          {paymentMethod ? (
            <div className="mb-6">
              <Button
                variant="outline"
                onClick={() => setPaymentMethod(null)}
                className="mb-4"
              >
                ← Back to plans
              </Button>
              <h4 className="text-xl font-bold mb-2">
                {plans.find((p) => p.id === selectedPlan)?.name} -{" "}
                {selectedCycle === "yearly" ? "Yearly" : "Monthly"}
              </h4>
              <p className="text-gray-600 mb-6">
                $
                {selectedCycle === "yearly"
                  ? plans.find((p) => p.id === selectedPlan)?.price_yearly
                  : plans.find((p) => p.id === selectedPlan)?.price_monthly}
              </p>
              {paymentMethod === "paypal" && (
                <div className="border rounded-lg p-6">
                  <h5 className="text-lg font-semibold mb-4">
                    Pay with PayPal
                  </h5>
                  {isPayPalPending ? (
                    <Loader2 className="h-8 w-8 animate-spin" />
                  ) : (
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      createSubscription={(data, actions) => {
                        return actions.subscription.create({
                          plan_id: getPayPalPlanId(
                            selectedPlan!,
                            selectedCycle
                          ),
                        });
                      }}
                      onApprove={async (data, actions) => {
                        if (actions.subscription) {
                          const details = await actions.subscription.get();
                          handlePayPalPaymentSuccess(details);
                        }
                      }}
                      onError={(err) => {
                        setError("PayPal payment failed: " + err.toString());
                        setPaymentMethod(null);
                      }}
                    />
                  )}
                </div>
              )}

              {paymentMethod === "crypto" && (
                <div className="border rounded-lg p-6">
                  <h5 className="text-lg font-semibold mb-4">
                    Pay with Cryptocurrency
                  </h5>
                  <CryptoPayment
                    amount={parseFloat(getAmount(selectedPlan!, selectedCycle))}
                    currency="USD"
                    onSuccess={handleCryptoPaymentSuccess}
                    onError={(err) => {
                      setError("Crypto payment failed: " + err);
                      setPaymentMethod(null);
                    }}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {plans
                .filter((p) => p.is_active)
                .map((plan) => (
                  <div key={plan.id} className="border rounded-lg p-6">
                    <h4 className="text-xl font-bold">{plan.name}</h4>
                    <p className="mt-2 text-gray-600">{plan.description}</p>

                    <div className="mt-4">
                      <h5 className="text-lg font-semibold">
                        ${plan.price_monthly}
                        <span className="text-sm font-normal text-gray-500">
                          /month
                        </span>
                      </h5>
                      {plan.price_yearly !== null &&
                        plan.price_monthly !== null &&
                        plan.price_monthly > 0 && (
                          <p className="text-sm text-gray-500">
                            or ${plan.price_yearly}/year (save{" "}
                            {Math.round(
                              100 -
                                (plan.price_yearly /
                                  (plan.price_monthly * 12)) *
                                  100
                            )}
                            %)
                          </p>
                        )}
                    </div>

                    <ul className="mt-6 space-y-2">
                      {Array.isArray(plan.features) &&
                        plan.features.every((f) => typeof f === "string") &&
                        plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                    </ul>

                    <div className="mt-6 space-y-2">
                      {plan.price_monthly === 0 ? (
                        <div className="text-center text-sm text-gray-600 font-medium">
                          🎉 You are on the Free Plan
                        </div>
                      ) : (
                        <>
                          <Button
                            className="w-full"
                            onClick={() => {
                              setSelectedPlan(plan.id);
                              setSelectedCycle("monthly");
                              setPaymentMethod("paypal");
                            }}
                            disabled={
                              updating ||
                              (subscription?.plan_id === plan.id &&
                                subscription?.billing_cycle === "monthly")
                            }
                          >
                            {updating &&
                            subscription?.plan_id === plan.id &&
                            subscription?.billing_cycle === "monthly" ? (
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : null}
                            {subscription?.plan_id === plan.id &&
                            subscription?.billing_cycle === "monthly"
                              ? "Current Plan"
                              : "Pay with PayPal (Monthly)"}
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => {
                              setSelectedPlan(plan.id);
                              setSelectedCycle("yearly");
                              setPaymentMethod("paypal");
                            }}
                            disabled={
                              updating ||
                              (subscription?.plan_id === plan.id &&
                                subscription?.billing_cycle === "yearly")
                            }
                          >
                            {updating &&
                            subscription?.plan_id === plan.id &&
                            subscription?.billing_cycle === "yearly" ? (
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : null}
                            {subscription?.plan_id === plan.id &&
                            subscription?.billing_cycle === "yearly"
                              ? "Current Plan"
                              : "Pay with PayPal (Yearly)"}
                          </Button>
                          <div className="pt-2 text-center text-sm text-gray-500">
                            or
                          </div>
                          <Button
                            variant="secondary"
                            className="w-full"
                            onClick={() => {
                              setSelectedPlan(plan.id);
                              setSelectedCycle("monthly");
                              setPaymentMethod("crypto");
                            }}
                          >
                            Pay with Crypto (Monthly)
                          </Button>
                          {plan.price_yearly && (
                            <Button
                              variant="secondary"
                              className="w-full"
                              onClick={() => {
                                setSelectedPlan(plan.id);
                                setSelectedCycle("yearly");
                                setPaymentMethod("crypto");
                              }}
                            >
                              Pay with Crypto (Yearly)
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Features Comparison */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Plan Comparison
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Feature
                </th>
                {plans
                  .filter((p) => p.is_active)
                  .map((plan) => (
                    <th
                      key={plan.id}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {plan.name}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Max CVs
                </td>
                {plans
                  .filter((p) => p.is_active)
                  .map((plan) => (
                    <td
                      key={plan.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {plan.max_cvs === null ? "Unlimited" : plan.max_cvs}
                    </td>
                  ))}
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Max Templates
                </td>
                {plans
                  .filter((p) => p.is_active)
                  .map((plan) => (
                    <td
                      key={plan.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {plan.max_templates === null ? "All" : plan.max_templates}
                    </td>
                  ))}
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  PDF Export
                </td>
                {plans
                  .filter((p) => p.is_active)
                  .map((plan) => (
                    <td
                      key={plan.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {plan.can_export_pdf ? "✓" : "✗"}
                    </td>
                  ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
