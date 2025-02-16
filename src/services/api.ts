
interface ModelResponse {
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
  tags: string[];
  creator_thumbnail: string;
  price: string;
  description: string;
}

export const fetchModels = async (searchQuery: string, filters: Record<string, any>): Promise<ModelResponse[]> => {
  const response = await fetch('http://localhost:5000/get_models', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: searchQuery,
      filters: filters,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch models: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  // Convert the Python response to match our TypeScript interface
  return data.map((model: any) => ({
    id: model.id,
    name: model.name,
    thumbnail: model.thumbnail,
    public_url: model.public_url,
    creator_name: model.creator_name,
    creator_url: model.creator_url,
    f_added: model.f_added,
    like_count: model.like_count,
    collect_count: model.collect_count,
    comment_count: model.comment_count,
    is_nsfw: model.is_nsfw,
    tags: model.tags || [],
    creator_thumbnail: model.creator_thumbnail,
    price: model.price || "free",
    description: model.description || "",
  }));
};
