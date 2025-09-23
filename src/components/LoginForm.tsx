import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { validateLogin, PesertaData } from "@/lib/pesertaData";
import { isLoginTimeAllowed, getFormattedJakartaTime, getCountdownBreakdown } from "@/lib/timeUtils";
import { DEV_CONFIG } from "@/config/devConfig";
import { isMobileDevice, isSlowConnection } from "@/utils/deviceDetection";
import { Logo } from "./Logo";

interface LoginFormProps {
  onLogin: (pesertaData: PesertaData) => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [canLogin, setCanLogin] = useState(false);
  const [deviceInfo] = useState(() => ({
    isMobile: isMobileDevice(),
    isSlowConnection: isSlowConnection(),
  }));

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(getFormattedJakartaTime());
      setCountdown(getCountdownBreakdown());
      setCanLogin(isLoginTimeAllowed());
    };

    updateTime();
    // Reduce timer frequency on slow connections
    const interval = setInterval(updateTime, deviceInfo.isSlowConnection ? 5000 : 1000);

    return () => clearInterval(interval);
  }, [deviceInfo.isSlowConnection]);

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
    
    if (!username || !token) {
      toast({
        title: "Data tidak lengkap",
        description: "Silakan isi username dan token dengan benar",
        variant: "destructive",
      });
      return;
    }

    if (username.trim().length < 3) {
      toast({
        title: "Username tidak valid",
        description: "Username minimal 3 karakter",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const pesertaData = await validateLogin(username, token);
      
      if (pesertaData) {
        onLogin(pesertaData);
        toast({
          title: "Login berhasil",
          description: `Selamat datang, ${pesertaData.nama}!`,
        });
      } else {
        toast({
          title: "Login gagal",
          description: "Username atau token tidak valid",
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

  // Use simplified classes for mobile
  const containerClasses = deviceInfo.isMobile 
    ? "min-h-screen bg-gradient-hero flex items-center justify-center p-4"
    : "min-h-screen bg-gradient-hero flex items-center justify-center p-4";
    
  const cardClasses = deviceInfo.isMobile
    ? "w-full max-w-md p-6 bg-white border-2 border-gray-200 shadow-lg animate-fade-in"
    : "w-full max-w-md p-8 bg-white/90 border-2 border-gray-200 shadow-2xl animate-fade-in";

  return (
    <div className={containerClasses}>
      <Card className={cardClasses}>
        {/* Development Mode Indicator */}
        {DEV_CONFIG.showDevIndicator && (
          <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-3 mb-6 text-center">
            <p className="text-sm font-bold text-yellow-800">🔧 MODE DEVELOPMENT</p>
            <p className="text-xs text-yellow-700 mt-1">
              Login bisa diakses kapan saja untuk keperluan editing
            </p>
          </div>
        )}

        {/* Mobile Connection Warning */}
        {deviceInfo.isSlowConnection && (
          <div className="bg-orange-100 border border-orange-400 rounded-lg p-3 mb-4 text-center">
            <p className="text-xs font-medium text-orange-800">
              📶 Koneksi lambat terdeteksi - Interface disederhanakan
            </p>
          </div>
        )}
        
        <div className="text-center mb-6">
          <div className="mb-4 flex justify-center">
            <Logo size={deviceInfo.isMobile ? 60 : 80} />
          </div>
          <h1 className={`font-bold text-black ${deviceInfo.isMobile ? 'text-2xl' : 'text-3xl'}`}>
            BANDHAYUDHA
          </h1>
          <p className={`text-black mt-2 ${deviceInfo.isMobile ? 'text-sm' : ''}`}>
            Pengumuman Hasil Seleksi Berkas
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Time Display */}
          <div className={`rounded-lg p-3 text-center border-2 shadow-lg ${
            DEV_CONFIG.showDevIndicator 
              ? 'bg-green-50 border-green-200' 
              : 'bg-white/80 border-gray-200'
          }`}>
            <p className={`text-sm font-medium mb-1 ${
              DEV_CONFIG.showDevIndicator ? 'text-green-800' : 'text-gray-800'
            }`}>
              Waktu Server {DEV_CONFIG.showDevIndicator ? '(Mode Dev)' : ''}
            </p>
            <p className={`${deviceInfo.isMobile ? 'text-base' : 'text-lg'} font-bold ${
              DEV_CONFIG.showDevIndicator ? 'text-green-900' : 'text-gray-900'
            }`}>
              {currentTime}
            </p>
            
            {/* Countdown Display */}
            {!canLogin && !DEV_CONFIG.showDevIndicator && (
              <div className="mt-3">
                <p className="text-sm text-red-600 font-medium mb-2">
                  Pengumuman akan dibuka dalam:
                </p>
                <div className="grid grid-cols-4 gap-1">
                  <div className="bg-white rounded-lg p-2 border border-gray-200 shadow">
                    <div className={`${deviceInfo.isMobile ? 'text-lg' : 'text-xl'} font-bold text-gray-700`}>
                      {countdown.days.toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs text-gray-600 uppercase font-medium">
                      Hari
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-2 border border-gray-200 shadow">
                    <div className={`${deviceInfo.isMobile ? 'text-lg' : 'text-xl'} font-bold text-gray-700`}>
                      {countdown.hours.toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs text-gray-600 uppercase font-medium">
                      Jam
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-2 border border-gray-200 shadow">
                    <div className={`${deviceInfo.isMobile ? 'text-lg' : 'text-xl'} font-bold text-gray-700`}>
                      {countdown.minutes.toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs text-gray-600 uppercase font-medium">
                      Menit
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-2 border border-gray-200 shadow">
                    <div className={`${deviceInfo.isMobile ? 'text-lg' : 'text-xl'} font-bold text-gray-700`}>
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
            <Label htmlFor="username" className="text-sm font-medium">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="Masukkan username Anda"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`${deviceInfo.isMobile ? 'h-10' : 'h-12'} border-2 focus:border-primary transition-colors`}
              disabled={isLoading || !canLogin}
              autoComplete="username"
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
              className={`${deviceInfo.isMobile ? 'h-10' : 'h-12'} border-2 focus:border-primary transition-colors`}
              disabled={isLoading || !canLogin}
            />
          </div>

          <Button
            type="submit"
            className={`w-full ${deviceInfo.isMobile ? 'h-10' : 'h-12'} bg-gradient-primary text-primary-foreground font-semibold shadow-medium hover:shadow-strong transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
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

        <div className={`mt-4 text-center text-sm text-muted-foreground ${deviceInfo.isMobile ? 'text-xs' : ''}`}>
          <p>UNDIP Abu Robocon Research Team</p>
          <p className="mt-1">Portal Pengumuman Magang</p>
        </div>

        {/* Debug Info - Development Only */}
        {DEV_CONFIG.isDevelopment && (
          <div className="mt-4 p-3 bg-gray-100 rounded-lg text-xs text-gray-600">
            <p className="font-semibold mb-2">🔧 Debug - Test Credentials:</p>
            <div className="grid grid-cols-2 gap-2 text-left">
              <div>
                <p className="font-mono">ahmadbudi / ABC123</p>
                <p className="font-mono">sitinurhaliza / DEF456</p>
                <p className="font-mono">johndoe / GHI789</p>
              </div>
              <div>
                <p className="font-mono">janesmith / JKL012</p>
                <p className="font-mono">mikejohnson / MNO345</p>
                <p className="font-mono">sarahwilson / PQR678</p>
              </div>
            </div>
            <p className="mt-2 text-gray-500">Username / Token untuk testing</p>
          </div>
        )}
      </Card>
    </div>
  );
};