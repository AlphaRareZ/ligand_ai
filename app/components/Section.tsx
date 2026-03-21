export default function Section({ title, description, children, hasBorder = false }) {
  return (
    // أزلنا px-64 واستخدمنا الـ Container الموحد
    <div className={`w-full ${hasBorder ? "border-b border-[#1e293b]" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4">{title}</h2>
        {/* العرض 100% للموبايل، و 60% للشاشات الكبيرة */}
        <p className="text-gray-400 w-full md:w-[60%] lg:w-1/2 mb-12 font-semibold">
          {description}
        </p>
        {children}
      </div>
    </div>
  );
}

// 💡 طريقة الاستخدام في ملف الـ Home:
// <SectionGrid className="md:grid-cols-2 lg:grid-cols-3">
//    <SectionCard ... />
// </SectionGrid>