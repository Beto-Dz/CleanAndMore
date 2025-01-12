import {ArrowRightEndOnRectangleIcon,BriefcaseIcon } from "@heroicons/react/24/outline";

export const Navbar = () => {
  return (
    <header className="bg-slate-700 p-2 flex items-center justify-between text-white">
      <BriefcaseIcon className="h-8 w-8" />
      <h1 className="font-bold text-lg">Mauricio Garces</h1>
      <ArrowRightEndOnRectangleIcon className="h-8 w-8" />
    </header>
  );
};
