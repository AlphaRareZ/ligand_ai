import { Mail, Share2Icon } from "lucide-react";
import FooterInfo from "../components/FooterInfo";
import FooterColumn from "../components/FooterColumn";
const footerData = [
    {
        title: "Contact",
        items: [
            {
                label: "Email 1",
                link: "mailto:20221238@stud.fci-cu.edu.eg",
            },
            {
                label: "Email 2",
                link: "mailto:20211083@stud.fci-cu.edu.eg",
            },            
        ],
    },
    {
        title: "Documentation",
        items: [
            {
                label: "API",
                link: "https://api.aml2ligand.online/scalar",
            },
        ],
    },
    {
        title: "Menu",
        items: [
            {
                label: "Home",
                link: "/",
            },
            {
                label: "Services",
                link: "/services",
            },
            {
                label: "Research",
                link: "/research",
            },
            {
                label: "How It Works",
                link: "/how-it-works",
            },
            {
                label: "About Us",
                link: "/about-us",
            },
        ],
    },
];
export default function Footer() {
    return (
        <footer className="w-full bg-[#101622] ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Grid متجاوب: 1 للموبايل -> 2 للتابلت -> 4 للديسكتوب */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-12 border-b border-gray-700  py-16">
                    <FooterInfo />
                    {footerData.map((col, idx) => (
                        <FooterColumn
                            key={idx}
                            title={col.title}
                            items={col.items}
                        />
                    ))}
                </div>

                {/* الجزء السفلي: تحت بعض في الموبايل، وجنب بعض في الشاشات الكبيرة */}
                <div className="pt-8 pb-12 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-center md:text-left">
                        &copy; {2026} AML2Ligand Research Lab. All rights
                        reserved.
                    </p>
                    <div className="flex gap-6">
                        <a
                            href="#"
                            className="hover:text-white transition-colors"
                        >
                            <Share2Icon size={20} />
                        </a>
                        <a
                            href="mailto:@gmail.com"
                            className="hover:text-white transition-colors"
                        >
                            <Mail size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
