"use client";

import { BadgeJapaneseYen, LogOutIcon } from "lucide-react";
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
      <div className="flex space-x-12">
        <div className="flex items-center">
          <BadgeJapaneseYen size={50} className="text-primary" />
          <span className="text-[28px] font-bold">Yamada Finance.AI</span>
        </div>
        <div className="flex items-center space-x-12">
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
        </div>
      </div>
      <div>
        <NavigationMenu className="border-accent-foreground flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-[14px] font-semibold">
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
