
import { useTranslation } from "react-i18next";
import { SearchInput } from "@/components/SearchInput";

interface HeroSectionProps {
  onSearch: (query: string) => void;
  selectedCategory: string;
  selectedRepos: string[];
  onCategoryChange: (category: string) => void;
  onReposChange: (repos: string[]) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  nsfwEnabled: boolean;
  onNsfwChange: (enabled: boolean) => void;
}

export const HeroSection = ({
  onSearch,
  selectedCategory,
  selectedRepos,
  onCategoryChange,
  onReposChange,
  sortBy,
  onSortChange,
  nsfwEnabled,
  onNsfwChange,
}: HeroSectionProps) => {
  const { t } = useTranslation();

  return (
    <div className="text-center space-y-6 animate-fade-in">
      <img 
        src="/lovable-uploads/0d84b7f9-8624-4a6c-ac49-a9e8b0d0d904.png" 
        alt="Modelarium Logo" 
        className="h-24 mx-auto mb-8"
      />
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        {t('home.title')}
      </p>
      <SearchInput 
        onSearch={onSearch}
        selectedCategory={selectedCategory}
        selectedRepos={selectedRepos}
        onCategoryChange={onCategoryChange}
        onReposChange={onReposChange}
        sortBy={sortBy}
        onSortChange={onSortChange}
        nsfwEnabled={nsfwEnabled}
        onNsfwChange={onNsfwChange}
      />
    </div>
  );
};
