import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Check, Database } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FilterSectionProps {
  selectedCategory: string;
  selectedRepos: string[];
  onCategoryChange: (category: string) => void;
  onReposChange: (repos: string[]) => void;
}

const categories = [
  "All",
  "Toys",
  "Home Decor",
  "Gadgets",
  "Art",
  "Tools",
  "Mechanical",
];

const repositories = [
  { 
    id: "thingiverse", 
    name: "Thingiverse",
    icon: (
      <svg 
        viewBox="0 0 24 24" 
        className="w-4 h-4 inline-block mr-2 text-[#248BFB]" 
        fill="currentColor"
      >
        <path d="M11.955.005C5.425-.137 0 5.236 0 11.779c0 6.542 5.375 11.914 11.955 11.914S23.91 18.321 23.91 11.779C23.91 5.236 18.485-.137 11.955.005zm4.399 5.879a.928.928 0 0 1 .923.923.928.928 0 0 1-.923.923.928.928 0 0 1-.923-.923.928.928 0 0 1 .923-.923zm-4.399.225c3.167 0 5.67 2.503 5.67 5.67s-2.503 5.67-5.67 5.67-5.67-2.503-5.67-5.67 2.503-5.67 5.67-5.67zm0 2.228c-1.9 0-3.442 1.542-3.442 3.442s1.542 3.442 3.442 3.442 3.442-1.542 3.442-3.442-1.542-3.442-3.442-3.442z"/>
      </svg>
    ),
  },
  { 
    id: "cults3d", 
    name: "Cults3D",
    icon: (
      <svg 
        viewBox="0 0 24 24" 
        className="w-4 h-4 inline-block mr-2 text-[#822ef5]" 
        fill="currentColor"
      >
        <path d="M12 0C5.375 0 0 5.375 0 12s5.375 12 12 12 12-5.375 12-12S18.625 0 12 0zm.023 4.125c4.35 0 7.875 3.525 7.875 7.875s-3.525 7.875-7.875 7.875S4.148 16.35 4.148 12s3.525-7.875 7.875-7.875zm0 3.375c-2.475 0-4.5 2.025-4.5 4.5s2.025 4.5 4.5 4.5 4.5-2.025 4.5-4.5-2.025-4.5-4.5-4.5z"/>
      </svg>
    ),
  },
];

export const FilterSection = ({
  selectedCategory,
  selectedRepos,
  onCategoryChange,
  onReposChange,
}: FilterSectionProps) => {
  useEffect(() => {
    if (selectedRepos.length === 0) {
      onReposChange(repositories.map(repo => repo.id));
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center items-center py-6">
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "secondary"}
            className={`px-4 py-2 cursor-pointer transition-all duration-200 ${
              selectedCategory === category
                ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Repositories ({selectedRepos.length})
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          {repositories.map((repo) => (
            <DropdownMenuCheckboxItem
              key={repo.id}
              checked={selectedRepos.includes(repo.id)}
              onCheckedChange={(checked) => {
                if (checked) {
                  onReposChange([...selectedRepos, repo.id]);
                } else {
                  onReposChange(selectedRepos.filter((r) => r !== repo.id));
                }
              }}
              className="text-gray-900 dark:text-gray-100 font-medium"
            >
              {repo.icon}
              {repo.name}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
