"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";

interface NumberPadProps {
  onEnter: (value: string) => void;
}

const NumberPad: React.FC<NumberPadProps> = ({ onEnter }) => {
  const [input, setInput] = useState<string>('');
  const router = useRouter();
  const { toast } = useToast();

  const handleNumberClick = (number: number) => {
    if (input.length < 8) {
      setInput(prev => prev + number);
    }
  };

  const handleDelete = () => {
    setInput(prev => prev.slice(0, -1));
  };

  const handleEnter = () => {
    if (input.length < 8) {
      toast({
        title: "รหัสไม่ครบ",
        description: "โปรดใส่รหัสให้ครบ 8 หลัก",
      });
      return;
    }

    if (input === "20062021") {
      onEnter(input);
      setInput('');
      router.push('/success');
    } else {
      toast({
        title: "รหัสไม่ถูกต้อง",
        description: "โปรดใส่รหัสที่ถูกต้อง",
        variant: "destructive",
      });
      setInput('');
    }
  };

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="w-full max-w-xs">
      <div className="mb-4 h-12 bg-white rounded-lg border flex items-center justify-end px-4">
        <span className="text-2xl font-semibold">{input}</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {numbers.map((num) => (
          <Button
            key={num}
            onClick={() => handleNumberClick(num)}
            className="h-12 text-xl font-semibold bg-white text-gray-800 hover:bg-custom-pink hover:text-white transition-colors"
          >
            {num}
          </Button>
        ))}
        <Button
          className="h-12 text-xl font-semibold bg-white text-gray-800 hover:bg-custom-pink hover:text-white transition-colors"
        >
        </Button>
        <Button
          onClick={() => handleNumberClick(0)}
          className="h-12 text-xl font-semibold bg-white text-gray-800 hover:bg-custom-pink hover:text-white transition-colors"
        >
          0
        </Button>
        <Button
          onClick={handleDelete}
          className="h-12 text-xl font-semibold bg-white text-gray-800 hover:bg-custom-pink hover:text-white transition-colors"
        >
          <X className="h-6 w-6" />
        </Button>
        <Button
          onClick={handleEnter}
          className="col-span-3 h-12 text-xl font-semibold bg-custom-pink text-white hover:bg-opacity-90 mt-2"
        >
          Enter
        </Button>
      </div>
    </div>
  );
};

export default NumberPad;