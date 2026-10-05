"use client";

import { BadgeJapaneseYen, LogOutIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import { getInitials } from "@/utils/get-initials";

import { Avatar, AvatarFallback } from "./ui/avatar";

type HeaderProps = {
  userName?: string | undefined;
};

const Header = ({ userName }: HeaderProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActiveLink = (path: string) => pathname === path;

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  return (
    <header className="border-accent-foreground flex items-center justify-between border-b px-8 py-4">
      <div className="flex items-center justify-center gap-2">
        <BadgeJapaneseYen size={50} className="text-primary" />
        <span className="md-text-[27px] text-xl font-bold">
          Yamada Finance.AI
        </span>
      </div>

      <Sheet>
        <SheetTrigger className="hover:cursor-pointer md:hidden">
          <MenuIcon />
        </SheetTrigger>
        <SheetContent className="bg-background rounded-xl border-none">
          <SheetHeader className="flex h-full flex-col-reverse justify-between">
            <SheetTitle>
              <NavigationMenu className="border-accent-foreground mt-10 flex max-w-full items-center gap-2 rounded-2xl border px-4 py-2.5 text-[14px] font-semibold">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="space-x-2 bg-transparent! hover:cursor-pointer hover:bg-transparent! focus:bg-transparent! data-[state=open]:bg-transparent!">
                      <Avatar>
                        <AvatarFallback>{getInitials(userName)}</AvatarFallback>
                      </Avatar>
                      <span>{userName}</span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <NavigationMenuLink
                        className="hover:cursor-pointer"
                        onClick={handleSignOut}
                      >
                        <LogOutIcon />
                        Sign Out
                      </NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </SheetTitle>
            <SheetDescription
              render={
                <nav className="mt-10 grid space-y-5 text-end">
                  <SheetClose
                    nativeButton={false}
                    render={
                      <Link
                        href="/dashboard"
                        className={`text-3xl ${
                          isActiveLink("/dashboard")
                            ? "text-primary font-bold"
                            : "text-muted-foreground font-semibold"
                        }`}
                      >
                        Dashboard
                      </Link>
                    }
                  />
                  <SheetClose
                    nativeButton={false}
                    render={
                      <Link
                        href="/transactions"
                        className={`text-3xl ${
                          isActiveLink("/transactions")
                            ? "text-primary font-bold"
                            : "text-muted-foreground font-semibold"
                        }`}
                      >
                        Transactions
                      </Link>
                    }
                  />
                  <SheetClose
                    nativeButton={false}
                    render={
                      <Link
                        href="/signature"
                        className={`text-3xl ${
                          isActiveLink("/signature")
                            ? "text-primary font-bold"
                            : "text-muted-foreground font-semibold"
                        }`}
                      >
                        Signature
                      </Link>
                    }
                  />
                </nav>
              }
            />
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <div className="hidden w-full items-center justify-between gap-6 md:flex">
        <nav className="flex items-center space-x-12">
          <Link
            href="/dashboard"
            className={
              isActiveLink("/dashboard")
                ? "text-primary font-bold"
                : "text-muted-foreground font-semibold"
            }
          >
            Dashboard
          </Link>
          <Link
            href="/transactions"
            className={
              isActiveLink("/transactions")
                ? "text-primary font-bold"
                : "text-muted-foreground font-semibold"
            }
          >
            Transactions
          </Link>
          <Link
            href="/signature"
            className={
              isActiveLink("/signature")
                ? "text-primary font-bold"
                : "text-muted-foreground font-semibold"
            }
          >
            Signature
          </Link>
        </nav>
        <NavigationMenu className="border-accent-foreground flex items-center gap-2 rounded-2xl border px-2 py-2.5 text-[14px] font-semibold">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="space-x-2 bg-transparent! hover:cursor-pointer hover:bg-transparent! focus:bg-transparent! data-[state=open]:bg-transparent!">
                <Avatar>
                  <AvatarFallback>{getInitials(userName)}</AvatarFallback>
                </Avatar>
                <span>{userName}</span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink
                  className="hover:cursor-pointer"
                  onClick={handleSignOut}
                >
                  <LogOutIcon />
                  Sign Out
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Header;
