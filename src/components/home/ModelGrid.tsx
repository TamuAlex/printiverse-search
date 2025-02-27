
import { ModelCard } from "@/components/ModelCard";

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
  tags: Array<{ name: string }>;
  creator_thumbnail: string;
  price: string;
  description: string;
  repo: string;
}

interface ModelGridProps {
  models: Model[];
  onModelClick: (model: Model) => void;
}

export const ModelGrid = ({ models, onModelClick }: ModelGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 animate-fade-in-up">
      {models.map((model) => (
        <ModelCard 
          key={model.id}
          title={model.name}
          description={model.description}
          imageUrl={model.thumbnail}
          fileFormats={[]}
          downloadUrl={model.public_url}
          viewUrl={model.public_url}
          likeCount={model.like_count}
          collectCount={model.collect_count}
          repo={model.repo}
          onClick={() => onModelClick(model)}
          tags={model.tags}
        />
      ))}
    </div>
  );
};
