"use client";

import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface CryptoButtonsProps {
  amount: number;
  currency: string;
  onSuccess: (txHash: string, amount: number) => void;
  onError: (error: string) => void;
}

export function CryptoButtons({
  amount,
  currency,
  onSuccess,
  onError,
}: CryptoButtonsProps) {
  const [selectedCrypto, setSelectedCrypto] = useState<
    "btc" | "eth" | "usdt" | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [qrCode, setQrCode] = useState("");

  // This would be replaced with actual integration to your crypto payment processor
  const handleCryptoSelection = async (crypto: "btc" | "eth" | "usdt") => {
    try {
      setLoading(true);
      setSelectedCrypto(crypto);

      // In a real implementation, you would call your backend API
      // to generate a payment address and QR code
      // This is just a mock implementation

      // Mock address generation
      const mockAddresses: Record<string, string> = {
        btc: "3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5",
        eth: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
        usdt: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F", // USDT on Ethereum
      };

      const mockQrCodes: Record<string, string> = {
        btc: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=bitcoin:${mockAddresses.btc}?amount=${amount}`,
        eth: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ethereum:${mockAddresses.eth}?value=${amount}`,
        usdt: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ethereum:${mockAddresses.usdt}?value=${amount}`,
      };

      setAddress(mockAddresses[crypto]);
      setQrCode(mockQrCodes[crypto]);

      // In a real app, you would poll your backend to check for payment confirmation
      // This is just a mock - you would implement proper payment verification
    } catch (err) {
      onError("Failed to generate payment address");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentConfirmation = () => {
    // In a real app, this would be called after verifying the payment
    // For demo purposes, we'll just simulate a successful payment
    const mockTxHash = `0x${Math.random().toString(16).substr(2, 64)}`;
    onSuccess(mockTxHash, amount);
  };

  return (
    <div className="space-y-4">
      {!selectedCrypto ? (
        <div className="space-y-2">
          <h6 className="text-sm font-medium">Select cryptocurrency:</h6>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="outline"
              onClick={() => handleCryptoSelection("btc")}
              disabled={loading}
            >
              Bitcoin
            </Button>
            <Button
              variant="outline"
              onClick={() => handleCryptoSelection("eth")}
              disabled={loading}
            >
              Ethereum
            </Button>
            <Button
              variant="outline"
              onClick={() => handleCryptoSelection("usdt")}
              disabled={loading}
            >
              USDT
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h6 className="text-sm font-medium">
              Pay with {selectedCrypto.toUpperCase()}
            </h6>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCrypto(null)}
            >
              Change
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Send {amount} {currency} worth of{" "}
                  {selectedCrypto.toUpperCase()}
                </p>
                {qrCode && (
                  <div className="flex justify-center mb-4">
                    <img
                      src={qrCode}
                      alt="Payment QR Code"
                      className="w-48 h-48"
                    />
                  </div>
                )}
                <p className="text-sm font-mono bg-gray-100 p-2 rounded break-all">
                  {address}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Network fee may apply
                </p>
              </div>

              <div className="pt-4">
                <Button className="w-full" onClick={handlePaymentConfirmation}>
                  I've sent the payment
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
