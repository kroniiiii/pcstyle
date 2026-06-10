"use client";
// Grafiku i shitjeve mujore (recharts)
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

type Point = { month: string; total: number; orders: number };

export function SalesChart({ data }: { data: Point[] }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1F6BFF" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#1F6BFF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#161D2B" />
          <XAxis dataKey="month" stroke="#8DA2C0" fontSize={11} tickLine={false} />
          <YAxis stroke="#8DA2C0" fontSize={11} tickLine={false} tickFormatter={(v) => `€${v}`} />
          <Tooltip
            contentStyle={{ background: "#0C1018", border: "1px solid #161D2B", borderRadius: 10, color: "#EAF2FF" }}
            formatter={(value: number, name: string) => [name === "total" ? `€${value.toFixed(2)}` : value, name === "total" ? "Shitjet" : "Porositë"]}
          />
          <Area type="monotone" dataKey="total" stroke="#4D9FFF" strokeWidth={2} fill="url(#salesFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
