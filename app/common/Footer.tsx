import { Mail, Share2Icon } from "lucide-react";
import FooterInfo from "../components/FooterInfo";
import FooterColumn from "../components/FooterColumn";
const footerData = [
  {
    title: "Contact",
    items: [
      {
        label: "Email",
        link: "mailto:dodo1003pro@gmail.com",
      },
      {
        label: "Phone",
        link: "tel:+1234567890",
      },
    ],
  },
  {
    title: "Documentation",
    items: [
      {
        label: "API",
        link: "http://76.13.15.132:5015/scalar",
      },
    ],
  },
  {
    title: "Menu",
    items: [
      {
        label: "Services",
        link: "#",
      },
      {
        label: "Research",
        link: "#",
      },
      {
        label: "How It Works",
        link: "#",
      },
      {
        label: "About Us",
        link: "#",
      },
    ],
  },
];
export default function Footer() {
  return (
    <footer className="w-full bg-[#101622]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid متجاوب: 1 للموبايل -> 2 للتابلت -> 4 للديسكتوب */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-16 gap-12 border-b border-gray-700">
          <FooterInfo />
          {footerData.map((col, idx) => (
            <FooterColumn key={idx} title={col.title} items={col.items} />
          ))}
        </div>

        {/* الجزء السفلي: تحت بعض في الموبايل، وجنب بعض في الشاشات الكبيرة */}
        <div className="pt-8 pb-12 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-center md:text-left">
            &copy; {2026} Ligand AI Therapeutics Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              <Share2Icon size={20} />
            </a>
            <a
              href="mailto:dodo1003pro@gmail.com"
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
