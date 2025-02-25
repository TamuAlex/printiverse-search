
import { useTranslation } from "react-i18next";

export const LoadingState = () => {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-24 h-24 mb-4">
        <img 
          src="/lovable-uploads/116a98bf-aa41-4f4d-a935-499572a71573.png" 
          alt="Loading"
          className="w-full h-full animate-spin"
          style={{ 
            animation: 'spin 2s linear infinite',
            transformStyle: 'preserve-3d'
          }}
        />
      </div>
      <p className="text-gray-600 dark:text-gray-400">{t('home.loading')}</p>
    </div>
  );
};
