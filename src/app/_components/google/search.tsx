import axios from "axios";
import React from "react";

const SearchPage = ({ results }) => {
    return (
        <div>
            <h1>Google Search Results</h1>
            <ul>
                {results.items.map((item) => (
                    <li key={item.link}>
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                            {item.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export async function getServerSideProps(context) {
    const query = "your search query"; // Replace with your query
    const apiKey = process.env.GOOGLE_API_KEY; // Set in your .env.local
    const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID; // Set in your .env.local

    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${query}`;

    let results = { items: [] };
    try {
        const response = await axios.get(url);
        results = response.data;
    } catch (error) {
        console.error("Search API error:", error);
    }

    return { props: { results } };
}

export default SearchPage;
