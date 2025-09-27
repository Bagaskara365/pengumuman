import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Logo } from "./Logo";

interface CountdownTimerProps {
  targetDate: Date;
  onComplete: () => void;
}

export const CountdownTimer = ({ targetDate, onComplete }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        onComplete();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-white border-2 border-primary/20 text-primary rounded-xl p-4 min-w-[80px] shadow-lg">
        <span className="text-3xl md:text-4xl font-bold block">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="text-sm font-medium text-muted-foreground mt-2 uppercase tracking-wide">
        {label}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl p-8 md:p-12 bg-white/90 border-2 border-gray-200 shadow-2xl animate-fade-in text-center">
        <div className="mb-8">
          <div className="mb-6 flex justify-center">
            <Logo size={80} className="shadow-lg" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6 px-2 leading-relaxed">
            Pengumuman Segera Dibuka
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Portal pengumuman hasil seleksi lolos magang UNDIP Abu Robocon Research Team
            akan dibuka dalam:
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-2xl mx-auto mb-8">
          <TimeUnit value={timeLeft.days} label="Hari" />
          <TimeUnit value={timeLeft.hours} label="Jam" />
          <TimeUnit value={timeLeft.minutes} label="Menit" />
          <TimeUnit value={timeLeft.seconds} label="Detik" />
        </div>

        <div className="bg-white/80 border-2 border-gray-200 rounded-xl p-6 max-w-2xl mx-auto shadow-lg">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Informasi Penting
          </h3>
          <ul className="text-muted-foreground text-left space-y-2">
            <li>• Peserta yang lolos akan diarahkan ke grup lolos seleksi magang Bandhayudha</li>
          </ul>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          <p>UNDIP Abu Robocon Research Team</p>
          <p className="mt-1">Portal Pengumuman Seleksi Magang Bandhayudha 2025</p>
        </div>
      </Card>
    </div>
  );
};