"use client";

import { useMemo, useState } from "react";
import StepsList from "@/components/tools/shared/StepsList";
import ToolPanel from "@/components/ui/ToolPanel";

export type Marketplace = "etsy" | "amazon-fba" | "ebay" | "paypal";

const LABELS: Record<Marketplace, string> = {
  etsy: "Etsy",
  "amazon-fba": "Amazon FBA",
  ebay: "eBay",
  paypal: "PayPal",
};

export default function SellerFeeCalculator({
  marketplace,
}: {
  marketplace: Marketplace;
}) {
  const [price, setPrice] = useState("40");
  const [shipping, setShipping] = useState("5");
  const [cost, setCost] = useState("12");

  const result = useMemo(() => {
    const p = Number(price);
    const ship = Number(shipping) || 0;
    const c = Number(cost) || 0;
    if (!(p >= 0)) return null;
    const total = p + ship;
    let fees = 0;
    const steps: string[] = [];

    if (marketplace === "etsy") {
      const listing = 0.2;
      const transaction = 0.065;
      const processing = 0.03;
      const processingFixed = 0.25;
      fees = listing + p * transaction + total * processing + processingFixed;
      steps.push(
        `Rates as of 2026: listing $${listing}, transaction ${transaction * 100}%, processing ${processing * 100}% + $${processingFixed}.`,
        `Fees ≈ ${fees.toFixed(2)}.`,
      );
    } else if (marketplace === "amazon-fba") {
      const referral = 0.15;
      const fbaPerUnit = 3.5;
      fees = p * referral + fbaPerUnit;
      steps.push(
        `Rates as of 2026: referral ~${referral * 100}% + FBA fulfillment ~$${fbaPerUnit}/unit (illustrative).`,
        `Fees ≈ ${fees.toFixed(2)}.`,
      );
    } else if (marketplace === "ebay") {
      const finalValue = 0.1325;
      fees = total * finalValue;
      steps.push(
        `Rates as of 2026: final value ~${finalValue * 100}% of total (simplified).`,
        `Fees ≈ ${fees.toFixed(2)}.`,
      );
    } else {
      const percent = 0.0299;
      const fixed = 0.49;
      fees = total * percent + fixed;
      steps.push(
        `Rates as of 2026: ${percent * 100}% + $${fixed} per transaction (illustrative).`,
        `Fees ≈ ${fees.toFixed(2)}.`,
      );
    }

    const net = total - fees - c;
    steps.push(
      `Net ≈ price + shipping − fees − product cost = ${net.toFixed(2)}.`,
    );
    return { fees, net, total, steps };
  }, [marketplace, price, shipping, cost]);

  function clearInputs() {
    setPrice("");
    setShipping("");
    setCost("");
  }

  return (
    <div className="space-y-6">
      <ToolPanel title={`${LABELS[marketplace]} fee estimate`} onClear={clearInputs}>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium">Item price ($)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Shipping charged ($)
            </label>
            <input
              type="number"
              value={shipping}
              onChange={(e) => setShipping(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Your product cost ($)
            </label>
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
        </div>
        <p className="mt-2 text-xs text-zinc-500">
          Simplified fee model — marketplace programs and categories differ.
          Update rate tables yearly.
        </p>
      </ToolPanel>
      {result && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 p-5 text-center dark:border-zinc-800">
              <p className="text-sm text-zinc-500">Est. fees</p>
              <p className="text-3xl font-bold text-indigo-600">
                ${result.fees.toFixed(2)}
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 p-5 text-center dark:border-zinc-800">
              <p className="text-sm text-zinc-500">Est. net</p>
              <p className="text-3xl font-bold text-indigo-600">
                ${result.net.toFixed(2)}
              </p>
            </div>
          </div>
          <StepsList steps={result.steps} />
        </>
      )}
    </div>
  );
}
