export function HowItWorksCardFooter({
  data,
  textColor,
}: {
  data: { icon: any; text: string }[];
  textColor?: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      {data.map((item, index) => (
        <div key={index} className="flex flex-row gap-4">
          <item.icon size={24} className={textColor} />
          <p className="text-[#cbd5d5] font-semibold tracking-wide">
            {item.text}
          </p>
        </div>
      ))}
    </div>
  );
}
