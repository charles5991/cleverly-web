"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Chart } from "chart.js";
import * as Form from "@radix-ui/react-form";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import {
  FormControl,
  InputLabel,
  Slider,
  Box,
  Typography,
  Input,
  Grid,
  CardContent,
  InputAdornment,
} from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const revalidate = 60;
export default function ProjectsPage() {
  const [budget, setBudget] = useState<number>(200);
  const [cpc, setCpc] = useState<number>(1);
  const [conversionRate, setConversionRate] = useState<number>(10);
  const [purchaseRate, setPurchaseRate] = useState<number>(10);
  const [avgSale, setAvgSale] = useState<number>(200);
  const [data, setData] = useState<Array<{ name: string; roas: number }>>([]);

  useEffect(() => {
    const clicks = Math.floor(budget / cpc);
    const conversions = Math.floor((clicks * conversionRate) / 100);
    const costPerConversion = budget / conversions;
    const purchases = Math.floor((conversions * purchaseRate) / 100);
    const revenue = purchases * avgSale;
    const roas = (((revenue - budget) / budget) * 100).toFixed(2);

    const newData = [{ name: "ROAS", roas: Number(roas) }];
    setData(newData);
  }, [budget, cpc, conversionRate, purchaseRate, avgSale]);

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
            <Typography
              id="budget-slider"
              className="font-semibold"
              gutterBottom
            >
              Budget
            </Typography>
            <Slider
              value={budget}
              onChange={(e, newValue) => setBudget(newValue as number)}
              aria-labelledby="budget-slider"
              step={10}
              min={0}
              max={10000}
              valueLabelDisplay="auto"
            />
            <Input
              value={budget}
              margin="dense"
              onChange={(e) => setBudget(+e.target.value)}
              style={{ fontWeight: "bolder" }}
              inputProps={{
                step: 10,
                min: 0,
                max: 1000,
                type: "number",
              }}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />

            <Typography id="cpc-slider" className="font-semibold" gutterBottom>
              CPC
            </Typography>
            <Slider
              value={cpc}
              onChange={(e, newValue) => setCpc(newValue as number)}
              aria-labelledby="cpc-slider"
              step={0.1}
              min={0}
              max={1000}
              valueLabelDisplay="auto"
            />
            <Input
              value={cpc}
              margin="dense"
              onChange={(e) => setCpc(+e.target.value)}
              inputProps={{
                step: 0.1,
                min: 0,
                max: 10,
                type: "number",
              }}
            />

            <Typography
              id="avg-sale-slider"
              className="font-semibold"
              gutterBottom
            >
              Average Sale Per Customer
            </Typography>
            <Slider
              value={avgSale}
              onChange={(e, newValue) => setAvgSale(newValue as number)}
              aria-labelledby="avg-sale-slider"
              step={10}
              min={0}
              max={1000}
              valueLabelDisplay="auto"
            />
            <Input
              value={avgSale}
              margin="dense"
              onChange={(e) => setAvgSale(+e.target.value)}
              inputProps={{
                step: 10,
                min: 0,
                max: 1000,
                type: "number",
              }}
            />

            <Typography
              id="conversion-rate-slider"
              className="font-semibold"
              gutterBottom
            >
              Estimated Conversion Rate
            </Typography>
            <Slider
              value={conversionRate}
              onChange={(e, newValue) => setConversionRate(newValue as number)}
              aria-labelledby="conversion-rate-slider"
              step={1}
              min={0}
              max={100}
              valueLabelDisplay="auto"
            />
            <Input
              value={conversionRate}
              margin="dense"
              onChange={(e) => setConversionRate(+e.target.value)}
              inputProps={{
                step: 1,
                min: 0,
                max: 100,
                type: "number",
              }}
            />

            <Typography
              id="purchase-rate-slider"
              className="font-semibold"
              gutterBottom
            >
              Conversion to Purchase %
            </Typography>
            <Slider
              value={purchaseRate}
              onChange={(e, newValue) => setPurchaseRate(newValue as number)}
              aria-labelledby="purchase-rate-slider"
              step={1}
              min={0}
              max={100}
              valueLabelDisplay="auto"
            />
            <Input
              value={purchaseRate}
              margin="dense"
              onChange={(e) => setPurchaseRate(+e.target.value)}
              inputProps={{
                step: 1,
                min: 0,
                max: 100,
                type: "number",
              }}
            />
          </Card>

          <div className="flex flex-col w-full gap-8  mx-auto border-t border-gray-900/10  lg:mx-0  lg:border-t-0 ">
            <Card>
              123
              {/* <Typography variant="h5">ROAS: {data[0].roas}%</Typography> */}
            </Card>
            <Card>
              {data.length > 0 ? (
                <>
                  <BarChart width={300} height={300} data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Bar dataKey="roas" fill="#ff7300" />
                  </BarChart>
                </>
              ) : (
                <Typography variant="h5">ROAS: N/A</Typography>
              )}
            </Card>
          </div>
        </div>
        <div className="hidden w-full h-px md:block bg-white" />
      </div>
    </div>
  );
}
