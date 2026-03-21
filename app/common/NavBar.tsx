import Button from "../components/Button";

export default  function NavBar() {
  return (
    <nav className="flex items-center">
      {/* السر هنا: hidden md:flex 
        هتخفي اللينكات في الموبايل عشان متبوظش الدنيا، وتظهرهم في التابلت والديسكتوب
      */}
      <ul className="hidden md:flex gap-6 lg:gap-8 items-center justify-center font-medium text-[#cad4e0]">
        <li><a href="#" className="hover:text-blue-500 transition-colors">Services</a></li>
        <li><a href="#" className="hover:text-blue-500 transition-colors">Research</a></li>
        <li><a href="#" className="hover:text-blue-500 transition-colors">How It Works</a></li>
        <li><a href="#" className="hover:text-blue-500 transition-colors">About Us</a></li>
      </ul>
      {/* الزرار هيفضل ظاهر، وسبنا مسافة بينه وبين اللينكات لو ظهروا */}
      <Button className="ml-8 hidden sm:inline-flex">Start Analysis</Button>
    </nav>
  );
}