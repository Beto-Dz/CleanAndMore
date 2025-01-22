export const Layout = ({ children }) => {
  return (
    <main className="w-full h-dvh grid grid-rows-auto1fr overflow-hidden animate-blurred-fade-in">
      {children}
    </main>
  )
}
