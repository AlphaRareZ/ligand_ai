import Logo from "../components/Logo";
import NavBar from "./NavBar";
{/*
  
  */}
export default function Header() {
  return (
    // Header يأخذ العرض بالكامل مع خلفية
    <header className="border-b border-[#364153] bg-[#101622] w-full z-50 sticky top-0">
      {/* المحتوى الداخلي متسنتر ومحدود */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 flex justify-between items-center">
        <Logo />
        <NavBar />
      </div>
    </header>
  );
}
