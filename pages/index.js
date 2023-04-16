import Announcement from "./components/Announcement";
import Categories from "./components/Categories";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import Slider from "./components/Slider";
import { categories, brands } from "./data";

export default function Home() {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories list={brands} title="OUR BRANDS" />
      <Categories list={categories} title="OUR FAVOURITES" />
      <Footer />
    </div>
  );
}
