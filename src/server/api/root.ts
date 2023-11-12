import { createTRPCRouter } from "~/server/api/trpc";
import { widgetRouters } from "./routers/widgets";
import { predictionRouter } from "./routers/ai";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  widget:widgetRouters,
  ai: predictionRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
