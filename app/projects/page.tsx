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
  const [clicks, setClicks] = useState<number>(0);
  const [conversions, setConversions] = useState<number>(0);
  const [purchases, setPurchases] = useState<number>(0);
  const [revenue, setRevenue] = useState<number>(0);

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
      setClicks(0);
      setConversions(0);
      setPurchases(0);
      setRevenue(0);
      return;
    }

    const calculatedClicks = budgetValue / cpcValue;
    const calculatedConversions =
      calculatedClicks * (conversionRateValue / 100);
    const calculatedPurchases =
      calculatedConversions * (conversionToPurchaseValue / 100);
    const calculatedRevenue = calculatedPurchases * averageSaleValue;

    setClicks(calculatedClicks);
    setConversions(calculatedConversions);
    setPurchases(calculatedPurchases);
    setRevenue(calculatedRevenue);
    setRoas((calculatedRevenue / budgetValue) * 100);
    setRoas((revenue / budgetValue) * 1);
  }, [budget, cpc, conversionRate, conversionToPurchase, averageSale]);

  return (
    <div className="relative pb-16">
      {/* <Navigation /> */}
      <div className="px-6 pt-16 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        {/* <div className="max-w-2xl mx-auto lg:mx-0">
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
        <div className="w-full h-px bg-black" /> */}
        <div className="md:grid md:grid-cols-1 gap-8 mx-auto text-center lg:grid-cols-1">
          <div className="p-4 space-y-4">
            <div>
              <Card>
                <div className=" space-y-4 flex-grow-0 flex-shrink-0">
                  <div className="flex items-center bg-blue-800">
                    <img
                      src="./budget.png"
                      width={70}
                      className="my-6 mx-8"
                    ></img>
                    <p className="text-white w-50 text-lg font-semibold">
                      BUDGET
                    </p>
                    <div className="flex-grow">
                      <p className="text-white text-sm text-center flex-grow-0 flex-shrink-0 pr-16">
                        The total amount of money allocated for advertising
                        expenses during a specific period.
                      </p>
                    </div>
                  </div>

                  <label className="block text-gray-500 px-6 pb-2">
                    YOUR BUDGET
                    <p className="font-bold text-2xl text-black">$ {budget}</p>
                    <Slider.Root
                      className="relative flex items-center w-full h-6 select-none"
                      value={[budget[0]]}
                      onValueChange={(newValues) => setBudget([newValues[0]])}
                      min={0}
                      max={50000}
                      step={10}
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
              <Card>
                <div className=" space-y-4 ">
                  <div className="flex items-center bg-blue-800">
                    <img src="./cpc.png" width={50} className="my-6 mx-8"></img>
                    <p className="text-white w-50 text-lg font-semibold">
                      COST PER CLICK (CPC)
                    </p>
                    <div className="flex-grow">
                      <p className="text-white text-sm text-center flex-grow-0 flex-shrink-0 pr-16">
                        The average estimated cost incurred for each click on an
                        advertisement.
                      </p>
                    </div>
                  </div>
                  <label className="block text-gray-500 px-6 pb-2">
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
              </Card>
            </div>

            <div>
              <Card>
                <div className=" space-y-4">
                  <div className="flex items-center bg-blue-800">
                    <img
                      src="./Estimated.png"
                      width={80}
                      className="my-6 mx-8"
                    ></img>
                    <p className="text-white w-50 text-lg font-semibold pr-20">
                      ESTIMATED CONVERSION RATE
                    </p>
                    <div className="flex-grow">
                      <p className="text-white text-sm text-center flex-grow-0 flex-shrink-0 pr-16">
                        The anticipated percentage of website visitors who are
                        expected to take a desired action, such as making a
                        purchase or filling out a form. This action is based on
                        the percentage that convert after entering site.
                      </p>
                    </div>
                  </div>
                  <label className="block text-gray-500 px-6 pb-2">
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
              </Card>
            </div>

            <div>
              <Card>
                <div className=" space-y-4">
                  <div className="flex items-center bg-blue-800">
                    <img
                      src="./Conversion.png"
                      width={70}
                      className="my-6 mx-8"
                    ></img>
                    <p className="text-white w-50 text-lg font-semibold">
                      CONVERSION TO PURCHASE RATE
                    </p>
                    <div className="flex-grow">
                      <p className="text-white text-sm text-center flex-grow-0 flex-shrink-0 pr-16">
                        The expected percentage of conversions or desired
                        actions (e.g., form submissions) that are likely to
                        result in a completed purchase. This is the action of
                        purchase after converting on website.
                      </p>
                    </div>
                  </div>
                  <label className="block text-gray-500 px-6 pb-2">
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
              </Card>
            </div>

            <div>
              <Card>
                <div className=" space-y-4">
                  <div className="flex items-center bg-blue-800">
                    <img
                      src="./average.png"
                      width={70}
                      className="my-6 mx-8"
                    ></img>
                    <p className="text-white w-50 text-lg font-semibold">
                      AVERAGE SALE PER CUSTOMER
                    </p>
                    <div className="flex-grow">
                      <p className="text-white text-sm text-center flex-grow-0 flex-shrink-0 pr-16">
                        The average monetary value generated from a single
                        customer's purchase or transaction.
                      </p>
                    </div>
                  </div>
                  <label className="block text-gray-500 px-6 pb-2">
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
              </Card>
            </div>
          </div>

          <div className="md:max-w-[16px] sm:max-w-auto mx-16 lg:mx-10 ">
            <h2 className="text-3xl font-semibold tracking-light text-black sm:text-4xl">
              RESULTS
            </h2>
          </div>

          <div className="mx-4">
            <Card>
              <div className="md:grid md:grid-cols-2 shrink-0 sm:inline">
                <div className="col-span-1">
                  <div className="p-5 bg-white">
                    <div className="flex text-left ">
                      <div className="flex">
                        <div className="block text-gray-500 px-6 pb-2">
                          <p>NUMBER OF CLICKS</p>
                          <p className="font-bold text-2xl text-black">
                            {clicks.toLocaleString("en-US", {
                              maximumFractionDigits: 0,
                            })}
                          </p>
                        </div>
                        <div className="block text-gray-500 px-6 pb-2">
                          <p>NUMBER OF LEADS</p>
                          <p className="font-bold text-2xl text-black">173</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex text-left">
                      <div className="flex">
                        <div className="block text-gray-500 px-6 pb-2">
                          <p>CONVENSION</p>
                          <p className="font-bold text-2xl text-black">
                            {conversions.toLocaleString("en-US", {
                              maximumFractionDigits: 0,
                            })}
                            %
                          </p>
                        </div>
                        <div className="block text-gray-500 px-[72px] pb-2">
                          <p>PURCHASES</p>
                          <p className="font-bold text-2xl text-black">
                            $ {purchases.toFixed(0)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 bg-white">
                    <div className="flex text-left">
                      <div className="flex ">
                        <div className="block text-gray-500 px-6 pb-2">
                          <p>EXPECTED REVENUE</p>
                          <p className="font-bold text-2xl text-black">
                            ${" "}
                            {revenue.toLocaleString("en-US", {
                              maximumFractionDigits: 0,
                            })}
                          </p>
                        </div>
                        <div className="block text-gray-500 px-4 pb-2">
                          <p>EXPECTED PROFIT</p>
                          <p className="font-bold text-2xl text-black">
                            $2,306,241
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 flex flex-col text-left">
                  <div className="p-5 flex-grow bg-red-500 py-24 px-16">
                    <p className=" text-white">RETURN ON AD SPEND</p>
                    <p className="font-semibold text-7xl text-white pb-10">
                      {roas.toFixed(0)} %
                    </p>
                    <button className="bg-blue-700 rounded-full w-84 px-16 py-4 text-white">
                      SHARE RESULT
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div className="hidden w-full h-px md:block bg-white" />
      </div>
    </div>
  );
}
