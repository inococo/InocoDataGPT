import fetch from 'node-fetch';

export async function querySnowflakeAPI(sqlText: string): Promise<any> {
  try {
    console.log('querySnowflakeAPI:', sqlText);
    const snowflakeResponse = await fetch('http://localhost:3001/api/snowflake', {
      method: 'POST',
      body: JSON.stringify({ sql: sqlText }),
      headers: { 'Content