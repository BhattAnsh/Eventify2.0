'use client';

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface QRDownloadProps {
  qrRef: React.RefObject<SVGSVGElement>;
  eventTitle: string;
}

export const QRDownload = ({ qrRef, eventTitle }: QRDownloadProps) => {
  const downloadQR = () => {
    if (!qrRef.current) return;

    const svg = qrRef.current;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      
      const downloadLink = document.createElement("a");
      downloadLink.download = `${eventTitle}-QR.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <Button onClick={downloadQR} variant="outline" className="w-full mt-4">
      <Download className="w-4 h-4 mr-2" />
      Download QR Code
    </Button>
  );
}; 