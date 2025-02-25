
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
      <img 
        src="https://cdn.thingiverse.com/site/assets/images/favicons/favicon-32x32.png" 
        alt="Thingiverse"
        className="w-4 h-4 inline-block mr-2"
      />
    ),
  },
  { 
    id: "cults3d", 
    name: "Cults3D",
    icon: (
      <img 
        src="https://cults3d.com/favicon.ico"
        alt="Cults3D"
        className="w-4 h-4 inline-block mr-2"
      />
    ),
  },
  { 
    id: "myminifactory", 
    name: "MyMiniFactory",
    icon: (
      <img 
        src="https://www.myminifactory.com/favicon.ico"
        alt="MyMiniFactory"
        className="w-4 h-4 inline-block mr-2"
      />
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
