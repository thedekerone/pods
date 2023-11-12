import { type ChartType } from "@prisma/client";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const widgetRouters = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.widget.findMany({ include: { data: true, sources:true } });
  }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        chartType: z.string(),
        sources: z.array(z.string()).optional()
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.widget.create({
        data: {
          name: input.name,
          description: input.description,
          chartType: input.chartType as ChartType,
          sources: {createMany:{
            data: input.sources?.map(source=>({name:source, url:source})) ?? []
          }}
        },
        include: { data: true, sources:true },
      });
    }),
});
