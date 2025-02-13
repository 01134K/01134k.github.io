"use client";

import { useToast } from "@/hooks/use-toast";
import NumberPad from "@/components/NumberPad";
import Image from "next/image";

export default function Home() {
  const { toast } = useToast();

  const handleEnter = (value: string) => {
    toast({
      title: "Number entered",
      description: `You entered: ${value}`,
    });
  };

  return (
    <div className="min-h-screen bg-custom-background flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl flex flex-col md:flex-row overflow-hidden max-w-4xl w-full">
        <div className="w-full md:w-1/2">
          <Image
            src={"/main.png"}
            alt={"main"}
            // fill
            width={800} // ปรับขนาดตามต้องการ
            height={600} // ปรับขนาดตามต้องการ
            className="object-cover"
          />
          {/* <div className="relative w-[400px] h-[500px] overflow-hidden">
            <Image src="/main.JPG" alt="main" fill className="object-cover" />
          </div> */}
        </div>
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-custom-pink">
            Valentine&#39;s Day
          </h1>
          <div className="flex items-center justify-center">
            <NumberPad onEnter={handleEnter} />
          </div>
        </div>
      </div>
    </div>
  );
}
