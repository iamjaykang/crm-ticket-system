import React from "react";
import Footer from "./Partials/Footer";
import Header from "./Partials/Header";

const DefaultLayout = ({children}) => {
  return (
    <div className="grid grid-rows-3 h-screen">
      <header className="min-h-[6vh]">
        <Header />
      </header>
      <body className="">
      {children}
      </body>
      <footer className="bg-gray-200 min-h-[6vh]">
        <Footer />
      </footer>
    </div>
  );
};

export default DefaultLayout;
