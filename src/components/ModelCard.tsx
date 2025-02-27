
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, Heart, BookmarkCheck } from "lucide-react";
import { LazyImage } from "./LazyImage";

interface ModelCardProps {
  title: string;
  description: string;
  imageUrl: string;
  fileFormats: string[];
  downloadUrl: string;
  viewUrl: string;
  likeCount?: number;
  collectCount?: number;
  repo?: string;
  onClick?: () => void;
  tags?: Array<{ name: string }>;
}

const repoConfig = {
  Thingiverse: {
    name: "Thingiverse",
    className: "bg-[#248BFB]/10 text-[#248BFB] font-thingiverse font-bold"
  },
  Cults3d: {
    name: "Cults3D",
    className: "bg-[#822ef5]/10 text-[#822ef5] font-cults font-semibold"
  },
  MyMiniFactory: {
    name: "MyMiniFactory",
    className: "bg-[#00B0FF]/10 text-[#00B0FF] font-semibold"
  }
};

export const ModelCard = ({
  title,
  description,
  imageUrl,
  fileFormats,
  downloadUrl,
  viewUrl,
  likeCount,
  collectCount,
  repo,
  onClick,
  tags = [],
}: ModelCardProps) => {
  return (
    <Card 
      className="overflow-hidden group transition-all duration-300 hover:shadow-xl bg-white/80 dark:bg-black/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden">
        <LazyImage
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-lg leading-tight line-clamp-1">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags && tags.length > 0 && tags.map((tag, index) => (
            <Badge
              key={`${tag.name}-${index}`}
              variant="secondary"
              className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {tag.name}
            </Badge>
          ))}
        </div>
        <div className="space-y-3">
          {repo && repoConfig[repo as keyof typeof repoConfig] && (
            <Badge variant="secondary" className={repoConfig[repo as keyof typeof repoConfig].className}>
              {repoConfig[repo as keyof typeof repoConfig].name}
            </Badge>
          )}
          <div className="flex justify-between items-center">
            <div className="flex gap-3 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                {likeCount || 0}
              </span>
              <span className="flex items-center gap-1">
                <BookmarkCheck className="w-4 h-4" />
                {collectCount || 0}
              </span>
            </div>
            <a
              href={downloadUrl}
              className="inline-flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Download className="w-4 h-4" />
              Download
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
};
