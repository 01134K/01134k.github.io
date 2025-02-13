"use client"

import React, { useEffect, useState } from 'react';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger, DialogTitle} from "@/components/ui/dialog";
import { LogOut, Play, Pause } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from 'next/image';

interface MemoryCard {
  image: string;
  title: string;
  description: string;
}

const memories: MemoryCard[] = [
  {
    image: "/1.jpg",
    title: "First Memory",
    // description: "This is our first memory together. A beautiful moment that started it all.",
    description: "ไม่มีอะ รูปนี้ละกัน",
  },
  {
    image: "/3.JPG",
    title: "Special Day",
    description: "ดอกไม้ช่อแรกเลยยย",
  },
  {
    image: "/2.JPG",
    title: "Adventure Time",
    description: "ไปเที่ยววววววววววว",
  },
  {
    image: "/4.JPG",
    title: "You are funny time",
    description: "ในบางครั้้งคุณก็ทำตัวหน้าโดนด่าจริงๆ นะ",
  },
  {
    image: "/5.png",
    title: "When you sleep",
    description: "😴",
  },
  {
    image: "/6.png",
    title: "When you eat",
    description: "อร่อยไหมม",
  },
  {
    image: "/7.jpg",
    title: "When you were a child",
    description: "ตัวน้อยยยย",
  },
];

export default function Success() {
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [isPlaying, setIsPlaying] = useState(false);
  const router = useRouter();
  const audioRef = React.useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const startDate = new Date(2021, 6, 20, 18, 19);

    const updateTime = () => {
      const now = new Date();
      const days = differenceInDays(now, startDate);
      const hours = differenceInHours(now, startDate) % 24;
      const minutes = differenceInMinutes(now, startDate) % 60;
      const seconds = differenceInSeconds(now, startDate) % 60;

      setTimeElapsed({ days, hours, minutes, seconds });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    router.push('/');
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-custom-background p-4">
      <div className="absolute top-4 right-4">
        <Button 
          variant="outline" 
          onClick={handleLogout}
          className="bg-white hover:bg-custom-pink hover:text-white transition-colors"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
      
      <div className="max-w-7xl mx-auto space-y-12 pt-12">
        <div className="bg-white rounded-xl shadow-xl p-8 text-center">
          <h1 className="text-4xl font-bold text-custom-pink mb-8">Happy Anniversary!</h1>
          <div className="space-y-8">
            <p className="text-2xl font-semibold text-gray-700 mb-6">Time Together:</p>
            <div className="border-2 border-gray-200 rounded-lg p-6 shadow-inner">
              <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-6xl font-bold text-gray-800">
                <div className="bg-gray-50 rounded-lg p-4 shadow-md">
                  <div className="flex flex-col items-center gap-2">
                    <span className="tabular-nums">{String(timeElapsed.days).padStart(2, '0')}</span>
                    <span className="text-lg font-medium text-gray-600">Days</span>
                  </div>
                </div>
                <div className="flex gap-8">
                  <div className="bg-gray-50 rounded-lg p-4 shadow-md">
                    <div className="flex flex-col items-center gap-2">
                      <span className="tabular-nums">{String(timeElapsed.hours).padStart(2, '0')}</span>
                      <span className="text-lg font-medium text-gray-600">Hours</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 shadow-md">
                    <div className="flex flex-col items-center gap-2">
                      <span className="tabular-nums">{String(timeElapsed.minutes).padStart(2, '0')}</span>
                      <span className="text-lg font-medium text-gray-600">Minutes</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 shadow-md">
                    <div className="flex flex-col items-center gap-2">
                      <span className="tabular-nums">{String(timeElapsed.seconds).padStart(2, '0')}</span>
                      <span className="text-lg font-medium text-gray-600">Seconds</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-custom-pink mb-8">Our Memories</h2>
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {memories.map((memory, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                          <DialogTitle className="sr-only">{memory.title}</DialogTitle>
                          <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
                            <Image 
                              src={memory.image} 
                              alt={memory.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <h3 className="font-semibold text-lg mb-2">{memory.title}</h3>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    {/* <DialogContent className="max-w-2xl">
                     */}
                     <DialogContent className="max-w-[95vw] w-full max-h-[90vh] overflow-y-auto">
                    <DialogTitle className="sr-only">{memory.title}</DialogTitle>
                    <div className="p-4">
                    <div className="relative w-full h-[60vh] overflow-hidden rounded-lg mb-4">
                          <Image 
                            src={memory.image} 
                            alt={memory.title}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{memory.title}</h3>
                        <p className="text-gray-600">{memory.description}</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-custom-pink mb-8">Our Song</h2>
          <div className="flex justify-center items-center">
            <Button
              variant="outline"
              size="lg"
              className="w-16 h-16 rounded-full"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8" />
              )}
            </Button>
            <audio ref={audioRef} src="/song.mp3" />
          </div>
          <div className="flex justify-center items-center text-xl pt-5">
            <h1>最好的都给你</h1>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-custom-pink mb-8">Message</h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xl text-gray-700 leading-relaxed">
              Wishing us many more beautiful moments together. Every day with you is a new adventure, 
              and I&#39;m grateful for all the memories we&#39;ve created. Here&#39;s to our journey together! ❤️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}