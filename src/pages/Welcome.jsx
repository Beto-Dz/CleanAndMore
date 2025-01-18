import { Link } from "react-router-dom";

export const Welcome = () => {
  return (
    <header className="w-full min-h-dvh flex justify-center bg-primary text-slate-800 animate-blurred-fade-in">
      <section className="w-full min-h-dvh px-3 py-8 container  grid grid-rows-auto1fr gap-4">
        <section className="flex flex-col gap-2 items-center text-center">
          <h1 className="font-bold text-4xl">Cleaning And More</h1>
          <p className="text-slate-600">
            Quality, reliable and tailor-made domestic cleaning services.
          </p>
          <img src="/favicon.svg" alt="icon of the page" className="w-20 h-20" />
        </section>
        <section className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 md:place-items-center">
          <section className="flex flex-col gap-3 justify-center items-center">
            <h2 className="text-center font-bold text-2xl">Cleaning in only 4 Steps!</h2>
            <ol className="list-inside list-decimal">
              <li className="">
                <span className="font-semibold text-lg">Create an account</span>
                <br /><span className="text-slate-600"> Fill out our simple registration form.</span>
              </li>
              <li className="">
                <span className="font-semibold text-lg">Sign In</span>
                <br /><span className="text-slate-600"> This helps us to have a personalized follow up and offeryou the best attention.</span>
              </li>
              <li className="">
                <span className="font-semibold text-lg">Schedule your Day</span>
                <br /><span className="text-slate-600"> Choose the day and time that works best for you.</span>
              </li>
              <li className="">
                <span className="font-semibold text-lg">Enjoy Your Clean Home</span>
                <br /><span className="text-slate-600"> Leave everything in our hands.</span>
              </li>
            </ol>
            <Link to="/app/" className="py-2 px-3 bg-secondary rounded-full font-semibold hover:scale-105 active:scale-95">Get started!</Link>
          </section>
          <img src="/524shots_so.png" alt="icon of the page" className="aspect-auto" />
        </section>
      </section>
    </header>
  );
};
