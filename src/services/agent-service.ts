
import {
  createModel,
  startGoalPrompt,
  executeTaskPrompt,
  createTasksPrompt,
  snowflakeSQLPrompt,
  snowflakeCachePrompt,
  snowflakeCacheTuningPrompt,
  snowflakeSQLTunePrompt0,
  snowflakeSQLTunePrompt1,
  cachedTables,
} from "../utils/prompts";
import type { ModelSettings } from "../utils/types";
import { env } from "../env/client.mjs";
import { LLMChain } from "langchain/chains";
import { extractTasks } from "../utils/helpers";
import SchemaService from "../utils/schemas";


async function sqlQueryAgent(modelSettings: ModelSettings, sql: string, oldsql?: string, errmsg?: string, opstat?: string) {
  // TODO: cachedTables is hard-code, SchemaService is dynamic but not cached
  const cache = cachedTables ?? JSON.stringify(await SchemaService.getInstance().getSchema());

  var completion;
  if (oldsql && errmsg) {
    completion = await new LLMChain({
      llm: createModel(modelSettings),
      prompt: snowflakeCacheTuningPrompt,
    }).call({
      sql,
      cache,
      oldsql,
      errmsg,
      opstat,
    });
    console.log("sqlQueryAgent: finished fine-tuning");
  }
  else {
    completion = await new LLMChain({
      llm: createModel(modelSettings),
      prompt: snowflakeCachePrompt,
    }).call({
      sql,
      cache,
    });
  }

  console.log("sqlQueryAgent:", completion);
  return completion.text as string;
}

async function sqlTuneAgent(modelSettings: ModelSettings, goal: string, pres?: string) {
  // TODO: cachedTables is hard-code, SchemaService is dynamic but not cached
  const cata = cachedTables ?? JSON.stringify(await SchemaService.getInstance().getSchema());

  var completion;
  if (pres) {
    completion = await new LLMChain({
      llm: createModel(modelSettings),
      prompt: snowflakeSQLTunePrompt1,
    }).call({
      goal,
      cata,
      pres,
    });
    console.log("sqlTuneAgent: got fine-tuned SQL");
  }
  else {
    completion = await new LLMChain({
      llm: createModel(modelSettings),
      prompt: snowflakeSQLTunePrompt0,
    }).call({
      goal,
      cata,
    });
  }

  console.log("sqlTuneAgent: ", completion);
  return JSON.parse(completion.text as string);
}

async function startGoalAgent(modelSettings: ModelSettings, goal: string) {
  const completion = await new LLMChain({
    llm: createModel(modelSettings),
    prompt: startGoalPrompt,
  }).call({
    goal,
  });
  console.log("StartCompleted:" + (completion.text as string));
  return extractTasks(completion.text as string, []);
}

async function executeTaskAgent(
  modelSettings: ModelSettings,