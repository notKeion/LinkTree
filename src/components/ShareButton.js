'use client';
import { useState, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes, faDownload, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useQRCode } from 'next-qrcode'; // Import directly to ensure we control the render
import { toPng } from 'html-to-image';
import Image from 'next/image';

export default function ShareModal({ url, pageName, userImage }) {
  const [isOpen, setIsOpen] = useState(false);
  const { Canvas } = useQRCode(); // Use the Canvas hook directly
  const qrRef = useRef(null);

const downloadAsImage = async () => {
    if (qrRef.current === null) return;

    try {
        // 1. Give the browser a moment to ensure all sub-elements are rendered
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const dataUrl = await toPng(qrRef.current, { 
            cacheBust: true,
            includeQueryParams: true, // Crucial for Next.js static/optimized assets
            pixelRatio: 2,           // Keeps it sharp
            includeCanvas: true,         // Ensure the canvas is included
            backgroundColor: '#020617', 
        });

        const link = document.createElement('a');
        link.download = `${pageName}-share.png`;
        link.href = dataUrl;
        link.click();
    } catch (err) {
        console.error('Download failed', err);
    }
};



  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-full bg-slate-900/70 text-slate-100 p-2.5 flex items-center justify-center border border-slate-700/80 hover:bg-slate-800 hover:border-indigo-400/80 transition-all"
      >
        <FontAwesomeIcon className="w-5 h-5" icon={faShareNodes} />
      </button>

      {isOpen && (
        <div  className="fixed inset-0 z-50 flex flex-col gap-10 items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                        <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white"
            >
              <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
            </button>
          <div ref={qrRef} className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-sm w-full flex flex-col items-center gap-6 relative shadow-2xl">
            

            
            <h2 className="text-xl font-semibold text-slate-100 mb-4">{pageName}</h2>

            
            {/* We use the Canvas component directly here to ensure it's a Canvas element */}
            <div className="relative bg-white p-8 rounded-2xl shadow-inner">
                {userImage &&
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square w-20 h-20  overflow-hidden rounded-full border-4 border-slate-800 z-10">
                    <Image
                    className="w-full h-full object-cover"
                    src={userImage}
                    alt="avatar-mini"
                    width={128}
                    height={128}
                    priority
                    />
                </div>}
              <Canvas
                text={url}
                options={{
                  level: 'M',
                  margin: 2,
                  scale: 4,
                  width: 200,
                  color: {
                    dark: '#000000',
                    light: '#FFFFFF',
                  },
                }}
              />
              <span className='absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black text-sm'>{url.replace('https://', '').replace('http://','')}</span>
            </div>
          </div>

            <button
              onClick={downloadAsImage}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-3 rounded-xl transition-all active:scale-95"
            >
              <FontAwesomeIcon icon={faDownload} />
              Download QR Code
            </button>
        </div>
      )}
    </>
  );
}

