export default  function HeroImage() {
  return (
    // ضفنا w-full عشان تاخد مساحة العمود بتاعها بالظبط في الـ Grid
    <div className="w-full mx-auto rounded-xl overflow-hidden shadow-2xl">
      <img
        src="Hero.png"
        alt="DNA structure representing RNA-Seq"
        className="w-full h-auto object-cover aspect-square md:aspect-auto"
      />
    </div>
  );
}
