import { Component, signal } from '@angular/core';
import { PlotFigure } from './components/plot-figure/plot-figure';
import * as Plot from "@observablehq/plot";
import * as htl from "htl";

@Component({
  selector: 'app-root',
  imports: [PlotFigure],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
 

  // Highly volatile AAPL stock data with dramatic ups and downs
  aapl = [
    { Date: new Date("2023-01-03"), Open: 130.28, High: 132.90, Low: 122.17, Close: 123.07, Volume: 112117601 },
    { Date: new Date("2023-01-04"), Open: 123.89, High: 131.29, Low: 123.08, Close: 130.61, Volume: 121116935 },
    { Date: new Date("2023-01-05"), Open: 129.12, High: 129.66, Low: 122.76, Close: 124.36, Volume: 101327491 },
    { Date: new Date("2023-01-06"), Open: 124.01, High: 132.29, Low: 123.39, Close: 131.42, Volume: 97195991 },
    { Date: new Date("2023-01-09"), Open: 131.47, High: 135.41, Low: 128.89, Close: 100.73, Volume: 102983820 },
    { Date: new Date("2023-01-10"), Open: 128.51, High: 132.59, Low: 125.92, Close: 132.02, Volume: 88806780 },
    { Date: new Date("2023-01-11"), Open: 131.49, High: 134.56, Low: 128.41, Close: 68.86, Volume: 87074710 },
    { Date: new Date("2023-01-12"), Open: 129.28, High: 136.41, Low: 128.23, Close: 135.41, Volume: 95136580 },
    { Date: new Date("2023-01-13"), Open: 135.38, High: 137.76, Low: 130.84, Close: 60.76, Volume: 88635390 },
    { Date: new Date("2023-01-17"), Open: 131.62, High: 138.12, Low: 131.75, Close: 137.24, Volume: 95829580 },
    { Date: new Date("2023-01-18"), Open: 137.01, High: 139.29, Low: 133.39, Close: 134.27, Volume: 94824980 },
    { Date: new Date("2023-01-19"), Open: 134.67, High: 139.55, Low: 132.32, Close: 138.55, Volume: 88281200 },
    { Date: new Date("2023-01-20"), Open: 138.48, High: 142.55, Low: 136.88, Close: 141.22, Volume: 99081300 },
    { Date: new Date("2023-01-23"), Open: 140.98, High: 145.27, Low: 139.25, Close: 70.38, Volume: 104238900 },
    { Date: new Date("2023-01-24"), Open: 143.05, High: 144.95, Low: 140.62, Close: 141.05, Volume: 89502000 },
    { Date: new Date("2023-01-25"), Open: 141.29, High: 146.84, Low: 139.06, Close: 145.86, Volume: 101550700 },
    { Date: new Date("2023-01-26"), Open: 145.56, High: 150.21, Low: 144.72, Close: 148.12, Volume: 88270900 },
    { Date: new Date("2023-01-27"), Open: 148.70, High: 153.77, Low: 147.67, Close: 152.75, Volume: 99412200 },
    { Date: new Date("2023-01-30"), Open: 152.46, High: 154.94, Low: 149.33, Close: 150.64, Volume: 91342300 },
    { Date: new Date("2023-01-31"), Open: 150.75, High: 155.31, Low: 149.65, Close: 154.29, Volume: 104634900 },
    { Date: new Date("2023-02-01"), Open: 154.68, High: 158.09, Low: 152.49, Close: 80.55, Volume: 91286500 },
    { Date: new Date("2023-02-02"), Open: 156.65, High: 159.09, Low: 153.39, Close: 157.04, Volume: 89004000 },
    { Date: new Date("2023-02-03"), Open: 156.88, High: 158.50, Low: 151.06, Close: 152.41, Volume: 96256900 },
    { Date: new Date("2023-02-06"), Open: 152.55, High: 155.45, Low: 150.04, Close: 154.44, Volume: 85293800 },
    { Date: new Date("2023-02-07"), Open: 154.78, High: 162.18, Low: 153.75, Close: 161.01, Volume: 120661700 },
    { Date: new Date("2023-02-08"), Open: 161.88, High: 163.64, Low: 158.34, Close: 159.14, Volume: 114825900 },
    { Date: new Date("2023-02-09"), Open: 159.61, High: 165.20, Low: 158.37, Close: 164.55, Volume: 105059200 },
    { Date: new Date("2023-02-10"), Open: 164.77, High: 167.32, Low: 161.48, Close: 162.92, Volume: 90424000 },
    { Date: new Date("2023-02-13"), Open: 162.10, High: 166.44, Low: 160.58, Close: 161.09, Volume: 88651200 },
    { Date: new Date("2023-02-14"), Open: 161.09, High: 164.43, Low: 157.65, Close: 158.96, Volume: 87004700 },
    { Date: new Date("2023-02-15"), Open: 159.16, High: 167.23, Low: 158.10, Close: 165.65, Volume: 102355700 },
    { Date: new Date("2023-02-16"), Open: 165.99, High: 168.35, Low: 162.26, Close: 163.71, Volume: 86921000 },
    { Date: new Date("2023-02-17"), Open: 163.57, High: 166.35, Low: 161.32, Close: 165.47, Volume: 92661700 },
    { Date: new Date("2023-02-21"), Open: 165.18, High: 167.46, Low: 159.45, Close: 160.48, Volume: 102657700 },
    { Date: new Date("2023-02-22"), Open: 160.96, High: 163.78, Low: 158.45, Close: 161.87, Volume: 100308600 },
    { Date: new Date("2023-02-23"), Open: 161.72, High: 163.55, Low: 157.82, Close: 158.96, Volume: 94332100 },
    { Date: new Date("2023-02-24"), Open: 158.59, High: 161.85, Low: 156.46, Close: 10.49, Volume: 97775500 },
    { Date: new Date("2023-02-27"), Open: 159.21, High: 162.44, Low: 157.54, Close: 80.41, Volume: 82335700 },
    { Date: new Date("2023-02-28"), Open: 160.62, High: 161.40, Low: 157.22, Close: 157.36, Volume: 111597700 }
  ];

  penguins: any = [
  {
    "species": "Adelie",
    "island": "Torgersen",
    "bill_length_mm": 39.1,
    "bill_depth_mm": 18.7,
    "flipper_length_mm": 181,
    "body_mass_g": 3750,
    "sex": "male"
  },
  {
    "species": "Adelie",
    "island": "Torgersen",
    "bill_length_mm": 39.5,
    "bill_depth_mm": 17.4,
    "flipper_length_mm": 186,
    "body_mass_g": 3800,
    "sex": "female"
  },
  {
    "species": "Chinstrap",
    "island": "Dream",
    "bill_length_mm": 46.5,
    "bill_depth_mm": 17.9,
    "flipper_length_mm": 192,
    "body_mass_g": 3250,
    "sex": "male"
  },
  {
    "species": "Gentoo",
    "island": "Biscoe",
    "bill_length_mm": 44.5,
    "bill_depth_mm": 14.3,
    "flipper_length_mm": 212,
    "body_mass_g": 5600,
    "sex": "female"
  },
  {
    "species": "Adelie",
    "island": "Dream",
    "bill_length_mm": 37.5,
    "bill_depth_mm": 19.4,
    "flipper_length_mm": 180,
    "body_mass_g": 3650,
    "sex": "male"
  },
  {
    "species": "Gentoo",
    "island": "Biscoe",
    "bill_length_mm": 48.8,
    "bill_depth_mm": 15.2,
    "flipper_length_mm": 218,
    "body_mass_g": 6000,
    "sex": "male"
  }
  ]

  plotOptions = {
    marks: [
      Plot.dot(this.penguins, { x: 'bill_length_mm', y: 'bill_depth_mm', fill: 'species' })
    ],
    width: 600,
    height: 400,
    color: {
      legend: true,
      domain: ["Adelie", "Gentoo", "Chinstrap"]
    }
  };

  // Simple line chart for better visibility
  aaplLineChartOptions = {
    marks: [
      () => htl.svg`<defs>
        <linearGradient id="lineGradient" gradientTransform="rotate(90)">
          <stop offset="20%" stop-color="#007AFF" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#007AFF" stop-opacity="0.3" />
        </linearGradient>
      </defs>`,
      Plot.areaY(this.aapl, {x: "Date", y: "Close", fill: "url(#lineGradient)", curve: "catmull-rom"}),
      Plot.lineY(this.aapl, {x: "Date", y: "Close", stroke: "#007AFF", strokeWidth: 2.5, curve: "catmull-rom"}),
      Plot.dot(this.aapl.filter((_, i) => i % 3 === 0), {x: "Date", y: "Close", fill: "#007AFF", r: 2}),
      Plot.ruleY([0])
    ],
    width: 900,
    height: 500,
    y: {grid: true, label: "Close Price ($)"},
    x: {label: "Trading Date"},
    title: "AAPL Daily Stock Price with HTL SVG Effects"
  };


  //SALES DATA - 50 entries with varied values
  sales = [
    {Amount: 1200, Percent: 15},
    {Amount: 3400, Percent: 28},
    {Amount: 5600, Percent: 42},
    {Amount: 7800, Percent: 35},
    {Amount: 9200, Percent: 58},
    {Amount: 11500, Percent: 67},
    {Amount: 13800, Percent: 72},
    {Amount: 16100, Percent: 40},
    {Amount: 18300, Percent: 50},
    {Amount: 20600, Percent: 60},
    {Amount: 22800, Percent: 65},
    {Amount: 25100, Percent: 92},
    {Amount: 27300, Percent: 87},
    {Amount: 29600, Percent: 94},
    {Amount: 31800, Percent: 50},
    {Amount: 34100, Percent: 96},
    {Amount: 36300, Percent: 93},
    {Amount: 38600, Percent: 70},
    {Amount: 40800, Percent: 95},
    {Amount: 43100, Percent: 99},
    {Amount: 45300, Percent: 97},
    {Amount: 47600, Percent: 100},
    {Amount: 49800, Percent: 94},
    {Amount: 52100, Percent: 88},
    {Amount: 54300, Percent: 80},
    {Amount: 56600, Percent: 30},
    {Amount: 58800, Percent: 50},
    {Amount: 60000, Percent: 20}
  ]

  salesOption= {
    marks: [
      () => htl.svg`<defs>
        <linearGradient id="salesGradient" gradientTransform="rotate(90)">
          <stop offset="20%" stop-color="#007AFF" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#007AFF" stop-opacity="0.1" />
        </linearGradient>
      </defs>`,
      Plot.areaY(this.sales, {x: "Amount", y: "Percent", fill: "url(#salesGradient)", curve: "linear"}),
      Plot.lineY(this.sales, {x: "Amount", y: "Percent", stroke: "#007AFF", strokeWidth: 2.5, curve: "linear"}),
      Plot.dot(this.sales.filter((_, i) => i % 1 === 0), {x: "Amount", y: "Percent", fill: "#007AFF", r: 4}),
      Plot.ruleY([0])
    ],
    width: 2000,
    height: 500,
    y: {grid: true, label: "Percent"},
    x: {label: "Amount"},
    title: "Sales Details"
  };

  // Dataset for first line - Product A performance over months
 salesA = [
    {Amount: 1200, Percent: 15},
    {Amount: 3400, Percent: 28},
    {Amount: 5600, Percent: 42},
    {Amount: 7800, Percent: 35},
    {Amount: 9200, Percent: 58},
    {Amount: 11500, Percent: 67},
    {Amount: 13800, Percent: 72},
    {Amount: 16100, Percent: 40},
    {Amount: 18300, Percent: 50},
    {Amount: 20600, Percent: 60},
    {Amount: 22800, Percent: 65},
    {Amount: 25100, Percent: 92},
    {Amount: 27300, Percent: 87},
    {Amount: 29600, Percent: 94},
    {Amount: 31800, Percent: 50},
    {Amount: 34100, Percent: 96},
    {Amount: 36300, Percent: 50},
    {Amount: 38600, Percent: 70},
    {Amount: 40800, Percent: 20},
    {Amount: 43100, Percent: 10},
    {Amount: 45300, Percent: 20},
    {Amount: 47600, Percent: 30},
    {Amount: 49800, Percent: 4},
    {Amount: 52100, Percent: 88},
    {Amount: 54300, Percent: 80},
    {Amount: 56600, Percent: 30},
    {Amount: 58800, Percent: 50},
    {Amount: 60000, Percent: 20}
  ]

  // Dataset for second line - Product B performance over months
  salesB = [
    {Amount: 1200, Percent: 15},
    {Amount: 3400, Percent: 28},
    {Amount: 5600, Percent: 80},
    {Amount: 7800, Percent: 35},
    {Amount: 9200, Percent: 58},
    {Amount: 11500, Percent: 67},
    {Amount: 13800, Percent: 70},
    {Amount: 16100, Percent: 40},
    {Amount: 18300, Percent: 50},
    {Amount: 20600, Percent: 50},
    {Amount: 22800, Percent: 65},
    {Amount: 25100, Percent: 92},
    {Amount: 27300, Percent: 20},
    {Amount: 29600, Percent: 50},
    {Amount: 31800, Percent: 40},
    {Amount: 34100, Percent: 40},
    {Amount: 36300, Percent: 70},
    {Amount: 38600, Percent: 70},
    {Amount: 40800, Percent: 50},
    {Amount: 43100, Percent: 40},
    {Amount: 45300, Percent: 30},
    {Amount: 47600, Percent: 33},
    {Amount: 49800, Percent: 34},
    {Amount: 52100, Percent: 35},
    {Amount: 54300, Percent: 30},
    {Amount: 56600, Percent: 30},
    {Amount: 58800, Percent: 50},
    {Amount: 60000, Percent: 20}
  ]

  // Combined chart with 2 lines in different colors
  dualLineChartOptions = {
    marks: [
      () => htl.svg`<defs>
        <linearGradient id="gradientA" gradientTransform="rotate(90)">
          <stop offset="20%" stop-color="#DBA5FF" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#DBA5FF" stop-opacity="0.4" />
        </linearGradient>
        <linearGradient id="gradientB" gradientTransform="rotate(90)">
          <stop offset="20%" stop-color="#ff8f6dff" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#ff8f6dff" stop-opacity="0.4" />
        </linearGradient>
      </defs>`,
      // Product A line with coral red color
      Plot.areaY(this.salesA, {x: "Amount", y: "Percent", fill: "url(#gradientA)", curve: "catmull-rom"}),
      // Plot.lineY(this.salesA, {x: "Amount", y: "Percent", stroke: "#c062ffff", strokeWidth: 3, curve: "catmull-rom"}),
      // Plot.dot(this.salesA, {x: "Amount", y: "Percent", fill: "#c062ffff", r: 5}),

      // Product B line with turquoise color
      Plot.areaY(this.salesB, {x: "Amount", y: "Percent", fill: "url(#gradientB)", curve: "catmull-rom"}),
      // Plot.lineY(this.salesB, {x: "Amount", y: "Percent", stroke: "#ff6e41ff", strokeWidth: 3, curve: "catmull-rom"}),
      // Plot.dot(this.salesB, {x: "Amount", y: "Percent", fill: "#ff6a3cff", r: 5}),

      Plot.ruleY([0])
    ],
    width: 2000,
    height: 500,
    y: {grid: true, label: "Sales (Units)"},
    x: {label: "Month"},
    title: "Revenue"
  };
}
