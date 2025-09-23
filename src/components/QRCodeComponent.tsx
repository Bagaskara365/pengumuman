import React from 'react';
import { MessageSquare } from 'lucide-react';

interface QRCodeComponentProps {
  value: string;
  size?: number;
  className?: string;
}

export const QRCodeComponent = ({ value, size = 200, className = "" }: QRCodeComponentProps) => {
  // Simple QR code pattern using CSS (fallback)
  const QRPattern = () => (
    <div className="relative w-full h-full bg-white rounded-lg overflow-hidden">
      {/* QR Code pattern simulation with CSS */}
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-px p-2">
        {Array.from({ length: 64 }, (_, i) => (
          <div
            key={i}
            className={`
              ${Math.random() > 0.4 ? 'bg-black' : 'bg-white'}
              ${i < 8 || i >= 56 || i % 8 === 0 || i % 8 === 7 ? 'bg-black' : ''}
              ${(i >= 8 && i < 16) || (i >= 48 && i < 56) ? 
                (i % 8 >= 1 && i % 8 <= 6 ? 'bg-white' : 'bg-black') : ''}
            `}
          />
        ))}
      </div>
      
      {/* Corner markers */}
      <div className="absolute top-2 left-2 w-6 h-6 border-2 border-black">
        <div className="w-full h-full border border-black m-0.5">
          <div className="w-full h-full bg-black m-0.5"></div>
        </div>
      </div>
      <div className="absolute top-2 right-2 w-6 h-6 border-2 border-black">
        <div className="w-full h-full border border-black m-0.5">
          <div className="w-full h-full bg-black m-0.5"></div>
        </div>
      </div>
      <div className="absolute bottom-2 left-2 w-6 h-6 border-2 border-black">
        <div className="w-full h-full border border-black m-0.5">
          <div className="w-full h-full bg-black m-0.5"></div>
        </div>
      </div>
      
      {/* Center icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white p-2 rounded-full border-2 border-black">
          <MessageSquare className="w-4 h-4 text-black" />
        </div>
      </div>
    </div>
  );

  return (
    <div 
      className={`relative bg-white p-2 rounded-lg shadow-lg border-2 border-gray-300 ${className}`}
      style={{ width: size, height: size }}
    >
      <img 
        src="/src/assets/qr/whatsapp-group.png"
        alt="QR Code WhatsApp Group Bandhayudha"
        className="w-full h-full object-contain rounded"
        onError={(e) => {
          // Fallback to CSS pattern if image not found
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent && !parent.querySelector('.qr-fallback')) {
            const fallback = document.createElement('div');
            fallback.className = 'qr-fallback w-full h-full';
            parent.appendChild(fallback);
            // Use React to render the QR pattern fallback
            const reactRoot = (fallback as any).__reactInternalFiber || fallback;
            if (reactRoot) {
              // Fallback to inline pattern
              fallback.innerHTML = `
                <div class="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center text-gray-600 text-sm text-center">
                  QR Code<br/>untuk<br/>WhatsApp Group<br/>Bandhayudha
                </div>
              `;
            }
          }
        }}
        onLoad={() => {
          // Hide any existing fallback when image loads successfully
          const parent = (document.querySelector(`[style*="width: ${size}px"]`) as HTMLElement)?.parentElement;
          const fallback = parent?.querySelector('.qr-fallback') as HTMLElement;
          if (fallback) {
            fallback.style.display = 'none';
          }
        }}
      />
    </div>
  );
};