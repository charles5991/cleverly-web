"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const revalidate = 60;
export default function ProjectsPage() {
  const [budget, setBudget] = useState(0);
  const [cpc, setCPC] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);
  const [conversionToPurchase, setConversionToPurchase] = useState(0);
  const [averageSale, setAverageSale] = useState(0);
  const [roas, setRoas] = useState(0);

  useEffect(() => {
    const clicks = budget / cpc;
    const conversions = clicks * (conversionRate / 100);
    const purchases = conversions * (conversionToPurchase / 100);
    const revenue = purchases * averageSale;

    setRoas(revenue / budget);
  }, [budget, cpc, conversionRate, conversionToPurchase, averageSale]);

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-16 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
            The Advertising ROI Calculator{" "}
          </h2>
          <p className="mt-4 text-black">
            Paying for clicks to your website is a risk. Who knows if it'll pay
            off? It can feel like buying a lottery ticket. But it doesn’t have
            to. Plan for ad spend success by estimating a few key metrics. Don't
            gamble with your business. Know what kind of ROI you can expect.{" "}
          </p>
        </div>
        <div className="w-full h-px bg-black" />
        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
          <Card>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-gray-700">
                  Budget:
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="block w-full mt-1"
                  />
                </label>
                <p>Your Budget: {budget} USD</p>
              </div>

              <div>
                <label className="block text-gray-700">
                  Cost per Click (CPC):
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={cpc}
                    onChange={(e) => setCPC(Number(e.target.value))}
                    className="block w-full mt-1"
                  />
                </label>
                <p>Your CPC: {cpc} USD</p>
              </div>

              <div>
                <label className="block text-gray-700">
                  Estimated Conversion Rate (%):
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={conversionRate}
                    onChange={(e) => setConversionRate(Number(e.target.value))}
                    className="block w-full mt-1"
                  />
                </label>
                <p>Your Estimated Conversion Rate: {conversionRate} %</p>
              </div>

              <div>
                <label className="block text-gray-700">
                  Conversion to Purchase Rate (%):
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={conversionToPurchase}
                    onChange={(e) =>
                      setConversionToPurchase(Number(e.target.value))
                    }
                    className="block w-full mt-1"
                  />
                </label>
                <p>
                  Your Conversion to Purchase Rate: {conversionToPurchase} %
                </p>
              </div>

              <div>
                <label className="block text-gray-700">
                  Average Sale per Customer:
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={averageSale}
                    onChange={(e) => setAverageSale(Number(e.target.value))}
                    className="block w-full mt-1"
                  />
                </label>
                <p>Your Average Sale per Customer: {averageSale} USD</p>
              </div>

              <p className="text-xl font-bold">ROAS: {roas}</p>
            </div>
          </Card>

          <div className="flex flex-col w-full gap-8  mx-auto border-t border-gray-900/10  lg:mx-0  lg:border-t-0 ">
            <Card>
              <p className="text-xl font-bold">ROAS: {roas}</p>
            </Card>
            <Card>123</Card>
          </div>
        </div>
        <div className="hidden w-full h-px md:block bg-white" />
      </div>
    </div>
  );
}
