export interface ProductData {
  name: string;
  imgLink: string;
  price: string;
  sizes: string;
  type: string;
  newItem: string;
  collection: string;
  backImages: string;
}

export interface ApiResponse {
  data: ProductData[];
}

export const fetchCatalogData = async (): Promise<ProductData[]> => {
  try {
    const response = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhtp8wjjL5cqlRUQMhu49VvZdaWrypmAvv2bSlv0n_AzYxx0hPN1eN_zENPvtlGfqO2j9o_yWTU5owMMKBAYUCmaK_0Ykx9daTKLPRtiYNJJnZOE5UCPZC4swKlYBZfhWXV_5Sm4jnXMvTOyULZyWMtMbaQ7OqW4h-2pd16YhHf_mmmejbXO0xicLFaBwoh2UIjPmxDee26BPbZHyFvxIJrwQF0bkcfnu1NJlqT09970KntPatF2nKywJU-A5sJUvq-L-zymQiqi4WXR7yZylcufBIc0Sq0yvbGB70C&lib=Mw2XXmvRGu-in3pnh3uSbnmONnX9Sat_b');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: ApiResponse = await response.json();
    
    // Filter out the header row
    return data.data.filter(item => item.name !== 'Название');
  } catch (error) {
    console.error('Error fetching catalog data:', error);
    throw error;
  }
};

export const parseSizes = (sizesString: string): Record<string, number> => {
  try {
    // Remove any extra whitespace and parse the JSON-like string
    const cleanString = sizesString.trim();
    return JSON.parse(cleanString);
  } catch (error) {
    console.error('Error parsing sizes:', error);
    return {};
  }
};

export const parseBackImages = (backImagesString: string): string[] => {
  try {
    // Remove any extra whitespace and parse the JSON array
    const cleanString = backImagesString.trim();
    return JSON.parse(cleanString);
  } catch (error) {
    console.error('Error parsing back images:', error);
    return [];
  }
};

export const transformProductData = (product: ProductData) => {
  return {
    id: `product-${product.name.toLowerCase().replace(/\s+/g, '-')}`,
    name: product.name,
    price: parseInt(product.price),
    description: `Beautiful ${product.type} from our collection`,
    imageUrl: product.imgLink,
    category: product.type, // This will be 'ring' from your data
    sizes: parseSizes(product.sizes),
    isNew: product.newItem === 'TRUE',
    collection: product.collection !== 'FALSE' ? product.collection : null,
    backImages: parseBackImages(product.backImages)
  };
};