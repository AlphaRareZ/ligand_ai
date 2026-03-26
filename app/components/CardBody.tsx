export function CardBody({
  heading,
  description,
  className,
}: {
  heading: string;
  description: string;
  className?: string;
}) {
  return (
    <div>
      <h2 className={`font-bold text-4xl mb-4 ${className}`}>{heading}</h2>
      <p className="tracking-wider text-[#94a3b8] mb-4 ">{description}</p>
    </div>
  );
}
