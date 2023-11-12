import { ChartType } from "@prisma/client";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const widgetRouters = createTRPCRouter({
    getAll: publicProcedure.query(async ({ctx})=>{
        return ctx.db.widget.findMany({include:{data:true}})
    }),
    create: publicProcedure.mutation(async ({ctx})=>{
        return ctx.db.widget.create({
            data: {
                name: "Test chart",
                data:{create:[{name: "Copper", value: "2000"}, {name: "Iron", value: "3000"}]} ,
                chartType: ChartType.LINE,
            },
            include:{data:true}
        })
    })

})
