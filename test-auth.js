
const http = require('http');

// Helper function to make requests with promises
function makeRequest(options, body = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data });
        }
      });
    });
    req.on('error', reject);
    
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('=== Starting Test ===\n');
  
  // 1. Register a new user
  console.log('1. Registering user...');
  const registerRes = await makeRequest({
    hostname: 'localhost', port: 3000, path: '/api/auth/register', method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { userName: 'Test User', userEmail: 'test@test.com', userPassword: 'password123' });
  console.log('Register Status:', registerRes.status);
  console.log('Register Response:', JSON.stringify(registerRes.data, null, 2), '\n');
  
  // 2. Login the user
  console.log('2. Logging in user...');
  const loginRes = await makeRequest({
    hostname: 'localhost', port: 3000, path: '/api/auth/login', method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { userEmail: 'test@test.com', userPassword: 'password123' });
  console.log('Login Status:', loginRes.status);
  console.log('Login Response:', JSON.stringify(loginRes.data, null, 2), '\n');
  
  const token = loginRes.data.data?.token;
  if (!token) {
    console.error('No token received!');
    return;
  }
  
  // 3. Get users with token
  console.log('3. Getting users with token...');
  const getUsersRes = await makeRequest({
    hostname: 'localhost', port: 3000, path: '/api/users', method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
  console.log('Get Users Status:', getUsersRes.status);
  console.log('Get Users Response:', JSON.stringify(getUsersRes.data, null, 2), '\n');
  
  console.log('=== Test complete ===');
}

runTests().catch(console.error);
