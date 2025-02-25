// Primero, agregamos la definición de tipos para gtag
declare global {
    interface Window {
      gtag: (
        command: 'consent' | 'config' | 'event' | 'js' | 'set',
        // Para 'consent':
        consentType: 'update' | 'default',
        // Para config y otros comandos:
        config?: string | {
          [key: string]: any;
        }
      ) => void;
    }
  }
  
  import { useState, useEffect } from 'react';
  import { Alert, AlertDescription } from '@/components/ui/alert';
  import { Button } from '@/components/ui/button';
  
  interface CookieSettings {
    analytics: boolean;
    necessary: boolean;
  }
  
  export const CookieConsent = () => {
    const [showBanner, setShowBanner] = useState(false);
    const [showPreferences, setShowPreferences] = useState(false);
    const [settings, setSettings] = useState<CookieSettings>({
      analytics: false,
      necessary: true, // Siempre true ya que son esenciales
    });
  
    useEffect(() => {
      // Comprobar si ya existe el consentimiento
      const consent = localStorage.getItem('cookieConsent');
      if (!consent) {
        setShowBanner(true);
      }
    }, []);
  
    const updateAnalyticsConsent = (granted: boolean) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('consent', 'update', {
          'analytics_storage': granted ? 'granted' : 'denied'
        });
      }
    };
  
    const handleAcceptAll = () => {
      setSettings({ analytics: true, necessary: true });
      localStorage.setItem('cookieConsent', JSON.stringify({ analytics: true, necessary: true }));
      setShowBanner(false);
      updateAnalyticsConsent(true);
    };
  
    const handleSavePreferences = () => {
      localStorage.setItem('cookieConsent', JSON.stringify(settings));
      setShowBanner(false);
      updateAnalyticsConsent(settings.analytics);
    };
  
    if (!showBanner) return null;
  
    return (
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50">
        <div className="container mx-auto max-w-4xl">
          <Alert>
            <AlertDescription className="text-sm text-gray-600 dark:text-gray-300">
              Utilizamos cookies propias y de terceros para mejorar nuestros servicios y mostrarle publicidad relacionada con sus preferencias. Si continúa navegando, consideramos que acepta su uso.
            </AlertDescription>
          </Alert>
          
          {showPreferences ? (
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings.necessary}
                    disabled
                    className="form-checkbox"
                  />
                  <span>Cookies Necesarias</span>
                </label>
                <span className="text-sm text-gray-500">Siempre activas</span>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings.analytics}
                    onChange={(e) => setSettings({...settings, analytics: e.target.checked})}
                    className="form-checkbox"
                  />
                  <span>Cookies Analíticas</span>
                </label>
              </div>
  
              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => setShowPreferences(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSavePreferences}>
                  Guardar Preferencias
                </Button>
              </div>
            </div>
          ) : (
            <div className="mt-4 flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setShowPreferences(true)}>
                Configurar
              </Button>
              <Button onClick={handleAcceptAll}>
                Aceptar Todas
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };