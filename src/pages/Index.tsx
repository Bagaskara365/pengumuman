import { useState } from "react";
import { LoginForm } from "@/components/LoginForm";
import { CountdownTimer } from "@/components/CountdownTimer";
import { AnnouncementDashboard } from "@/components/AnnouncementDashboard";
import { DebugDataComponent } from "@/components/DebugDataComponent";
import { PesertaData } from "@/lib/pesertaData";
import { DEV_CONFIG } from "@/config/devConfig";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pesertaData, setPesertaData] = useState<PesertaData | null>(null);
  const [isAnnouncementTime, setIsAnnouncementTime] = useState(false);
  const [showDebug, setShowDebug] = useState(false);

  // Set announcement time - for demo, set to 30 seconds from now
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

  // Show debug component in development mode
  if (DEV_CONFIG.showDevIndicator && showDebug) {
    return (
      <div>
        <div className="fixed top-4 right-4 z-50">
          <button 
            onClick={() => setShowDebug(false)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Close Debug
          </button>
        </div>
        <DebugDataComponent />
      </div>
    );
  }

  // Show login form if not logged in
  if (!isLoggedIn) {
    return (
      <div>
        {DEV_CONFIG.showDevIndicator && (
          <div className="fixed top-4 right-4 z-50">
            <button 
              onClick={() => setShowDebug(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded text-sm"
            >
              Debug Data
            </button>
          </div>
        )}
        <LoginForm onLogin={handleLogin} />
      </div>
    );
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
