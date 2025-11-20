"use client";

import { CreateUser } from "@/lib/actions";

export default function CreateUserBtn() {
   const handleClick = async () => await CreateUser();
   
   return (
      <button
         onClick={handleClick}
         className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/8 px-5 transition-colors hover:border-transparent hover:bg-black/4 dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
      >Create Nazar Kyselov</button>
   )
}