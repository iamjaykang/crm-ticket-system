import React from "react";
import Footer from "./Partials/Footer";
import Header from "./Partials/Header";

const DefaultLayout = ({children}) => {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex-1 mb-2">
        <Header />
      </header>
      <main className="flex-1 flex justify-center items-center">
      {children}
      </main>
      <footer className="mt-10 flex flex-col justify-center items-center bg-slate-800 text-white flex-1">
        <Footer />
      </footer>
    </div>
  );
};

export default DefaultLayout;
