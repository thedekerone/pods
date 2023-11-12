import OpenAI from 'openai';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';
import { searchData } from '~/lib/search';

// Define the types for news entries and the summary response
interface NewsEntry {
  source: string;
  headline: string;
}



// The main function to fetch and summarize news
const newsDashboardFunction = async (
  userQuery: string,
  currentDate: string,
  newsHeadlines: NewsEntry[]
): Promise<string> => {
  // Initialize OpenAI with your API key
  const openai = new OpenAI({apiKey:process.env.OPENAI_API_KEY });

  // Generate the prompt
  let prompt = `These are the latest news headlines regarding '${userQuery}' on ${currentDate}. Give me a brief 1 paragraph summary for '${userQuery}'.\n\n`;
  newsHeadlines.forEach(entry => {
    prompt += `${entry.source}: ${entry.headline}\n`;
  });
  
  // Call OpenAI API
  try {
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{role:"assistant", "content":prompt}],
        max_tokens: 100
    });
    
    const summary = response?.choices[0]?.message.content?.trim();
    return summary ?? ""
  } catch (error) {
    console.error('Error fetching data from OpenAI:', error);
    throw error
  }
};



export const predictionRouter = createTRPCRouter({
    getNews: publicProcedure
        .input(z.object({ question: z.string() }))
        .mutation(async ({ input }) => {
            const data= await searchData("site:news.google.com " + input.question)
            console.log(data)
            const today = new Date()
            const summary = await newsDashboardFunction(input.question, today.toDateString(), data.items.map(result=>({source:result.formattedUrl, headline:result.title})))
            return {summary, sources: data.items.map(result=>(result.formattedUrl))}
          }),
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
