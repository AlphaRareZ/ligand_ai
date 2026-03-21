export default  function SectionCard({ icon, title, description }) {
  const IconComponent = icon;
  return (
    <div className="p-8 border border-[#364153] rounded-3xl bg-[#0f1625] flex flex-col gap-6">
      <div className=" bg-[#0f1b37] p-4 flex items-center justify-center rounded-xl w-fit">
        <IconComponent className="text-[#1152d4] w-6 h-6" />
      </div>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
