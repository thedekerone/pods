import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import OpenAI from "openai-api";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? "";

const openai = new OpenAI(OPENAI_API_KEY);
interface SteelPrice {
    type: string;
    price: number;
}

// Function to get steel prices
const getSteelPrices = async (): Promise<string> => {
    try {
        const prompt =
            "Provide the current prices for the following types of steel: 1. Carbon Steel, 2. Alloy Steel, 3. Stainless Steel, 4. Tool Steel.";
        const response = await openai.complete({
            engine: "davinci",
            prompt: prompt,
            maxTokens: 100,
        });

        return response?.data?.choices[0]?.text.trim() ?? "";
    } catch (error) {
        console.error("Error in fetching steel prices:", error);
        throw error;
    }
};
export const fetchAndFormatSteelPrices = async (): Promise<SteelPrice[]> => {
    const steelPriceText = await getSteelPrices();
    const steelPrices: SteelPrice[] = [];

    // Parsing the returned text and extracting the prices
    // Example text format: "1. Carbon Steel: $500 per ton, 2. Alloy Steel: $700 per ton..."
    const priceRegex = /(\w+ Steel): \$(\d+) per ton/g;
    let match: RegExpExecArray | null;

    while (true) {
        match = priceRegex.exec(steelPriceText);
        if (match === null) break;

        steelPrices.push({
            type: match[1] ?? "",
            price: parseFloat(match[2] ?? ""),
        });
    }
    return steelPrices;
};

export const predictionRouter = createTRPCRouter({
    getPrediction: publicProcedure
        .input(z.object({ question: z.string() }))
        .mutation(async ({ input }) => {
            const data = { question: input.question };

            const response = await fetch(
                "https://junction-d3rm.onrender.com/api/v1/prediction/a0c84494-b2f5-430b-a00d-940fe4686fba",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:
                            "Bearer iAX7OnuSVEDI+47yNeqAblCvGsNexNldAnN2ABiyqkk=",
                    },
                    body: JSON.stringify(data),
                },
            );
            const result: { text: string } = (await response.json()) as {
                text: string;
            };
            return result;
        }),
});
