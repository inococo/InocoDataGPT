// Note: The test cases here test both local and remote Snowflake APIs.
// Please run "npm run test:custom" on another terminal before testing.
import * as dotenv from 'dotenv';
dotenv.config();

import { querySnowflake } from "../src/server/snowflake";
import { querySnowflakeAPI } from '../src/services/snowflake-service';
import { getQueryOperatorStats as getQueryOperatorStatsExt } from "../src/utils/query-opstats";


async function testQuerySnowflake() {
  console.log('Snowflake: testing............................');
  console.log("process.env.SNOWFLAKE_ACCOUNT:", process.env.SNOWFLAKE_ACCOUNT);
  console.log("process.env.SNOWFLAKE_USERNAME:", process.env.SNOWFLAKE_USERNAME);

  console.log('Snowflake: querying............................');
  const results = await querySnowflake('SELECT count(*) FROM customer');
  console.log('Snowflake query results:', results);
}

async function getQueryOperatorStats() {
  // Step 1: Get the last query ID
  const queryIdQuery = 'SELECT last_query_id();';
  const que