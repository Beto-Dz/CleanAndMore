export const LayoutAuth = ({ children }) => {
  return (
    <section className="w-full h-dvh grid place-content-center bg-primary">
      <div className="px-4 py-2 min-w-80 sm:min-w-96 md:w-[400px] rounded-lg bg-white">
        {children}
      </div>
    </section>
  );
};
