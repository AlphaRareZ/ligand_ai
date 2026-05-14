import StatCard  from "./StatCard";
export default function StatsSection() {
  return (
    // استخدمنا Grid: 1 عمود موبايل -> 2 تابلت -> 4 ديسكتوب
    <div className="border-b border-[#364153] bg-[#101726]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard
          title="Discovery Success Rate"
          value="3.5x"
          color="text-[#34d399]"
          subtitle="+250%"
        />
        <StatCard
          title="Time to Phase I"
          value="10mo"
          color="text-[#f97316]"
          subtitle="-60%"
        />
        <StatCard
          title="Genomic Data Points"
          value="50B+"
          color="text-[#34d399]"
          subtitle="Verified"
        />
        <StatCard
          title="Patent Pending Assets"
          value="12"
          color="text-[#1152b3]"
          subtitle="Clinical"
        />
      </div>
    </div>
  );
}