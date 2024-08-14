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
import useSWR from "swr";
import Link from "next/link";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ContactRound,
  HandCoins,
  ListOrdered,
  Loader,
  PackageOpen,
  ShoppingCart,
  SquareChartGantt,
  SquarePercent,
  TriangleAlert,
  UsersRound,
} from "lucide-react";

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
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: summary, error } = useSWR(`/api/admin/orders/summary`, fetcher);

  if (error)
    return (
      <main className="flex justify-center items-center min-h-[580px]">
        <h2 className="text-xl font-semibold text-red-500 flex items-center gap-3">
          <TriangleAlert size={40} />
          Сталася помилка. Будь ласка, спробуйте ще раз.
        </h2>
      </main>
    );

  if (!summary)
    return (
      <main className="flex justify-center items-center h-[580px]">
        <Loader size={40} className="animate-spin" />
      </main>
    );

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
    labels: summary.usersData.map((x: { _id: string }) => x._id), // 2022/01 2022/03
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
    <main className="grid md:grid-cols-2 gap-4 w-full max-w-7xl mx-auto p-2 md:p-5 xl:p-10">
      <div className="md:col-span-2 grid md:grid-cols-2 xl:grid-cols-4 gap-2 md:gap-5 xl:gap-10">
        <Card className="shadow-md dark:shadow-slate-500/30">
          <CardHeader>
            <CardTitle className="flex justify-between items-center text-xl uppercase">
              Продажі
              <HandCoins size={28} />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center text-4xl font-bold text-yellow-500">
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
        <Card className="shadow-md dark:shadow-slate-500/30">
          <CardHeader>
            <CardTitle className="flex justify-between items-center text-xl uppercase">
              Замовлення
              <ShoppingCart size={28} />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center text-4xl font-bold text-yellow-500">
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
        <Card className="shadow-md dark:shadow-slate-500/30">
          <CardHeader>
            <CardTitle className="flex justify-between items-center text-xl uppercase">
              Товари
              <PackageOpen size={28} />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center text-4xl font-bold text-yellow-500">
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
        <Card className="shadow-md dark:shadow-slate-500/30">
          <CardHeader>
            <CardTitle className="flex justify-between items-center text-xl uppercase">
              Користувачі
              <UsersRound size={28} />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center text-4xl font-bold text-yellow-500">
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
      <Card>
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
      <Card>
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
      <Card>
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
      <Card>
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
    </main>
  );
};
