"use client";

import {
  CircleUserRound,
  Loader,
  MoreHorizontal,
  UserPen,
  UserX,
} from "lucide-react";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import useSWRMutation from "swr/mutation";

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
import { Error } from "@/components/error";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Customers = () => {
  const { toast } = useToast();

  const { data: users, error } = useSWR(`/api/admin/users`, (url: string) =>
    fetch(url).then((res) => res.json())
  );

  const { trigger: deleteUser } = useSWRMutation(
    `/api/admin/users`,
    async (url, { arg }: { arg: { userId: string } }) => {
      const res = await fetch(`${url}/${arg.userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      res.ok
        ? toast({
            title: "Користувача успішно видалено",
          })
        : toast({
            variant: "destructive",
            title: "Сталася помилка. Будь ласка, спробуйте ще раз.",
            description: data.message,
          });
    }
  );

  if (error) return <Error href="/customers" />;

  if (!users)
    return <Loader size={40} className="animate-spin mx-auto mt-48" />;

  return (
    <Card>
      <CardContent>
        <ScrollArea className="h-[380px] w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Зображення</span>
                </TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Ім&apos;я</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="hidden md:table-cell">Статус</TableHead>
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
