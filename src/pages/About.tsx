
import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <SEO 
        title={t('aboutUs.title')}
        description={t('aboutUs.description')}
        image="/og-image.png"
      />
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h1 className="text-4xl font-bold">{t('aboutUs.title')}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('aboutUs.description')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
