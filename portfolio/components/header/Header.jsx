import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import Toggle from "./Toggle";
import OffcanvasMenuLinks from "./OffcanvasMenuLinks";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  const handleCloseMenu = () => {
    setMenuOpen(!menuOpen);
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
      <div className="container justify-between items-center flex transition-width duration-500 ease-in-out pl-4 pt-8 pr-2">
        <div className="flex z-20 justify-between" onClick={handleCloseMenu}>
          <Logo />
          <Toggle
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            handleCloseMenu={handleCloseMenu}
          />
        </div>
        <div className="container">
          {menuOpen && (
            <div className="offcanvas-menu text-offWhite">
              <div className="text-off-white">
                <div>
                  <div className="offcanvas-menu__menu--tagline mb-12 fadeIn ml-3 mt-10">
                    <h2 className="animate__flipInX">Remco stoeten</h2>
                    <p className="first">
                      <span>Aspiring to be more</span>
                    </p>
                    <p className="last">
                      than a <i>divjesschuiver</i>
                    </p>
                  </div>
                  <div className="flex flex-col mb-8 mt-10 ml-2">
                    <OffcanvasMenuLinks />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
