import React from "react";
import { type Results, searchData } from "~/lib/search";

const SearchPage = async () => {
    const results:Results = await getData();
    console.log(results)
    return (
        <div>
            <h1>Google Search Results</h1>
            <ul>
                {results?.items?.map((item) => (
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

async function getData() {
    return searchData("how does otokompu uses scrap?")
}

export default SearchPage;
