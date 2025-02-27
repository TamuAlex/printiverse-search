
import { useTranslation } from "react-i18next";

export const LoadingState = () => {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-24 h-24 mb-4">
        <img 
          src="/lovable-uploads/15fb54d3-75bb-4f90-b169-1531a3c2ab1f.png" 
          alt="Loading"
          className="w-full h-full"
          style={{ 
            animation: 'spin 1.5s linear infinite',
            transformStyle: 'preserve-3d'
          }}
        />
      </div>
      <p className="text-gray-600 dark:text-gray-400">{t('home.loading')}</p>
    </div>
  );
};
