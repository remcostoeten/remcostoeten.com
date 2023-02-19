import { Divider } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

function bodyClass() {}
function OffcanvasMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
    document.body.classList.add("menuOpen");
  };
  useEffect(() => {
    if (menuOpen === false) {
      document.body.classList.remove("menuOpen");
    }
  });
  return (
    <div className="header__content">
      <nav
        className={`${"header__content__nav"} 
          ${menuOpen && size.width < 768 ? `${"isMenu"}` : ""} 
          }`}
      >
        <ul>
          <li>aa</li>
        </ul>
      </nav>
      <div className="header__content__toggle">
        {!menuOpen ? (
          <div className="offcanvas" onClick={menuToggleHandler}>
            <div className="hamburger">
              <div className="hamburger__line"></div>
              <div className="hamburger__line"></div>
              <div className="hamburger__line"></div>
            </div>
          </div>
        ) : (
          <button onClick={menuToggleHandler}></button>
        )}
      </div>
    </div>
  );
}

export default OffcanvasMenu;
