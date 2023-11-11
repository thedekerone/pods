export interface SearchResult {
  kind: string;
  title: string;
  htmlTitle: string;
  link: string;
  displayLink: string;
  snippet: string;
  htmlSnippet: string;
  formattedUrl: string;
  htmlFormattedUrl: string;
}

export interface Results {
    items: SearchResult[]
}


export async function searchData(query:string):Promise<Results> {
    const apiKey = process.env.GOOGLE_API_KEY; // Set in your .env.local
    const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID; // Set in your .env.local

    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${query}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("failed to retrieve");
    }

    return response.json() as Promise<Results>;
}
