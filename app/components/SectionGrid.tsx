
// أزلنا الـ cols prop الخطأ، واعتمدنا على الـ className اللي بيتبعت من بره
export default function SectionGrid({ children, className }:{children:React.ReactNode, className?:string}) {
  return (
    // الأساس عمود واحد للموبايل، والـ className اللي هتبعته هيحدد الباقي
    <div className={`grid grid-cols-1 gap-8 md:gap-12 ${className}`}>
      {children}
    </div>
  );
}
