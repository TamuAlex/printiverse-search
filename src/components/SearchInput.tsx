
import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { debounce } from "lodash";
import { FilterSection } from "./FilterSection";

interface SearchInputProps {
  onSearch: (query: string) => void;
  selectedCategory: string;
  selectedRepos: string[];
  onCategoryChange: (category: string) => void;
  onReposChange: (repos: string[]) => void;
  sortBy?: string;
  onSortChange?: (sort: string) => void;
  nsfwEnabled?: boolean;
  onNsfwChange?: (enabled: boolean) => void;
}

export const SearchInput = ({ 
  onSearch,
  selectedCategory,
  selectedRepos,
  onCategoryChange,
  onReposChange,
  sortBy,
  onSortChange,
  nsfwEnabled,
  onNsfwChange,
}: SearchInputProps) => {
  const [query, setQuery] = useState("");
  const [currentFilters, setCurrentFilters] = useState({
    category: selectedCategory,
    repos: selectedRepos,
    sort: sortBy,
    nsfw: nsfwEnabled
  });

  const handleSearch = () => {
    // Aplicar todos los filtros cuando se da click en buscar
    onCategoryChange(currentFilters.category);
    onReposChange(currentFilters.repos);
    if (onSortChange) onSortChange(currentFilters.sort || "date");
    if (onNsfwChange) onNsfwChange(currentFilters.nsfw || false);
    onSearch(query);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto space-y-4">
      <div className="flex gap-2">
        <FilterSection
          selectedCategory={currentFilters.category}
          selectedRepos={currentFilters.repos}
          onCategoryChange={(category) => setCurrentFilters(prev => ({ ...prev, category }))}
          onReposChange={(repos) => setCurrentFilters(prev => ({ ...prev, repos }))}
          sortBy={currentFilters.sort}
          onSortChange={(sort) => setCurrentFilters(prev => ({ ...prev, sort }))}
          nsfwEnabled={currentFilters.nsfw}
          onNsfwChange={(nsfw) => setCurrentFilters(prev => ({ ...prev, nsfw }))}
        />
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search for 3D models..."
            value={query}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            className="w-full pl-12 h-14 text-lg bg-white/80 dark:bg-black/80 backdrop-blur-lg border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 transition-all duration-300"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
        <Button 
          onClick={handleSearch}
          className="h-14 px-6 text-lg rounded-2xl"
        >
          Search
        </Button>
      </div>
    </div>
  );
};
