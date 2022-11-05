import axios from "axios";
import type { ModelSettings } from "../utils/types";
import AgentService from "../services/agent-service";
import {
  DEFAULT_MAX_LOOPS_CUSTOM_API_KEY,
  DEFAULT_MAX_LOOPS_FREE,
  DEFAULT_MAX_LOOPS_PAID,
} from "../utils/constants";
import type { Session } from "next-auth";
import type { Message } from "../types/agentTypes";
import { env } from "../env/client.mjs";
import { v4 } from "uuid";
import type { RequestBody } from "../utils/interfaces";

const TIMEOUT_LONG = 1000;
const TIMOUT_SHORT = 800;
function sleep(milliseconds: number): Promise<void> {
  return new Promise((r) => setTimeout(r, milliseconds));
}

class AutonomousAgent {
  name: string;
  goal: string;
  tasks: string[] = [];
  completedTasks: string[] = [];
  modelSettings: ModelSettings;
  isRunning = true;
  renderMessage: (message: Message) => void;
  shutdown: () => void;
  numLoops = 0;
  session?: Session;
  _id: string;

  constructor(
    name: string,
    goal: string,
    renderMessage: (message: Message) => void,
    shutdown: () => void,
    modelSettings: ModelSettings,
    session?: Session
  ) {
    this.name = name;
    this.goal = goal;
    this.renderMessage = renderMessage;
    this.shutdown = shutdown;
    this.modelSettings = modelSettings;
    this.session = session;
    this._id = v4();
  }

  async run() {
    this.sendGoalMessage();
    this.sendThinkingMessage();

    try {
      const data = await this.queryDatastore();

      this.sendSqlMessage(data.sql);
      this.sendSqlTableMessage(data.result);
    } catch (e) {
      console.log(e);
      this.sendErrorMessage(getMessageFromError(e));
    }
    this.stopAgentSliently();

    // Comment out auto agents
    // // Initialize by getting tasks
    // try {
    //   // get the broken-down tasks
    //   this.tasks = await this.getInitialTasks();
    //   // display task names only
    //   for (const task of this.tasks) {
    //     await sleep(TIMOUT_SHORT);
    //     this.sendTaskMessage(task);
    //   }
   