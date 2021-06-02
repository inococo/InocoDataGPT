// Note: The test cases here test both local and remote Snowflake APIs.
// Please run "npm run test:custom" on another terminal before testing.
import * as dotenv from 'dotenv';
dotenv.config();

import { querySnowflake } from "../src/server/snowflake";
import { querySnowflakeAPI } from '../src/services/snowflake-service';
import { getQueryOperatorStats as getQueryOperatorStatsExt } from "../src/utils/query-opstats";


async function testQuerySnowflake() {
  console.log('Snowflake: testing............................');
  console.log("process.env.SNOWFLA