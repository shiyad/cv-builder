// app/protected/account/subscription/page.tsx
import SubscriptionTable from "@/components/SubscriptionTable";

export default function SubscriptionPage() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Subscription Management</h1>
      <SubscriptionTable />
    </div>
  );
}
