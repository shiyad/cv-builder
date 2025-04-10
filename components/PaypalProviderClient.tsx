// components/PaypalProviderClient.tsx
"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from "react";

const PaypalProviderClient = ({ children }: { children: React.ReactNode }) => {
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "Af2FJv44DVHcuBW4VSVE4LSCLUDsC_iFES9Dyi8OB5rDIZN_wOt1Wp5qfFvYfazoPM6go5Yg869a_0rN",
        vault: true,
        intent: "subscription",
      }}
    >
      {children}
    </PayPalScriptProvider>
  );
};

export default PaypalProviderClient;
