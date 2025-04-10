// components/CryptoPayment.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface CryptoPaymentProps {
  amount: number;
  currency: string;
  onSuccess: (txHash: string, amount: number) => void;
  onError: (error: string) => void;
}

export function CryptoPayment({
  amount,
  currency,
  onSuccess,
  onError,
}: CryptoPaymentProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [network, setNetwork] = useState("");
  const [balance, setBalance] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentStep, setPaymentStep] = useState<
    "connect" | "confirm" | "complete"
  >("connect");
  const [txHash, setTxHash] = useState("");

  // Check if wallet is connected on component mount
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length > 0) {
            setIsConnected(true);
            setWalletAddress(accounts[0]);
            await updateWalletInfo(accounts[0]);
          }
        } catch (err) {
          console.error("Error checking wallet connection:", err);
        }
      }
    };

    checkWalletConnection();

    // Set up event listeners
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, []);

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      // Wallet disconnected
      setIsConnected(false);
      setWalletAddress("");
      setPaymentStep("connect");
    } else {
      setWalletAddress(accounts[0]);
      updateWalletInfo(accounts[0]);
    }
  };

  const handleChainChanged = () => {
    window.location.reload();
  };

  const updateWalletInfo = async (address: string) => {
    try {
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      setNetwork(getNetworkName(chainId));

      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      });
      setBalance(formatBalance(balance));
    } catch (err) {
      console.error("Error updating wallet info:", err);
    }
  };

  const getNetworkName = (chainId: string) => {
    switch (chainId) {
      case "0x1":
        return "Ethereum Mainnet";
      case "0x5":
        return "Goerli Testnet";
      case "0xaa36a7":
        return "Sepolia Testnet";
      case "0x89":
        return "Polygon Mainnet";
      case "0x13881":
        return "Mumbai Testnet";
      default:
        return `Unknown Network (${chainId})`;
    }
  };

  const formatBalance = (weiBalance: string) => {
    // Convert wei to ETH (1 ETH = 10^18 wei)
    const ethBalance = parseInt(weiBalance) / 10 ** 18;
    return ethBalance.toFixed(4);
  };

  const connectWallet = async () => {
    try {
      setLoading(true);

      if (!window.ethereum) {
        throw new Error("No Ethereum provider found. Please install MetaMask.");
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setIsConnected(true);
      setWalletAddress(accounts[0]);
      await updateWalletInfo(accounts[0]);
      setPaymentStep("confirm");
    } catch (err) {
      onError(err instanceof Error ? err.message : "Failed to connect wallet");
    } finally {
      setLoading(false);
    }
  };

  const sendPayment = async () => {
    try {
      setLoading(true);

      // Convert amount to wei (assuming currency is ETH)
      // In a real app, you would handle different tokens and currencies
      const amountInWei = Math.floor(amount * 10 ** 18).toString(16);

      // Replace with your actual payment receiver address
      const receiverAddress = "0x7Efb1F2a948671E3BeE401640e30BBB835D34cfd"; //"0xYourBusinessWalletAddress";

      // Send transaction
      const tx = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: walletAddress,
            to: receiverAddress,
            value: `0x${amountInWei}`,
            gas: "0x5208", // 21000 Gwei
          },
        ],
      });

      setTxHash(tx);
      setPaymentStep("complete");
      onSuccess(tx, amount);
    } catch (err) {
      onError(err instanceof Error ? err.message : "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {paymentStep === "connect" && (
        <div className="text-center">
          <h4 className="text-lg font-semibold mb-4">Connect Your Wallet</h4>
          <p className="text-sm text-gray-600 mb-6">
            Connect your crypto wallet to pay with cryptocurrency
          </p>
          <Button onClick={connectWallet} disabled={loading} className="w-full">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
            Connect Wallet
          </Button>
        </div>
      )}

      {paymentStep === "confirm" && (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Payment Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Amount:</span>
                <span>
                  {amount} {currency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Network:</span>
                <span>{network}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Your Balance:</span>
                <span>{balance} ETH</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">From:</span>
                <span className="truncate max-w-[150px]">{walletAddress}</span>
              </div>
            </div>
          </div>

          <Button onClick={sendPayment} disabled={loading} className="w-full">
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Confirm Payment
          </Button>
        </div>
      )}

      {paymentStep === "complete" && (
        <div className="text-center">
          <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h4 className="text-lg font-semibold mb-2">Payment Successful!</h4>
          <p className="text-sm text-gray-600 mb-4">
            Your transaction has been completed.
          </p>
          {txHash && (
            <div className="bg-gray-50 p-3 rounded-lg break-all text-xs mb-4">
              <p className="font-medium mb-1">Transaction Hash:</p>
              <p>{txHash}</p>
            </div>
          )}
          <Button variant="outline" className="w-full">
            Done
          </Button>
        </div>
      )}
    </div>
  );
}
