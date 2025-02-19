
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
    className: "font-thingiverse text-[#248BFB] font-bold"
  },
  { 
    id: "cults3d", 
    name: "Cults3D",
    className: "font-cults text-[#822ef5] font-semibold"
  },
];

export const FilterSection = ({
  selectedCategory,
  selectedRepos,
  onCategoryChange,
  onReposChange,
}: FilterSectionProps) => {
  // Initialize selectedRepos with all repository IDs if it's empty
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
              className={repo.className}
            >
              {repo.name}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
