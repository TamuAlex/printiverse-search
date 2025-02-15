
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, Heart, BookmarkCheck } from "lucide-react";

interface ModelCardProps {
  title: string;
  description: string;
  imageUrl: string;
  fileFormats: string[];
  downloadUrl: string;
  viewUrl: string;
  likeCount?: number;
  collectCount?: number;
  onClick?: () => void;
}

export const ModelCard = ({
  title,
  description,
  imageUrl,
  fileFormats,
  downloadUrl,
  viewUrl,
  likeCount,
  collectCount,
  onClick,
}: ModelCardProps) => {
  return (
    <Card 
      className="overflow-hidden group transition-all duration-300 hover:shadow-xl bg-white/80 dark:bg-black/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-lg leading-tight line-clamp-1">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-2">
          {fileFormats.map((format) => (
            <Badge
              key={format}
              variant="secondary"
              className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {format}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center pt-2">
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
    </Card>
  );
};
