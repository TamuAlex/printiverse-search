
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Filter, Database } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface FilterSectionProps {
  selectedCategory: string;
  selectedRepos: string[];
  onCategoryChange: (category: string) => void;
  onReposChange: (repos: string[]) => void;
  sortBy?: string;
  onSortChange?: (sort: string) => void;
  nsfwEnabled?: boolean;
  onNsfwChange?: (enabled: boolean) => void;
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

const sortOptions = [
  { value: "likes", label: "Most Liked" },
  { value: "downloads", label: "Most Downloaded" },
  { value: "date", label: "Most Recent" },
];

export const FilterSection = ({
  selectedCategory,
  selectedRepos,
  onCategoryChange,
  onReposChange,
  sortBy = "date",
  onSortChange = () => {},
  nsfwEnabled = false,
  onNsfwChange = () => {},
}: FilterSectionProps) => {
  return (
    <div className="flex flex-col space-y-4">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64" align="start">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Sort By</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={sortBy} onValueChange={onSortChange}>
              {sortOptions.map((option) => (
                <DropdownMenuRadioItem key={option.value} value={option.value}>
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuLabel>Categories</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={selectedCategory} onValueChange={onCategoryChange}>
              {categories.map((category) => (
                <DropdownMenuRadioItem key={category} value={category}>
                  {category}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuLabel>Repositories</DropdownMenuLabel>
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
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <div className="px-2 py-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="nsfw-mode"
                  checked={nsfwEnabled}
                  onCheckedChange={onNsfwChange}
                />
                <Label htmlFor="nsfw-mode">Show NSFW Content</Label>
              </div>
            </div>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
