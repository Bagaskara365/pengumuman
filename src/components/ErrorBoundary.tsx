import { useState, useEffect } from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorInfo {
  componentStack: string;
}

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ 
  children, 
  fallback = <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Terjadi Kesalahan</h2>
      <p className="text-gray-600 mb-4">Silakan refresh halaman atau coba lagi nanti.</p>
      <button 
        onClick={() => window.location.reload()} 
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Refresh Halaman
      </button>
    </div>
  </div>
}) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Application Error:', event.error);
      setError(event.error);
      setHasError(true);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled Promise Rejection:', event.reason);
      setError(new Error(event.reason));
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  if (hasError) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};