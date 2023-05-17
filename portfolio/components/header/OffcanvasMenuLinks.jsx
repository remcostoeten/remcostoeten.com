import Link from "next/link";
import { useState, useEffect } from "react";
import { Pills } from "./Pills";

export default function OffcanvasMenuLinks(props) {
  const handleCloseMenu = props.handleCloseMenu;
  const [visible, setVisible] = useState(false);
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5173"
      : "https://remcostoeten.com/svelte";

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const items = [
    {
      label: "Task kanban board",
      href: "/tasks",
      pills: (
        <>
          <Pills className="w-10" variant="tool" text="Tool" />
          <Pills variant="showcase" text="Showcase" />
        </>
      ),
    },
    {
      label: "Text extractor tool",
      href: "/url-filtering-tool",
      pills: <Pills variant="tool" text="Tool" />,
    },
    {
      label: "Chat export",
      href: "/chat-export",
      pills: <Pills variant="upcoming" text="Showcase" />,
    },

    {
      label: "Login",
      href: "/log",
      pills: <Pills variant="wip" text="Work in progress" />,
    },
    {
      label: "Stripe payment",
      href: "/product",
      pills: <Pills variant="wip" text="Work in progress" />,
    },
    {
      label: "WebGL blob",
      href: "/Blob",
      pills: (
        <>
          <Pills variant="experiment" text="Experiment" />
          <Pills variant="showcase" text="Showcase" />
        </>
      ),
    },
  ];

  return (
    <ul className="offcanvas-menu__items">
      {items.map((item, index) => (
        <li
          className="mb-5 md:mb-4 flex items-center"
          onClick={handleCloseMenu}
          key={item.href}
          value={item.wip}
          style={{ animationDelay: `${index * 200}ms` }}
        >
          {item.href ? (
            <Link
              href={item.href}
              className="text-lg menu-item md:text-xl text-off-white"
            >
              {item.label}
            </Link>
          ) : (
            <Link
              href={`${baseUrl}/`}
              className="text-lg md:text-xl text-off-white"
            >
              {item.label}
            </Link>
          )}

          {item.pills}
        </li>
      ))}
    </ul>
  );
}
