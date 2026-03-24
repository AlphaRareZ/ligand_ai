export function HeadingContent({
  heading,
  bluePart,
  description,
  className
}: {
  heading: string;
  bluePart: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
        {heading + " "} {/* الكلمة الملونة بنحطها في span مش h1 تاني */}
        <span className="text-[#1152d4]">{bluePart}</span>
      </h1>

      <p className="text-[#94a3b8] text-base md:text-lg font-medium max-w-2xl">
        {description}
      </p>
    </div>
  );
}
