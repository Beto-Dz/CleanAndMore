import {ArrowRightEndOnRectangleIcon,BriefcaseIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="bg-slate-800 p-2 flex items-center justify-between text-white">
      <BriefcaseIcon className="h-8 w-8" />
      <h1 className="font-bold text-lg">Mauricio Garces</h1>
      <Link to="/admin/" className="p-1 rounded-md hover:bg-slate-600 hover:scale-105 active:scale-95 transition-transform" >
        <ArrowRightEndOnRectangleIcon className="h-8 w-8" />
      </Link>
    </header>
  );
};
