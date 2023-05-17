import React, { useRef, useState } from "react";
import RetroButton from "@/components/ui-elements/buttons/RetroButton";
import OffcanvasMenuLinks from "./OffcanvasMenuLinks";
import styles from "./Toggle.module.scss";
import MenuButton from "./MenuButton";

const Toggle = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredClasses, setHoveredClasses] = useState([]); // Add hoveredClasses state
  const parentClass = `offcanvas-menu ${hoveredClasses.join(" ")}`;

  const handleCloseMenu = () => {
    setMenuOpen(false);
    document.body.classList.remove("offcanvas-open");
  };

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      document.body.classList.add("offcanvas-open");
      setTimeout(() => {
        document.body.classList.add("menu-delay");
      }, 500);
    } else {
      document.body.classList.remove("offcanvas-open");
      document.body.classList.remove("menu-delay");
    }
  };

  return (
    <>
      <div>
        <div onClick={handleToggle}>
          <MenuButton onClick={handleToggle} />
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
          <symbol
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 44 44"
            id="path"
          >
            <path d="M22,22 L2,22 C2,11 11,2 22,2 C33,2 42,11 42,22"></path>
          </symbol>
        </svg>
        {menuOpen && (
          <div className="offcanvas-menu absolute left-0 text-offWhite top-24">
            <div className={styles.container + " text-off-white text-"}>
              <div className="z-20 delayShow flex flex-col pl-8 md:pl-10 items-baseline">
                <div className="offcanvas-menu__menu--tagline mb-12">
                  <h2 className="animate__flipInX">Remco stoeten</h2>
                  <p className="first">
                    <span>Aspiring to be more</span>
                  </p>
                  <p className="last">
                    than a <i>divjesschuiver</i>
                  </p>
                </div>
                <div className="flex flex-col mb-8">
                  <OffcanvasMenuLinks handleCloseMenu={handleCloseMenu} />
                </div>
                <div className="flex">
                  <RetroButton
                    text="Github"
                    href="https://github.com/remcostoeten"
                    handleCloseMenu={handleCloseMenu}
                  />
                  <span className="ml-4">
                    <RetroButton
                      text="Text or call"
                      href="https://wa.me/31636590707"
                      handleCloseMenu={handleCloseMenu}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Toggle;
