import {  HandCoins } from "lucide-react";
import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <HandCoins className="stroke h-11 w-11 stroke-yellow-400 stroke-[1.5]" />
      <p className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent">
  Xpenso
</p>



    </Link>
  );
}

export function LogoMobile() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <p className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent">
        BudgetTracker
      </p>
    </Link>
  );
}

export default Logo;
