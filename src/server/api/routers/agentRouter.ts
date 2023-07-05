import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { prisma } from "../../db";
import { messageParser } from "../../../types/agentTypes";

const saveAgentParser = z.object({
  name: z.string(),
  goal: z.string(),
  tasks: z.array(messageParser),
});

export const agentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(saveAgentParser)
    .mutation(async ({ input, ctx }) => {
      const agent = await prisma.agent.create({
        data: {
          name: input.name,
          goal: input.goal,
          userId: ctx.session?.user?.id,
        },
      });

      const all = input.tasks.map((e, i) => {
        return prisma.agentTask.create({
          data: {
            agentId: agent.id,
            type: e.type,
            info: e.info,
            value: e.value,
            sort: i,
          },
        });
      });

      await Promise.all(all);
      return agent;
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return prisma.agent.findMany({
      where: {
        userId: ctx.session?.user?.id,
        delet