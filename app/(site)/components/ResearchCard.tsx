export default  function ResearchCard({ imgSrc, title, description }:{imgSrc:string, title:string, description:string}) {
  return (
    <div className="flex flex-col gap-4 ">
      <div className="w-full aspect-video rounded-2xl overflow-hidden grayscale hover:scale-102 hover:grayscale-0 transition-all duration-500 ">
        <img src={imgSrc} alt="" className="w-full h-full object-cover" />
      </div>
      <h3 className="font-bold text-2xl">{title}</h3>
      <p className="text-[#8fa3b8] ">{description}</p>
    </div>
  );
}
