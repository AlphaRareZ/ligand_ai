export default  function PulsingMessage({ children }) {
  return (
    // Pulsing dot with text
    <div className="flex gap-4 items-center bg-[#101b34] text-[#1152d4] size-fit rounded-full px-4 py-1 w-max relative border-[#0f2553] border-2">
      <span className="w-3 h-3 rounded-full bg-[#1152d4]"></span>
      <span className="animate-ping w-3 h-3 rounded-full bg-[#1152d4]  absolute"></span>
      <p className="uppercase font-mono font-bold">{children}</p>
    </div>
  );
}
