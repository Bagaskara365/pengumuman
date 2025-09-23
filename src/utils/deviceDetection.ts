// Device detection utility for mobile optimization
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

export const isSlowConnection = (): boolean => {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) return false;
  
  const connection = (navigator as any).connection;
  if (!connection) return false;
  
  // Detect slow connections (2G, slow 3G)
  return connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g';
};

export const getDeviceInfo = () => {
  return {
    isMobile: isMobileDevice(),
    isSlowConnection: isSlowConnection(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    viewport: typeof window !== 'undefined' ? {
      width: window.innerWidth,
      height: window.innerHeight,
    } : { width: 0, height: 0 },
  };
};