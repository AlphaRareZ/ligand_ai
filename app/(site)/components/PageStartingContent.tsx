export function PageStartingContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 items-center mb-8 md:mb-16 lg:mb-32">
      {children}
    </div>
  );
}
