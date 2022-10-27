import React from "react";
import Footer from "./Partials/Footer";
import Header from "./Partials/Header";

const DefaultLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-slate-800">
      <header className="">
        <Header />
      </header>
      <main className="flex-1 flex justify-center my-8">
        {children}
      </main>
      <footer className="flex flex-col justify-center items-center bg-sky-900 text-white dark:bg-slate-700 pt-3">
        <Footer />
      </footer>
    </div>
  );
};

export default DefaultLayout;
