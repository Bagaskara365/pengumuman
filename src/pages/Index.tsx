import { useState } from "react";
import { LoginForm } from "@/components/LoginForm";
import { CountdownTimer } from "@/components/CountdownTimer";
import { AnnouncementDashboard } from "@/components/AnnouncementDashboard";
import { PesertaData } from "@/lib/pesertaData";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pesertaData, setPesertaData] = useState<PesertaData | null>(null);
  const [isAnnouncementTime, setIsAnnouncementTime] = useState(false);

  // Set announcement time - for demo, set to 20 seconds from now
  // In real implementation, this would be the actual announcement date
  const announcementDate = new Date(Date.now() + 20 * 1000);

  const handleLogin = (data: PesertaData) => {
    setPesertaData(data);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPesertaData(null);
  };

  const handleCountdownComplete = () => {
    setIsAnnouncementTime(true);
  };

  // Show login form if not logged in
  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  // Show countdown if logged in but announcement time hasn't arrived
  if (!isAnnouncementTime) {
    return (
      <CountdownTimer 
        targetDate={announcementDate} 
        onComplete={handleCountdownComplete} 
      />
    );
  }

  // Show announcement dashboard
  return (
    <AnnouncementDashboard 
      pesertaData={pesertaData!} 
      onLogout={handleLogout} 
    />
  );
};

export default Index;
