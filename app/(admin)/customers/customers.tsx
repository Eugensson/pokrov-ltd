"use client";

import {
  CircleUserRound,
  Loader,
  MoreHorizontal,
  TriangleAlert,
  UserPen,
  UsersRound,
  UserX,
} from "lucide-react";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatId } from "@/lib/utils";
import { User } from "@/lib/models/User";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Customers = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: users, error } = useSWR(`/api/admin/users`, fetcher);

  const { trigger: deleteUser } = useSWRMutation(
    `/api/admin/users`,
    async (url, { arg }: { arg: { userId: string } }) => {
      const toastId = toast.loading("Deleting user...");
      const res = await fetch(`${url}/${arg.userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      res.ok
        ? toast.success("User deleted successfully", {
            id: toastId,
          })
        : toast.error(data.message, {
            id: toastId,
          });
    }
  );

  if (error)
    return (
      <main className="flex justify-center items-center h-[650px]">
        <h2 className="text-xl font-semibold text-red-500 flex items-center gap-3">
          <TriangleAlert size={40} />
          Сталася помилка. Будь ласка, спробуйте ще раз.
        </h2>
      </main>
    );

  if (!users)
    return (
      <main className="flex justify-center items-center h-[650px]">
        <Loader size={40} className="animate-spin" />
      </main>
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <UsersRound size={28} />
          Користувачі
        </CardTitle>
        <CardDescription>
          Панель керування користувачами системою (редагування та видалення).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[380px] w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Зображення</span>
                </TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Повне ім&apos;я користувача</TableHead>
                <TableHead>Електронна пошта</TableHead>
                <TableHead className="hidden md:table-cell">
                  Статус користувача
                </TableHead>
                <TableHead>
                  <span className="sr-only">Дії</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user: User) => (
                <TableRow key={user._id}>
                  <TableCell className="hidden sm:table-cell">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name}
                        className="aspect-square rounded-full object-cover"
                        width={40}
                        height={40}
                      />
                    ) : (
                      <CircleUserRound size={40} className="text-slate-300" />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatId(user._id!)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.name}</Badge>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {user.isAdmin ? "адміністратор" : "користувач"}
                  </TableCell>

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Дії</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Button type="button" variant="link">
                            <Link
                              href={`/customers/${user._id}`}
                              className="flex items-center gap-3"
                            >
                              <UserPen />
                              Редагувати
                            </Link>
                          </Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Button
                            onClick={() => deleteUser({ userId: user._id })}
                            type="button"
                            variant="link"
                            className="flex items-center gap-3"
                          >
                            <UserX />
                            Видалити
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
