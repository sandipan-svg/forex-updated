"use client";

import React from "react";
import Logo from "./logo";
import { NavigationMenuDemo } from "./navItems";
import ClientNavbar from "./navbar/indexs";

const Navbar = () => {
  return (
    <header className="w-full bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <div className="hidden md:flex">
          <NavigationMenuDemo />
        </div>
        <ClientNavbar/>
      </div>
    </header>
  );
};

export default Navbar;
