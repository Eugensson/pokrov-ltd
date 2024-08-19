"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
  ArcElement,
} from "chart.js";
import {
  ContactRound,
  HandCoins,
  ListOrdered,
  PackageOpen,
  ShoppingCart,
  SquareChartGantt,
  SquarePercent,
  UsersRound,
} from "lucide-react";
import useSWR from "swr";
import Link from "next/link";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { Error } from "@/components/error";
import { Loading } from "@/components/loading";
import { Button } from "@/components/ui/button";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
  ArcElement
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

export const Dashboard = () => {
  const { data: summary, error } = useSWR(
    `/api/admin/orders/summary`,
    (url: string) => fetch(url).then((res) => res.json())
  );

  if (error) return <Error href="/dashboard" />;

  if (!summary) return <Loading />;

  const salesData = {
    labels: summary.salesData.map((x: { _id: string }) => x._id),
    datasets: [
      {
        fill: true,
        label: "Продажі",
        data: summary.salesData.map(
          (x: { totalSales: number }) => x.totalSales
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const ordersData = {
    labels: summary.salesData.map((x: { _id: string }) => x._id),
    datasets: [
      {
        fill: true,
        label: "Замовлення",
        data: summary.salesData.map(
          (x: { totalOrders: number }) => x.totalOrders
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const productsData = {
    labels: summary.productsData.map((x: { _id: string }) => x._id), // 2022/01 2022/03
    datasets: [
      {
        label: "Category",
        data: summary.productsData.map(
          (x: { totalProducts: number }) => x.totalProducts
        ),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],
  };

  const usersData = {
    labels: summary.usersData.map((x: { _id: string }) => x._id),
    datasets: [
      {
        label: "Користувачі",
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        data: summary.usersData.map(
          (x: { totalUsers: number }) => x.totalUsers
        ),
      },
    ],
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 xl:gap-8 max-w-[1440px] mx-auto p-1">
      <div className="md:col-span-2 grid md:grid-cols-2 xl:grid-cols-4 xl:col-span-4 gap-2 xl:gap-8">
        <Card className="shadow-md dark:shadow-zinc-500/30 max-w-[300px] md:max-w-full">
          <CardHeader>
            <CardTitle className="flex justify-between items-center text-xl uppercase">
              Продажі
              <HandCoins size={28} />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center text-4xl font-bold text-blue-500">
            &#8372; {formatNumber(summary.ordersPrice)}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="link">
              <Link href="/orders" className="text-xs">
                Переглянути продажі
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="shadow-md dark:shadow-zinc-500/30 max-w-[300px] md:max-w-full">
          <CardHeader>
            <CardTitle className="flex justify-between items-center text-xl uppercase">
              Замовлення
              <ShoppingCart size={28} />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center text-4xl font-bold text-blue-500">
            {summary.ordersCount}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="link">
              <Link href="/orders" className="text-xs">
                Переглянути замовлення
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="shadow-md dark:shadow-zinc-500/30 max-w-[300px] md:max-w-full">
          <CardHeader>
            <CardTitle className="flex justify-between items-center text-xl uppercase">
              Товари
              <PackageOpen size={28} />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center text-4xl font-bold text-blue-500">
            {summary.productsCount}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="link">
              <Link href="/products" className="text-xs">
                Переглянути товари
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="shadow-md dark:shadow-zinc-500/30 max-w-[300px] md:max-w-full">
          <CardHeader>
            <CardTitle className="flex justify-between items-center text-xl uppercase">
              Користувачі
              <UsersRound size={28} />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center text-4xl font-bold text-blue-500">
            {summary.usersCount}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="link">
              <Link href="/customers" className="text-xs">
                Переглянути користувачів
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      <Card className="shadow-md dark:shadow-slate-500/30 max-w-[300px] md:max-w-full">
        <CardHeader>
          <CardTitle className="flex justify-between items-center text-xl uppercase">
            Звіт про продажі
            <SquarePercent size={30} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Line data={salesData} />
        </CardContent>
      </Card>
      <Card className="shadow-md dark:shadow-slate-500/30 max-w-[300px] md:max-w-full">
        <CardHeader>
          <CardTitle className="flex justify-between items-center text-xl uppercase">
            Звіт про замовлення
            <ListOrdered size={30} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Line data={ordersData} />
        </CardContent>
      </Card>
      <Card className="shadow-md dark:shadow-slate-500/30 max-w-[300px] md:max-w-full">
        <CardHeader>
          <CardTitle className="flex justify-between items-center text-xl uppercase">
            Звіт про товари
            <SquareChartGantt size={30} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Doughnut data={productsData} />
        </CardContent>
      </Card>
      <Card className="shadow-md dark:shadow-slate-500/30 max-w-[300px] md:max-w-full">
        <CardHeader>
          <CardTitle className="flex justify-between items-center text-xl uppercase">
            Звіт про користувачів
            <ContactRound size={30} />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-full">
          <Bar data={usersData} />
        </CardContent>
      </Card>
    </div>
  );
};
