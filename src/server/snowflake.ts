import * as snowflake from "snowflake-sdk";
import { SnowflakeError } from "snowflake-sdk";
import { Request, Response } from 'express';


const connectionConfig = {
  account: process.env.SNOWFLAKE_ACCOUNT ?? '',
  username: process.env.SNOWFLAKE_USERNAME ?? '',
  password: process.env.SNOWFLAKE_PASSWORD ?? '',
  region: process.env.SNOWFLAKE_REGION ?? '',
  warehouse: process.env.SNOWFLAKE_WAREHOUSE ?? '',
  database: process.env.SNOWFLAKE_DATABASE ?? '',
  sche