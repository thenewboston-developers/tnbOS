import {FC, ReactNode, useEffect, useState} from 'react';
import QrCode from 'qrcode';

export interface QrProps {
  className?: string;
  text: string;
  width?: number;
}

const Qr: FC<QrProps> = ({className, text, width = 100}) => {
  const [qr, setQr] = useState<ReactNode | null>(null);

  useEffect(() => {
    (async () => {
      const url = await QrCode.toDataURL(text, {
        color: {
          dark: '#000000',
          light: '#0000',
        },
        margin: 0,
        width,
      });
      setQr(<img alt="QR Code" src={url} />);
    })();
  }, [className, text, width]);

  return <>{qr}</>;
};

export default Qr;
