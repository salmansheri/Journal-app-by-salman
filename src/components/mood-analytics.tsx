"use client";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function MoodAnalytics() {
  const [period, setPeriod] = useState("7d");
  const timeOptions = [
    { value: "7d", label: "Last 7 Days" },
    { value: "15d", label: "Last 15 Days" },
    { value: "30d", label: "Last 30 Days" },
  ];
  console.log(period);
  return (
    <section>
      <h1 className="text-3xl gradient-title">Dashboard</h1>
      <div className="mt-5 w-[20vw]">
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger>
            <SelectValue placeholder="Select Period" />
          </SelectTrigger>
          <SelectContent>
            {timeOptions.map((time) => (
              <SelectItem value={time.value} key={time.value}>
                {time.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </section>
  );
}
