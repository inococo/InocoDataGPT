import { api } from "../utils/api";
import type { Message } from "../types/agentTypes";
import { useAuth } from "./useAuth";

export interface SaveProps {
  name: string;
  goal: string;
  tasks: Message[];
}

export function useAgent() {
  const { status } = useAuth();
  const utils = api.useContext();
  // eslint-disable-next-line @typescript-eslint/no-empty-function