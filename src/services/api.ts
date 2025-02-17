
interface Tag {
  absolute_url?: string;
  count?: number;
  name: string;
  tag?: string;
  things_url?: string;
  url?: string;
}

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
  tags: Tag[];
  creator_thumbnail: string;
  price: string;
  description: string;
}

export const fetchModels = async (
  searchQuery: string, 
  filters: Record<string, any>,
  page: number = 1
): Promise<ModelResponse[]> => {
  try {
    console.log("Fetching models with query:", searchQuery, "page:", page);
    
    const response = await fetch('http://localhost:5000/get_models', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: searchQuery,
        filters: { ...filters, page, per_page: 20 },
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch models: ${response.status} ${response.statusText}`);
    }

    const rawData = await response.text();
    console.log("Raw response:", rawData);
    
    let data;
    try {
      data = JSON.parse(rawData);
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      throw new Error("Invalid JSON response from server");
    }
    
    console.log("Parsed data:", data);

    if (!Array.isArray(data)) {
      console.error("Data is not an array:", data);
      throw new Error('Received invalid data format from server');
    }

    const mappedModels = data.map((modelStr: any) => {
      let modelData = typeof modelStr === 'string' ? JSON.parse(modelStr) : modelStr;
      console.log("Processing model:", modelData);
      
      return {
        id: modelData.id,
        name: modelData.name,
        thumbnail: modelData.thumbnail,
        public_url: modelData.public_url,
        creator_name: modelData.creator_name,
        creator_url: modelData.creator_url,
        f_added: modelData.f_added,
        like_count: modelData.like_count,
        collect_count: modelData.collect_count,
        comment_count: modelData.comment_count,
        is_nsfw: modelData.is_nsfw,
        tags: modelData.tags || [],
        creator_thumbnail: modelData.creator_thumbnail,
        price: modelData.price || "free",
        description: modelData.description || "",
      };
    });

    console.log("Mapped models:", mappedModels);
    return mappedModels;

  } catch (error) {
    console.error('Error fetching models:', error);
    throw error;
  }
};
