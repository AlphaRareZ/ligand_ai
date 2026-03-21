import Button  from "./Button";

export default function CTASection() {
  return (
    <div className="border-b border-[#1e293b] w-full">
      {/* Container للحفاظ على الأبعاد */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#1152d4] flex flex-col gap-8 md:gap-12 justify-center items-center p-8 md:p-16 rounded-3xl md:rounded-4xl text-center">
          {/* النص 100% في الموبايل ويكبر مع الشاشة */}
          <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl w-full md:w-3/4 lg:w-[60%]">
            Ready to transform AML drug discovery?
          </h1>
          <p className="text-[#cfdcf7] w-full md:w-2/3 lg:w-[50%] text-base md:text-lg font-semibold">
            Join leading researchers and biotech innovators using Ligand AI to
            discover the next generation of precision therapeutics.
          </p>
          {/* flex-wrap عشان لو الشاشة صغيرة الزراير تنزل تحت بعض بدل ما تفعص بعض */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="blueBack" size="lg">
              Start Now
            </Button>
            <Button variant="ghost" size="lg" className="border border-white">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}