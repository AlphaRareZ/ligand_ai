"use client";
import Link from "next/link";
import Button from "../components/Button";
import { usePathname } from "next/navigation";
import StartAnalysisButton from "../components/StartAnalysisButton";

export default function NavBar() {
    const links = [
        { name: "Home", href: "/" },
        { name: "Services", href: "/services" },
        { name: "Research", href: "/research" },
        { name: "How It Works", href: "/how-it-works" },
        { name: "About Us", href: "/about-us" },
    ];
    const pathName = usePathname();
    console.log("Current Path:", pathName);
    return (
        <nav className="flex items-center">
            <ul className="hidden md:flex gap-6 lg:gap-8 items-center justify-center font-medium text-[#cad4e0]">
                {links.map((link) => {
                    const isActive =
                        link.href === pathName ? "text-blue-500" : "";
                    return (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`hover:text-blue-500 transition-colors ${isActive}`}
                            >
                                {link.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>

            <Link href={"/sign-in"}>
                {/* <Button  className="ml-8 hidden sm:inline-flex">Start Analysis</Button> */}
                <StartAnalysisButton>Start Analysis</StartAnalysisButton>
            </Link>
        </nav>
    );
}
