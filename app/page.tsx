import SmoothScroll from "../components/SmoothScroll";
import Cursor from "../components/Cursor";
import Preloader from "../components/Preloader";

import Hero from "../components/sections/Hero";
import Work from "../components/sections/Work";
import About from "../components/sections/About";
import Contact from "../components/sections/Contact";

export default function Home() {
  return (
    <>

      <SmoothScroll />

      <Cursor />

      <Preloader />

      <main id="top">

        <Hero />

        <Work />

        <About />

        <Contact />

      </main>

    </>
  );
}