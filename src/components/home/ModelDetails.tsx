
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, Heart, MessageSquare, BookmarkCheck, Calendar } from "lucide-react";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { createSlug } from "@/lib/utils";

interface Tag {
  absolute_url?: string;
  count?: number;
  name: string;
  tag?: string;
  things_url?: string;
  url?: string;
}

interface Model {
  id: number;
  name: string;
  thumbnail: string;
  public_url: string;
  creator_name: string;
  creator_url: string;
  f_added: string;
  like_count: number;
  collect_count: number;
  comment_count: number;
  is_nsfw: boolean;
  tags: Tag[];
  creator_thumbnail: string;
  price: string;
  description: string;
  repo: string;
}

interface ModelDetailsProps {
  model: Model | null;
  onClose: () => void;
}

export const ModelDetails = ({ model, onClose }: ModelDetailsProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!model) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "3DModel",
    "name": model.name,
    "description": model.description,
    "image": model.thumbnail,
    "creator": {
      "@type": "Person",
      "name": model.creator_name,
      "url": model.creator_url
    },
    "dateCreated": model.f_added,
    "url": model.public_url,
    "category": model.tags?.map(tag => typeof tag === 'string' ? tag : tag.name).join(", "),
    "fileFormat": "3D",
    "identifier": model.id,
    "offers": {
      "@type": "Offer",
      "price": model.price === "free" ? "0" : model.price.replace(/[^0-9.]/g, ''),
      "priceCurrency": model.price === "free" ? "USD" : model.price.substring(0, 1) === "$" ? "USD" : "EUR"
    }
  };

  return (
    <Dialog open={!!model} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <div className="space-y-6">
          <script type="application/ld+json">
            {JSON.stringify(jsonLd)}
          </script>
          <DialogTitle>
            <VisuallyHidden>{model.name} Details</VisuallyHidden>
          </DialogTitle>
          <div className="aspect-video overflow-hidden rounded-lg">
            <img
              src={model.thumbnail}
              alt={model.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <h2 className="text-3xl font-bold">{model.name}</h2>
              {model.price !== "free" && (
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {model.price}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <a 
                href={model.creator_url}
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                By {model.creator_name}
              </a>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(model.f_added)}
              </span>
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                {model.like_count} likes
              </span>
              <span className="flex items-center gap-1">
                <BookmarkCheck className="w-4 h-4" />
                {model.collect_count} collections
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                {model.comment_count} comments
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-400">
              {model.description}
            </p>

            {model.tags && model.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {model.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-gray-100 dark:bg-gray-800"
                  >
                    {typeof tag === 'string' ? tag : tag.name}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex justify-center pt-6">
              <a
                href={model.public_url}
                className="inline-flex items-center gap-2 px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
              >
                <Download className="w-5 h-5" />
                Download Model
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
