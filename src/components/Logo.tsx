interface LogoProps {
  size?: number;
  className?: string;
}

export const Logo = ({ size = 48, className = "" }: LogoProps) => {
  return (
    <div 
      className={`flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <img 
        src="/src/assets/images/logo.png" 
        alt="Bandhayudha Logo" 
        className="w-full h-full object-contain"
        onError={(e) => {
          // Fallback ke SVG placeholder jika JPG tidak ditemukan
          const target = e.target as HTMLImageElement;
          target.src = "/src/assets/images/logo-placeholder.jpg";
          target.onerror = () => {
            // Fallback terakhir jika semua gagal
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `<div class="w-full h-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold" style="font-size: ${size * 0.4}px">B</div>`;
            }
          };
        }}
      />
    </div>
  );
};