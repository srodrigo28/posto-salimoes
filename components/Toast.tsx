import React, { useEffect } from 'react';

type ToastProps = {
  message: string;
  onClose?: () => void;
  duration?: number;
};

const Toast: React.FC<ToastProps> = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const t = setTimeout(() => onClose && onClose(), duration);
    return () => clearTimeout(t);
  }, [duration, onClose]);

  return (
    <div className="fixed left-1/2 transform -translate-x-1/2 bottom-8 z-50">
      <div className="bg-black/80 text-white px-4 py-2 rounded-full shadow-lg">
        {message}
      </div>
    </div>
  );
};

export default Toast;
