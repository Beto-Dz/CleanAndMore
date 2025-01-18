import {ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="bg-primary p-2 flex items-center justify-between text-white">
      <img src="/favicon.svg" alt="" className="w-8 h-8" />
      <h1 className="font-bold text-lg">Cleaning and more</h1>
      <Link to="/auth/" className="p-1 rounded-md hover:bg-slate-600 hover:scale-105 active:scale-95 transition-transform" >
        <ArrowRightEndOnRectangleIcon className="h-8 w-8" />
      </Link>
    </header>
  );
};
