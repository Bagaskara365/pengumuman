import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { validateLogin, PesertaData } from "@/lib/pesertaData";
import { isLoginTimeAllowed, getFormattedJakartaTime, getCountdownBreakdown } from "@/lib/timeUtils";
import { DEV_CONFIG } from "@/config/devConfig";
import { Logo } from "./Logo";

interface LoginFormProps {
  onLogin: (pesertaData: PesertaData) => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [canLogin, setCanLogin] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(getFormattedJakartaTime());
      setCountdown(getCountdownBreakdown());
      setCanLogin(isLoginTimeAllowed());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canLogin) {
      toast({
        title: "Akses Belum Dibuka",
        description: `Login akan dibuka pada tanggal 24 September 2025 pukul 15:00`,
        variant: "destructive",
      });
      return;
    }
    
    if (!email || !token) {
      toast({
        title: "Data tidak lengkap",
        description: "Silakan isi email dan token dengan benar",
        variant: "destructive",
      });
      return;
    }

    if (!email.includes("@")) {
      toast({
        title: "Email tidak valid",
        description: "Silakan masukkan alamat email yang benar",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const pesertaData = await validateLogin(email, token);
      
      if (pesertaData) {
        onLogin(pesertaData);
        toast({
          title: "Login berhasil",
          description: `Selamat datang, ${pesertaData.nama}!`,
        });
      } else {
        toast({
          title: "Login gagal",
          description: "Email atau token tidak valid",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-white/90 border-2 border-gray-200 shadow-2xl animate-fade-in">
        {/* Development Mode Indicator */}
        {DEV_CONFIG.showDevIndicator && (
          <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-3 mb-6 text-center">
            <p className="text-sm font-bold text-yellow-800">🔧 MODE DEVELOPMENT</p>
            <p className="text-xs text-yellow-700 mt-1">
              Login bisa diakses kapan saja untuk keperluan editing
            </p>
          </div>
        )}
        
        <div className="text-center mb-8">
          <div className="mb-4 flex justify-center">
            <Logo size={80} />
          </div>
          <h1 className="text-3xl font-bold text-black">
            BANDHAYUDHA
          </h1>
          <p className="text-black mt-2">
            Pengumuman Hasil Seleksi Berkas
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Time Display */}
          <div className={`rounded-lg p-4 text-center border-2 shadow-lg ${
            DEV_CONFIG.showDevIndicator 
              ? 'bg-green-50 border-green-200' 
              : 'bg-white/80 border-gray-200'
          }`}>
            <p className={`text-sm font-medium mb-1 ${
              DEV_CONFIG.showDevIndicator ? 'text-green-800' : 'text-gray-800'
            }`}>
              Waktu Server {DEV_CONFIG.showDevIndicator ? '(Mode Dev)' : ''}
            </p>
            <p className={`text-lg font-bold ${
              DEV_CONFIG.showDevIndicator ? 'text-green-900' : 'text-gray-900'
            }`}>
              {currentTime}
            </p>
            
            {/* Countdown Display */}
            {!canLogin && !DEV_CONFIG.showDevIndicator && (
              <div className="mt-4">
                <p className="text-sm text-red-600 font-medium mb-3">
                  Login akan dibuka dalam:
                </p>
                <div className="grid grid-cols-4 gap-2">
                  <div className="bg-white rounded-lg p-3 border-2 border-gray-200 shadow-lg">
                    <div className="text-xl font-bold text-gray-700">
                      {countdown.days.toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs text-gray-600 uppercase font-medium">
                      Hari
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border-2 border-gray-200 shadow-lg">
                    <div className="text-xl font-bold text-gray-700">
                      {countdown.hours.toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs text-gray-600 uppercase font-medium">
                      Jam
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border-2 border-gray-200 shadow-lg">
                    <div className="text-xl font-bold text-gray-700">
                      {countdown.minutes.toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs text-gray-600 uppercase font-medium">
                      Menit
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border-2 border-gray-200 shadow-lg">
                    <div className="text-xl font-bold text-gray-700">
                      {countdown.seconds.toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs text-gray-600 uppercase font-medium">
                      Detik
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {DEV_CONFIG.showDevIndicator && canLogin && (
              <p className="text-sm text-green-600 mt-2 font-medium">
                ✅ Login tersedia (Mode Development)
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 border-2 focus:border-primary transition-colors"
              disabled={isLoading || !canLogin}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="token" className="text-sm font-medium">
              Token Akses
            </Label>
            <Input
              id="token"
              type="text"
              placeholder="Masukkan token akses"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="h-12 border-2 focus:border-primary transition-colors"
              disabled={isLoading || !canLogin}
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-primary text-primary-foreground font-semibold shadow-medium hover:shadow-strong transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || !canLogin}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                Memverifikasi...
              </div>
            ) : !canLogin ? (
              "Pengumuman Belum Dibuka"
            ) : (
              "Masuk ke Portal"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>UNDIP Abu Robocon Research Team</p>
          <p className="mt-1">Portal Pengumuman Magang</p>
        </div>
      </Card>
    </div>
  );
};