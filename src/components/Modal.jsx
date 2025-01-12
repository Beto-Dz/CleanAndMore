export const Modal = ({ title, children, open, button }) => {
  if (open === false) return null;
  return (
    <div className="fixed top-0 left-0 w-full h-full grid place-content-center bg-black bg-opacity-80 z-10">
      <dialog
        className="static flex flex-col items-stretch gap-2 p-4 rounded-lg bg-white min-w-80 sm:min-w-96"
        open={open}
      >
        <header>
          <h2 className="text-2xl font-bold text-center text-slate-800">{title}</h2>
        </header>
          {children}
        <footer className="flex justify-center gap-2">
          <button className="bg-red-500 text-white px-2 py-1 rounded-lg">
            Cancel
          </button>
          {button}
        </footer>
      </dialog>
    </div>
  );
};
