import { db } from './index';

// Load environment variables
import 'dotenv/config';

async function testConnection() {
  console.log('🔍 Testing database connection...');
  
  try {
    // Test a simple query
    const result = await db.execute('SELECT NOW() as current_time');
    console.log('✅ Database connection successful!');
    console.log('📅 Current database time:', result[0]?.current_time);
    
    // Test if we can access the schema
    console.log('🔍 Testing schema access...');
    const tables = await db.execute(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    console.log('📋 Available tables:', tables.map(row => row.table_name));
    
  } catch (error) {
    console.error('❌ Database connection failed!');
    
    if (error instanceof Error) {
      console.error('📋 Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack?.split('\n').slice(0, 10).join('\n')
      });
    }
    
    // Log connection-specific error details
    if (error && typeof error === 'object' && 'code' in error) {
      console.error('🔍 Connection error code:', error.code);
    }
    
    // Check if it's a network-related error
    if (error && typeof error === 'object' && 'cause' in error) {
      console.error('🌐 Network error cause:', error.cause);
    }
  }
}

// Run the test
testConnection()
  .then(() => {
    console.log('🏁 Connection test completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Unexpected error:', error);
    process.exit(1);
  }); 