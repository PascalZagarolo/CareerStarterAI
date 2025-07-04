import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Load environment variables
import 'dotenv/config';
 
// Database connection
const connectionString = process.env.DATABASE_URL!;

// Log connection details (without password)
const connectionInfo = new URL(connectionString);
console.log('🔗 Database connection info:', {
  host: connectionInfo.hostname,
  port: connectionInfo.port,
  database: connectionInfo.pathname.slice(1), // Remove leading slash
  user: connectionInfo.username,
  hasPassword: !!connectionInfo.password,
  protocol: connectionInfo.protocol,
  searchParams: connectionInfo.search
});

const client = postgres(connectionString, {
  onnotice: (notice) => console.log('📝 DB Notice:', notice),
  onparameter: (param) => console.log('🔧 DB Parameter:', param),
  onclose: () => console.log('❌ DB Connection closed')
});

export const db = drizzle(client, { schema }); 