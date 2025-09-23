import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/Logo";

export const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-white/90 border-2 border-gray-200 shadow-2xl text-center">
        <div className="mb-6">
          <Logo size={80} className="mx-auto mb-4" />
          <h1 className="text-6xl font-bold text-gray-400 mb-2">404</h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Halaman Tidak Ditemukan</h2>
          <p className="text-gray-600">
            Halaman yang Anda cari tidak dapat ditemukan.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Path: {location.pathname}
          </p>
        </div>
        
        <Button 
          onClick={() => window.location.href = "/"}
          className="w-full bg-gradient-primary text-primary-foreground font-semibold"
        >
          Kembali ke Beranda
        </Button>
        
        <div className="mt-6 text-sm text-gray-500">
          <p>UNDIP Abu Robocon Research Team</p>
        </div>
      </Card>
    </div>
  );
};

export default NotFound;
