import  HeroContent  from "./HeroContent";
import  HeroImage  from "./HeroImage";

export default  function Hero() {
  return (
    // 1. شيلنا px-64 واستخدمنا مسافات تدريجية (px-4 للموبايل لحد px-8 للشاشات الكبيرة)
    // 2. استخدمنا max-w-7xl عشان نلم التصميم في الشاشة الـ 24 بوصة
    // 3. شيلنا h-screen وحطينا min-h-[80vh] عشان ياخد مساحته وراعينا لو الكلام كتر يطول معاه
    <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 min-h-[80vh] flex items-center border-b border-[#364153] py-16 md:py-24">
      
      {/* خلينا الـ Grid عمود واحد في الموبايل، وعمودين من أول اللاب توب (lg) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
        <HeroContent />
        <HeroImage />
      </div>

    </section>
  );
}