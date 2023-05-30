"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Navigation } from "../components/nav";
// import { Card } from "../components/card";
import { Card } from "../components/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
// import { Slider } from "@radix-ui/react-slider";
import * as Slider from "@radix-ui/react-slider";

export const revalidate = 60;
export default function ProjectsPage() {
  const [budget, setBudget] = useState<[number]>([0]);
  const [cpc, setCPC] = useState<[number]>([0]);
  const [conversionRate, setConversionRate] = useState<[number]>([0]);
  const [conversionToPurchase, setConversionToPurchase] = useState<[number]>([
    0,
  ]);
  const [averageSale, setAverageSale] = useState<[number]>([0]);
  const [roas, setRoas] = useState<number>(0);

  useEffect(() => {
    const budgetValue = budget[0];
    const cpcValue = cpc[0];
    const conversionRateValue = conversionRate[0];
    const conversionToPurchaseValue = conversionToPurchase[0];
    const averageSaleValue = averageSale[0];

    if (
      budgetValue === 0 ||
      cpcValue === 0 ||
      conversionRateValue === 0 ||
      conversionToPurchaseValue === 0 ||
      averageSaleValue === 0
    ) {
      setRoas(0);
      return;
    }

    const clicks = budgetValue / cpcValue;
    const conversions = clicks * (conversionRateValue / 100);
    const purchases = conversions * (conversionToPurchaseValue / 100);
    const revenue = purchases * averageSaleValue;

    setRoas((revenue / budgetValue) * 1);
  }, [budget, cpc, conversionRate, conversionToPurchase, averageSale]);

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-16 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
            The Advertising ROI Calculator
          </h2>
          <p className="mt-4 text-black">
            Paying for clicks to your website is a risk. Who knows if it'll pay
            off? It can feel like buying a lottery ticket. But it doesn’t have
            to. Plan for ad spend success by estimating a few key metrics. Don't
            gamble with your business. Know what kind of ROI you can expect.
          </p>
        </div>
        <div className="w-full h-px bg-black" />
        <div className="grid grid-cols-1 gap-8 mx-auto text-center lg:grid-cols-1">
          <Card>
            <div className="p-4 space-y-4">
              <div>
                <Card>
                  <div className="p-4 space-y-4">
                    <label className="block text-gray-500">
                      YOUR BUDGET
                      <p className="font-bold text-2xl text-black">
                        $ {budget}
                      </p>
                      <Slider.Root
                        className="relative flex items-center w-full h-6 select-none"
                        value={[budget[0]]}
                        onValueChange={(newValues) => setBudget([newValues[0]])}
                        min={0}
                        max={50000}
                      >
                        <Slider.Track className="relative flex-grow h-2 bg-gray-200 rounded-full outline-none">
                          <Slider.Range className="absolute h-full bg-red-600 rounded-full outline-none" />
                        </Slider.Track>
                        <Slider.Thumb
                          className="z-50 block w-4 h-4 font-bold bg-red-600 rounded-full shadow-xl outline-none ring-red-500 focus:ring-4"
                          data-tip="1.0"
                        />
                      </Slider.Root>
                      <div className="flex justify-between w-full mt-2">
                        <p className="text-sm text-gray-500">$ 0 </p>
                        <p className="text-sm text-gray-500">$ 50 000</p>
                      </div>
                    </label>
                  </div>
                </Card>
              </div>

              <div>
                <label className="block text-gray-500">
                  YOUR CPC
                  <p className="font-bold text-2xl text-black">$ {cpc}</p>
                  <Slider.Root
                    className="relative flex items-center w-full h-6 select-none"
                    min={0.1}
                    max={20}
                    step={0.1}
                    value={[cpc[0]]}
                    onValueChange={(newValues) => setCPC([newValues[0]])}
                  >
                    <Slider.Track className="relative flex-grow h-2 bg-gray-200 rounded-full outline-none">
                      <Slider.Range className="absolute h-full bg-red-600 rounded-full outline-none" />
                    </Slider.Track>
                    <Slider.Thumb
                      className="z-50 block w-4 h-4 font-bold bg-red-600 rounded-full shadow-xl outline-none ring-red-500 focus:ring-4"
                      data-tip="1.0"
                    />
                  </Slider.Root>
                  <div className="flex justify-between w-full mt-2">
                    <p className="text-sm text-gray-500">$ {0.1}</p>
                    <p className="text-sm text-gray-500">$ {20}</p>
                  </div>
                </label>
              </div>

              <div>
                <label className="block text-gray-500">
                  YOUR ESTIMATED CONVERSION RATE:
                  <p className="font-bold text-2xl text-black">
                    {conversionRate} %
                  </p>
                  <Slider.Root
                    className="relative flex items-center w-full h-6 select-none"
                    value={[conversionRate[0]]}
                    onValueChange={(newValues) =>
                      setConversionRate([newValues[0]])
                    }
                  >
                    <Slider.Track className="relative flex-grow h-2 bg-gray-200 rounded-full outline-none">
                      <Slider.Range className="absolute h-full bg-red-600 rounded-full outline-none" />
                    </Slider.Track>
                    <Slider.Thumb
                      className="z-50 block w-4 h-4 font-bold bg-red-600 rounded-full shadow-xl outline-none ring-red-500 focus:ring-4"
                      data-tip="1.0"
                    />
                  </Slider.Root>
                  <div className="flex justify-between w-full mt-2">
                    <p className="text-sm text-gray-500">{0}%</p>
                    <p className="text-sm text-gray-500">{100}%</p>
                  </div>
                </label>
              </div>
              <div>
                <label className="block text-gray-500">
                  YOUR CONVERSION TO PURCHASE RATE
                  <p className="font-bold text-2xl text-black">
                    {conversionToPurchase} %
                  </p>
                  <Slider.Root
                    className="relative flex items-center w-full h-6 select-none"
                    value={[conversionToPurchase[0]]}
                    onValueChange={(newValues) =>
                      setConversionToPurchase([newValues[0]])
                    }
                  >
                    <Slider.Track className="relative flex-grow h-2 bg-gray-200 rounded-full outline-none">
                      <Slider.Range className="absolute h-full bg-red-600 rounded-full outline-none" />
                    </Slider.Track>
                    <Slider.Thumb
                      className="z-50 block w-4 h-4 font-bold bg-red-600 rounded-full shadow-xl outline-none ring-red-500 focus:ring-4"
                      data-tip="1.0"
                    />
                  </Slider.Root>
                  <div className="flex justify-between w-full mt-2">
                    <p className="text-sm text-gray-500">{0}%</p>
                    <p className="text-sm text-gray-500">{100}%</p>
                  </div>
                </label>
              </div>

              <div>
                <label className="block text-gray-500">
                  YOUR BUDGET
                  <p className="font-bold text-2xl text-black">
                    $ {averageSale}{" "}
                  </p>
                  <Slider.Root
                    className="relative flex items-center w-full h-6 select-none"
                    min={0}
                    max={1000}
                    value={[averageSale[0]]}
                    onValueChange={(newValues) =>
                      setAverageSale([newValues[0]])
                    }
                  >
                    <Slider.Track className="relative flex-grow h-2 bg-gray-200 rounded-full outline-none">
                      <Slider.Range className="absolute h-full bg-red-600 rounded-full outline-none" />
                    </Slider.Track>
                    <Slider.Thumb
                      className="z-50 block w-4 h-4 font-bold bg-red-600 rounded-full shadow-xl outline-none ring-red-500 focus:ring-4"
                      data-tip="1.0"
                    />
                  </Slider.Root>
                  <div className="flex justify-between w-full mt-2">
                    <p className="text-sm text-gray-500">$ {0}</p>
                    <p className="text-sm text-gray-500">$ {5000}</p>
                  </div>
                </label>
              </div>
            </div>
          </Card>
          <div className="md:max-w-[10px] sm:max-w-auto mx-10 lg:mx-0 ">
            <h2 className="text-3xl font-semibold tracking-light text-black sm:text-4xl">
              RESULTS
            </h2>
          </div>

          <div className="flex flex-col w-full gap-8  mx-auto border-t border-gray-900/10  lg:mx-0  lg:border-t-0 ">
            <Card>
              <p className="text-xl font-bold">ROAS: {roas.toFixed(0)} %</p>
            </Card>
            <Card>123</Card>
          </div>
        </div>
        <div className="hidden w-full h-px md:block bg-white" />
      </div>
    </div>
  );
}
