import React, { useEffect, useState } from 'react';

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      const isMobile = window.matchMedia('(max-width: 640px)').matches;
      setShow(isMobile);
    };

    window.addEventListener('beforeinstallprompt', handler as EventListener);
    return () => window.removeEventListener('beforeinstallprompt', handler as EventListener);
  }, []);

  useEffect(() => {
    const onInstalled = () => setShow(false);
    window.addEventListener('appinstalled', onInstalled);
    return () => window.removeEventListener('appinstalled', onInstalled);
  }, []);

  if (!show || !deferredPrompt) return null;

  const onInstallClick = async () => {
    try {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      console.log('PWA install choice', choice);
    } catch (err) {
      console.warn('Install prompt failed', err);
    } finally {
      setDeferredPrompt(null);
      setShow(false);
    }
  };

  return (
    <button
      onClick={onInstallClick}
      aria-label="Instalar app"
      className="fixed bottom-6 right-4 bg-[#ef4444] text-white px-4 py-2 rounded-full shadow-lg z-50"
    >
      Instalar app
    </button>
  );
}
