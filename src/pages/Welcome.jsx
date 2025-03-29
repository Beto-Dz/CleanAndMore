import { Link } from "react-router-dom";

export const Welcome = () => {
  return (
    <header className="w-full min-h-dvh flex justify-center bg-clean bg-cover bg-right text-slate-900 animate-blurred-fade-in">
      <section className="w-full min-h-dvh px-3 py-8 container  grid grid-rows-auto1fr gap-4 text-lg">
        <section className="flex flex-col gap-2 items-center text-center">
          <h1 className="font-bold text-4xl">Cleaning And More</h1>
          <p className="text-slate-900">
            Quality, reliable and tailor-made domestic cleaning services.
          </p>
          <img src="/favicon.svg" alt="icon of the page" className="w-20 h-20 drop-shadow-3xl" />
        </section>
        <section className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 place-items-center">
          <section className="flex flex-col gap-3 justify-center items-center">
            <h2 className="text-center font-bold text-2xl">Cleaning in only 4 Steps!</h2>
            <ol className="list-inside list-decimal">
              <li className="">
                <span className="font-semibold">Create an account</span>
                <br /><span className="text-slate-900"> Fill out our simple registration form.</span>
              </li>
              <li className="">
                <span className="font-semibold">Sign In</span>
                <br /><span className="text-slate-900"> This helps us to have a personalized follow up and offer you the best attention.</span>
              </li>
              <li className="">
                <span className="font-semibold">Schedule your Day</span>
                <br /><span className="text-slate-900"> Choose the day and time that works best for you.</span>
              </li>
              <li className="">
                <span className="font-semibold">Enjoy Your Clean Home</span>
                <br /><span className="text-slate-900"> Leave everything in our hands.</span>
              </li>
            </ol>
            <Link to="/app/" className="py-2 px-3 bg-secondary rounded-full font-semibold hover:scale-105 active:scale-95 drop-shadow-lg ring-white ring-1">Get started!</Link>
          </section>
          <img src="/524shots_so.png" alt="icon of the page" className="aspect-auto drop-shadow-2xl rotate-3 contrast-100" />
        </section>
      </section>
      <a href="https://wa.me/19146151306?text=Hello%20cleaning%20and%20more!%20I%20need..." target="_blank" 
        className="fixed bottom-6 right-6 hover:scale-105 active:scale-95 drop-shadow-lg flex gap-2 items-center bg-primary bg-opacity-40 p-1 px-2 rounded-md transition-all"
      >
        <span className="text-slate-900 font-semibold">Need help, Contact Us!</span><img src="/whatsapp.svg" alt="whatsapp image icon" className="w-10 h-10" />
      </a>
    </header>
  );
};
