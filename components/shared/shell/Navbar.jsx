"use client";
import RouteConstants from "@/common/RouteConstants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "home-outline",
    title: "Dashboard",
    link: RouteConstants.Dashboard,
  },
  {
    name: "wallet-outline",
    title: "Ledger",
    link: RouteConstants.Ledger,
  },
  {
    name: "pie-chart-outline",
    title: "Reports",
    link: RouteConstants.Reports,
  },
  //   {
  //     name: "people-outline",
  //     title: "Team",
  //     link: RouteConstants.Team,
  //   },
  //   {
  //     name: "folder-outline",
  //     title: "Projects",
  //     link: RouteConstants.Projects,
  //   },
  //   {
  //     name: "calendar-outline",
  //     title: "Calender",
  //     link: RouteConstants.Calender,
  //   },
  //   {
  //     name: "documents-outline",
  //     title: "Documents",
  //     link: RouteConstants.Documents,
  //   },
  //   {
  //     name: "settings-outline",
  //     title: "Settings",
  //     link: RouteConstants.Settings,
  //   },
];
const Navbar = () => {
  const pathname = usePathname();

  if (pathname.includes("/auth") || pathname === "/") return null;

  return (
    <nav className="hidden h-screen border-r md:block md:w-[280px] pt-8">
      {navLinks.map((navlink, index) => (
        <Link
          href={navlink.link}
          key={index}
          className={`px-4 py-2 text-md mr-0.5 flex cursor-pointer items-center justify-stretch gap-2  ${
            pathname === navlink.link
              ? "bg-primary dark:bg-primary"
              : "hover:bg-secondary"
          } }`}
        >
          <div className="m-2">
            <ion-icon name={navlink.name}></ion-icon>
          </div>
          <span>{navlink.title}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
