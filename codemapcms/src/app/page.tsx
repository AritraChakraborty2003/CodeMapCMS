"use client";
import { Carousel } from "@/Components/ui/carousel";
import Clients from "@/Components/ui/Clients";
import Footer from "@/Components/ui/Footer";
import Header from "@/Components/ui/Header";
import Iridescence from "@/Components/ui/Iridescence";

export default function Home() {
  const slideData = [
    {
      title: "Digital Agency CMS",
      button: "Explore Solution",
      src: "/agency.jpg",
    },
    {
      title: "Ecommerce CMS",
      button: "Explore Solution",
      src: "https://png.pngtree.com/thumb_back/fh260/background/20231002/pngtree-d-render-of-an-online-ecommerce-shopping-interface-exploring-the-world-image_13572262.png",
    },
    {
      title: "Retail Store CMS",
      button: "Explore Solution",
      src: "/retail.jpg",
    },
    {
      title: "Travel Agency CMS",
      button: "Explore Solution",
      src: "https://images.unsplash.com/photo-1590041794748-2d8eb73a571c?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Real Estate CMS",
      button: "Explore Component",
      src: "/realestate.jpg",
    },
    {
      title: "Hotels & Restaurants CMS",
      button: "Explore Solution",
      src: "/restaurant_hotel.jpg",
    },
    {
      title: "Blog Management CMS",
      button: "Explore Solution",
      src: "/blogger.jpg",
    },
    {
      title: "Spa & Salon CMS",
      button: "Explore Solution",
      src: "/spa_salon.jpg",
    },
    {
      title: "Hospital & Clinical CMS",
      button: "Explore Solution",
      src: "/hospital.webp",
    },
    {
      title: "Education CMS",
      button: "Explore Solution",
      src: "/schools.avif",
    },
    {
      title: "CA & LAW Services CMS",
      button: "Explore Solution",
      src: "/CA.jpg",
    },
    {
      title: "Portfolio CMS",
      button: "Explore Solution",
      src: "/portfolio.webp",
    },
    {
      title: "Custom SaaS or Software CMS",
      button: "Explore Solution",
      src: "/custom.jpeg",
    },
  ];
  return (
    <>
      <Header />
      <div className="max-w-screen-2xl h-[84vh] lg:h-[86vh]">
        <Iridescence
          color={[1, 1, 1]}
          mouseReact={false}
          amplitude={0.1}
          speed={1.0}
        />
      </div>
      <Clients />
      <div className="relative space-y-2 py-8 lg:space-y-4 overflow-hidden w-full h-full py-14 lg:mt-[-2vmin] lg:py-28">
        <p className="font-extrabold text-5xl lg:text-6xl ml-2">Our Features</p>

        <Carousel slides={slideData} />
      </div>

      <Footer />
    </>
  );
}
