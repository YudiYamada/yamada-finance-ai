"use client";

import { BadgeJapaneseYen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { getInitials } from "@/utils/get-initials";

import { Avatar, AvatarFallback } from "./ui/avatar";

type HeaderProps = {
  userName?: string | undefined;
};

const Header = ({ userName }: HeaderProps) => {
  const pathname = usePathname();

  const isActiveLink = (path: string) => pathname === path;

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
      <div className="border-accent-foreground flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-[14px] font-semibold">
        <Avatar>
          <AvatarFallback>{getInitials(userName)}</AvatarFallback>
        </Avatar>
        <span>{userName}</span>
      </div>
    </header>
  );
};

export default Header;
