
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
  const response = await fetch('/get_models', {  // Removed /api prefix
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

  return response.json();
};
