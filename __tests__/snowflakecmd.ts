import * as readline from 'readline';
import * as dotenv from 'dotenv';
dotenv.config();

import { querySnowflake } from "../src/server/snowflake";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function main() {
  /