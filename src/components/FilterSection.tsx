
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
  { id: "All", icon: "🏠", label: "All Categories" },
  { id: "Toys", icon: "🎮", label: "Toys & Games" },
  { id: "Home Decor", icon: "🏡", label: "Home Decor" },
  { id: "Gadgets", icon: "📱", label: "Gadgets" },
  { id: "Art", icon: "🎨", label: "Art & Sculptures" },
  { id: "Tools", icon: "🔧", label: "Tools" },
  { id: "Mechanical", icon: "⚙️", label: "Mechanical Parts" },
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
  { value: "likes", label: "Most Liked", icon: "👍" },
  { value: "downloads", label: "Most Downloaded", icon: "⬇️" },
  { value: "date", label: "Most Recent", icon: "🕒" },
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
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-14 px-4 text-lg rounded-2xl flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
          {(selectedCategory !== "All" || selectedRepos.length > 0 || sortBy !== "date" || nsfwEnabled) && (
            <Badge variant="secondary" className="ml-2">Active</Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[800px] p-4" align="start">
        <div className="grid grid-cols-4 gap-4 divide-x divide-border">
          {/* Sort By Section */}
          <div className="space-y-2">
            <DropdownMenuLabel className="text-lg font-semibold">Sort By</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={sortBy} onValueChange={onSortChange}>
              <div className="space-y-1">
                {sortOptions.map((option) => (
                  <DropdownMenuRadioItem 
                    key={option.value} 
                    value={option.value}
                    className="flex items-center gap-2 py-2"
                  >
                    <span>{option.icon}</span>
                    {option.label}
                  </DropdownMenuRadioItem>
                ))}
              </div>
            </DropdownMenuRadioGroup>
          </div>

          {/* Categories Section */}
          <div className="space-y-2 col-span-2 pl-4">
            <DropdownMenuLabel className="text-lg font-semibold">Categories</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={selectedCategory} onValueChange={onCategoryChange}>
              <div className="grid grid-cols-2 gap-1">
                {categories.map((category) => (
                  <DropdownMenuRadioItem 
                    key={category.id} 
                    value={category.id}
                    className="flex items-center gap-2 py-2"
                  >
                    <span>{category.icon}</span>
                    {category.label}
                  </DropdownMenuRadioItem>
                ))}
              </div>
            </DropdownMenuRadioGroup>
          </div>

          {/* Repositories and NSFW Section */}
          <div className="space-y-4 pl-4">
            <div className="space-y-2">
              <DropdownMenuLabel className="text-lg font-semibold">Repositories</DropdownMenuLabel>
              <div className="space-y-1">
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
                    className="flex items-center gap-2 py-2"
                  >
                    {repo.icon}
                    {repo.name}
                  </DropdownMenuCheckboxItem>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <Label htmlFor="nsfw-mode" className="font-semibold">Show NSFW Content</Label>
                <Switch
                  id="nsfw-mode"
                  checked={nsfwEnabled}
                  onCheckedChange={onNsfwChange}
                />
              </div>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
