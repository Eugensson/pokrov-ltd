"use client";

import {
  FilePenLine,
  FileX2,
  ImagePlus,
  Images,
  Loader,
  MoreHorizontal,
} from "lucide-react";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import useSWRMutation from "swr/mutation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
import { Frame } from "@/lib/models/Frame";
import { Error } from "@/components/error";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Frames = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [value, setValue] = useState("Всі категорії");

  const { data: frames, error } = useSWR(`/api/admin/gallery`, (url: string) =>
    fetch(url).then((res) => res.json())
  );

  const [filteredFrames, setFilteredFrames] = useState<Frame[]>(frames);

  const { trigger: deleteFrame } = useSWRMutation(
    `/api/admin/gallery`,
    async (url, { arg }: { arg: { frameId: string } }) => {
      const res = await fetch(`${url}/${arg.frameId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      res.ok
        ? toast({ title: "Світлину успішно видалено" })
        : toast({
            variant: "destructive",
            title: "Сталася помилка. Будь ласка, спробуйте ще раз.",
            description: data.message,
          });
    }
  );

  const { trigger: createFrame, isMutating: isCreating } = useSWRMutation(
    `/api/admin/gallery`,
    async (url) => {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok)
        return toast({
          variant: "destructive",
          title: "Сталася помилка. Будь ласка, спробуйте ще раз.",
          description: data.message,
        });

      toast({ title: "Світлину успішно додано" });
      router.push(`/gallery/${data.frame._id}`);
    }
  );

  useEffect(() => {
    const filteredFrames = frames?.filter((frame: Frame) =>
      value === "Всі категорії" ? true : frame.category === value
    );

    setFilteredFrames(filteredFrames || []);
  }, [frames, value]);

  if (error) return <Error href="/gallery" />;

  if (!frames)
    return <Loader size={40} className="animate-spin mx-auto mt-48" />;

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="Всі категорії">
        <div className="w-full flex items-center justify-between p-1">
          <TabsList className="rounded-md hidden xl:block">
            <TabsTrigger
              name="Всі категорії"
              value="Всі категорії"
              className="rounded-md"
              onClick={() => setValue("Всі категорії")}
            >
              Всі категорії
            </TabsTrigger>
            <TabsTrigger
              value="Накупольні хрести"
              className="rounded-md"
              onClick={() => setValue("Накупольні хрести")}
            >
              Накупольні хрести
            </TabsTrigger>
            <TabsTrigger
              value="Декоративні елементи"
              className="rounded-md"
              onClick={() => setValue("Декоративні елементи")}
            >
              Декоративні елементи
            </TabsTrigger>
            <TabsTrigger
              value="Куполи церковні"
              className="rounded-md"
              onClick={() => setValue("Куполи церковні")}
            >
              Куполи церковні
            </TabsTrigger>
            <TabsTrigger
              value="Аркуші із нанесеним покриттям"
              className="rounded-md"
              onClick={() => setValue("Аркуші із нанесеним покриттям")}
            >
              Аркуші із нанесеним покриттям
            </TabsTrigger>
          </TabsList>
          <Button
            variant="outline"
            className="h-10 gap-3"
            disabled={isCreating}
            onClick={() => createFrame()}
          >
            {isCreating ? <Loader className="animate-spin" /> : <ImagePlus />}
            Додати світлину
          </Button>
        </div>
        <Card>
          <TabsContent value={value}>
            <CardContent>
              <ScrollArea className="h-[380px] w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Зображення</span>
                      </TableHead>
                      <TableHead className="w-52">Найменування</TableHead>
                      <TableHead>Опис</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Категорія
                      </TableHead>
                      <TableHead>
                        <span className="sr-only">Дії</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFrames.map((frame: Frame) => (
                      <TableRow key={frame._id}>
                        <TableCell className="hidden sm:table-cell">
                          <Image
                            src={frame.image}
                            alt={frame.title || "Зображення продукції"}
                            className="aspect-square rounded-md object-cover"
                            width={64}
                            height={64}
                          />
                        </TableCell>

                        <TableCell>
                          <Badge variant="outline">{frame.title}</Badge>
                        </TableCell>
                        <TableCell>{frame.description}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {frame.category}
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
                                    href={`/gallery/${frame._id}`}
                                    className="flex items-center gap-3"
                                  >
                                    <FilePenLine />
                                    Редагувати
                                  </Link>
                                </Button>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Button
                                  onClick={() =>
                                    deleteFrame({
                                      frameId: frame._id!,
                                    })
                                  }
                                  type="button"
                                  variant="link"
                                  className="flex items-center gap-3"
                                >
                                  <FileX2 />
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
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
};
