"use client";

import React from "react";
import { Link, Button } from "@heroui/react";
import { useSession } from "@/lib/auth-client";

const Navbar = () => {
  const { data, isPending } = useSession();
  const user = data?.user;

  if (isPending) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-4xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="">
      <nav className="sticky top-0 z-40 w-full border-b">
        <header className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Link href="/">
              <p className="font-bold">LRN-BetterAuth</p>
            </Link>
          </div>
          <ul className="flex items-center gap-4">
            {user ? (
              <>
                <li className="px-4">
                    <p>Welcome, {user.name}</p>
                  <Link href="/auth/singup">
                   <button
                   onClick={() => singOut()} 
                   >Sing Out</button>
                  </Link>
                </li>
              </>
            ) : (
              <><li className="px-4 space-x-4">
              <Link href="/auth/singup">Sing Up</Link>
              <Link href="/auth/singin">Sing In</Link>
            </li></>
            )}

            {/* <li className="px-4">
              <Link href="/auth/singup">SingUp</Link>
            </li> */}
          </ul>
        </header>
      </nav>
    </div>
  );
};

export default Navbar;
