
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Globe } from "lucide-react";

export const Header = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Modelarium
        </Link>
        <div className="flex gap-4">
          <Link to="/about">
            <Button variant="ghost">
              {t('header.aboutUs')}
            </Button>
          </Link>
          <Button 
            variant="outline" 
            onClick={toggleLanguage}
            className="flex items-center gap-2"
          >
            <Globe className="w-4 h-4" />
            {t('header.language')}
          </Button>
        </div>
      </div>
    </header>
  );
};
