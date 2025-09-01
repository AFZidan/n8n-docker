// MongoDB initialization script for n8n temp data
// This script runs when MongoDB starts for the first time

// Switch to the n8n_temp_data database
db = db.getSiblingDB('n8n_temp_data');

// Create a user for n8n with read/write permissions
db.createUser({
  user: 'n8nUser',
  pwd: 'SecureN8nPass123',
  roles: [
    {
      role: 'readWrite',
      db: 'n8n_temp_data'
    }
  ]
});

// Create some initial collections for common n8n use cases
db.createCollection('workflow_data');
db.createCollection('temp_storage');
db.createCollection('cache');
db.createCollection('logs');

// Add indexes for better performance
db.workflow_data.createIndex({ "workflowId": 1, "createdAt": 1 });
db.temp_storage.createIndex({ "key": 1 }, { unique: true });
db.cache.createIndex({ "expireAt": 1 }, { expireAfterSeconds: 0 });
db.logs.createIndex({ "timestamp": 1 });

print('MongoDB initialization completed for n8n temp data storage');
