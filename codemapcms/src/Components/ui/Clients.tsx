"use client";
import React from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";
const Clients = () => {
  const logos = ["/venturedrobe.png", "/tanahsarees.png"];
  return (
    <div className="mt-12">
      <Marquee gradient={false} speed={150}>
        {logos.map((logo) => {
          return (
            <>
              {window.innerWidth > 1000 ? (
                <Image
                  src={logo}
                  alt="Client logo"
                  width={190}
                  height={190}
                  className="mx-12"
                />
              ) : (
                <Image
                  src={logo}
                  alt="Client logo"
                  width={140}
                  height={140}
                  className="mx-7"
                />
              )}
            </>
          );
        })}
      </Marquee>
    </div>
  );
};

export default Clients;
