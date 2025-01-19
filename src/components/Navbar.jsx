import {ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { useAuthStore } from "../hooks/useAuthStore";

export const Navbar = () => {

  const { user, startLogout } = useAuthStore();

  return (
    <header className="bg-primary p-2 text-white">
      <section className="w-full flex items-center justify-between">
        <img src="/favicon.svg" alt="" className="w-8 h-8" />
        <span className="text-center">
          <h1 className="font-bold text-xl lg:text-2xl">Cleaning and more</h1>
          <p className="text-slate-600 text-sm border-b border-[#00000042] border-solid">Quality, reliable and tailor-made domestic cleaning services.</p>
        </span>
        <button className="p-1 rounded-md hover:bg-slate-600 hover:scale-105 active:scale-95 transition-transform" onClick={startLogout} >
          <ArrowRightEndOnRectangleIcon className="h-8 w-8" />
        </button>
      </section>
      <h3 className="text-center">Wecome, {user.name}!!</h3>
    </header>
  );
};
