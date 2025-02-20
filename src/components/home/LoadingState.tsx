
import { useTranslation } from "react-i18next";

export const LoadingState = () => {
  const { t } = useTranslation();
  
  return (
    <div className="text-center py-8">
      <p className="text-gray-600 dark:text-gray-400">{t('home.loading')}</p>
    </div>
  );
};
