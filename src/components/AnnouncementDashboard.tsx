import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, User, Calendar, MapPin, GraduationCap, LogOut, MessageSquare } from "lucide-react";
import { PesertaData } from "@/lib/pesertaData";
import { QRCodeComponent } from "./QRCodeComponent";
import { Logo } from "./Logo";

interface AnnouncementDashboardProps {
  pesertaData: PesertaData;
  onLogout: () => void;
}

export const AnnouncementDashboard = ({ pesertaData, onLogout }: AnnouncementDashboardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showQR, setShowQR] = useState(false);
  
  const isAccepted = pesertaData.status_lolos === "LOLOS";

  const handleLogout = () => {
    onLogout();
  };

  const handleJoinWhatsApp = () => {
    const whatsappGroupLink = pesertaData.whatsapp_link;
    if (whatsappGroupLink) {
      window.open(whatsappGroupLink, '_blank');
    } else {
      toast({
        title: "Link tidak tersedia",
        description: "Link grup WhatsApp tidak tersedia untuk status Anda.",
        variant: "destructive",
      });
    }
  };

  const StatusIcon = isAccepted ? CheckCircle : XCircle;
  const statusColor = isAccepted ? "success" : "destructive";
  const statusBg = isAccepted ? "bg-success/10" : "bg-destructive/10";

  const nextSteps = isAccepted ? [
    "Bergabung dengan grup WhatsApp peserta yang diterima magang",
    "Cek group Whatsapp untuk jadwal orientasi dan informasi lebih lanjut",
    "Bersiap untuk memulai kegiatan magang sesuai jadwal yang diberikan"
  ] : [
    "Jangan berkecil hati, tingkatkan skill dan pengalaman",
    "Ikuti program magang selanjutnya",
    "Bergabung dengan komunitas untuk networking",
    "Terus belajar dan berlatih untuk kesempatan berikutnya"
  ];

  return (
    <div className="min-h-screen bg-gradient-hero p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Logo size={48} />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Bandhayudha</h1>
              <p className="text-muted-foreground">Divisi {pesertaData.divisi}</p>
            </div>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            Keluar
          </Button>
        </div>

        {/* Main Result Card */}
        <Card className={`p-8 mb-6 bg-white/90 border-2 border-gray-200 shadow-2xl animate-fade-in ${statusBg}`}>
          <div className="text-center mb-6">
            <StatusIcon className={`w-20 h-20 mx-auto mb-4 ${isAccepted ? 'text-success' : 'text-destructive'}`} />
            <Badge 
              variant={statusColor as "default"}
              className="text-lg px-6 py-2 mb-2"
            >
              {pesertaData.status_lolos}
            </Badge>
            <h2 className="text-3xl font-bold text-foreground">{pesertaData.nama}</h2>
          </div>

          <div className="bg-white/80 border-2 border-gray-200 rounded-xl p-6 mb-6 shadow-lg">
            <p className="text-lg text-center leading-relaxed">{pesertaData.pesan_khusus}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Program Studi</p>
                  <p className="text-muted-foreground">{pesertaData.program_studi}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Fakultas</p>
                  <p className="text-muted-foreground">{pesertaData.fakultas}</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Status Seleksi</p>
                  <p className="text-muted-foreground">
                    {isAccepted ? "Diterima Magang" : "Belum Lolos Seleksi Magang"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Divisi</p>
                  <p className="text-muted-foreground">{pesertaData.divisi}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => setShowDetails(!showDetails)}
              className="flex-1 bg-gradient-primary text-primary-foreground font-semibold shadow-medium hover:shadow-strong transition-all duration-300"
            >
              {showDetails ? "Sembunyikan" : "Lihat"} Langkah Selanjutnya
            </Button>
            
            {isAccepted && (
              <Button
                onClick={handleJoinWhatsApp}
                className="gap-2 bg-green-600 hover:bg-green-700 text-white"
              >
                <MessageSquare className="w-4 h-4" />
                Join Group WhatsApp
              </Button>
            )}
          </div>
        </Card>

        {/* Next Steps */}
        {showDetails && (
          <Card className="p-6 bg-white/90 border-2 border-gray-200 shadow-2xl animate-fade-in mb-6">
            <h3 className="text-xl font-bold text-foreground mb-4">Langkah Selanjutnya</h3>
            <div className="space-y-3">
              {nextSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-foreground">{step}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* QR Code for WhatsApp Group */}
        {isAccepted && pesertaData.whatsapp_link && (
          <Card className="p-6 bg-white/90 border-2 border-gray-200 shadow-2xl animate-fade-in mb-6">
            <h3 className="text-xl font-bold text-foreground mb-4 text-center">
              Bergabung dengan Grup WhatsApp
            </h3>
            <div className="text-center">
              <div className="mx-auto mb-4 flex justify-center">
                <QRCodeComponent 
                  value={pesertaData.whatsapp_link} 
                  size={200}
                  className="shadow-lg"
                />
              </div>
              <p className="text-muted-foreground mb-4">
                Scan QR code di atas atau klik tombol di bawah untuk bergabung
              </p>
              <Button
                onClick={handleJoinWhatsApp}
                className="gap-2 bg-green-600 hover:bg-green-700 text-white"
              >
                <MessageSquare className="w-4 h-4" />
                Buka Grup WhatsApp
              </Button>
            </div>
          </Card>
        )}

        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>UNDIP Abu Robocon Research Team</p>
          <p className="mt-1">Portal Pengumuman Seleksi Magang 2025</p>
        </div>
      </div>
    </div>
  );
};