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
    <nav className="hidden h-screen border-r border-border md:block md:w-[300px] bg-primary text-secondary dark:bg-background dark:text-foreground]">
      <div className="h-[60px] mt-4 w-full mx-auto">
        <Link href="/" className="font-black text-3xl px-4 dark:text-white">
          Spendy
        </Link>
      </div>
      {navLinks.map((navlink, index) => (
        <Link
          href={navlink.link}
          key={index}
          className={`px-4 text-md flex cursor-pointer items-center justify-stretch gap-2  hover:text-primary dark:text-foreground  ${
            pathname === navlink.link
              ? "bg-background text-primary dark:bg-primary "
              : "dark:hover:bg-secondary hover:bg-secondary"
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
