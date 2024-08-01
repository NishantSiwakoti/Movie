import React from "react";
import Header from "./components/Header";
import AllRoutes from "./Routes/AllRoutes";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <Header />
      <AllRoutes />
      <Footer />
      <Analytics />
    </>
  );
}

export default App;
