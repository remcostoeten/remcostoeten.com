import React, { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import Toggle from "./Toggle";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`header relative top-0 flex align-middle w-full transition-all	 ${
        menuOpen ? "menu-open" : ""
      } ${sticky ? "sticky" : "sticky"}`}
    >
      <div className="container justify-between items-center flex transition-width duration-500 ease-in-out">
        <div
          className="flex justify-between align-middle z-20"
          onClick={handleCloseMenu}
        >
          <Logo />
          <Toggle
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            handleCloseMenu={handleCloseMenu}
          />
        </div>
      </div>
    </div>
  );
}
