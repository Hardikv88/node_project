
const http = require('http');

console.log('Testing /api/health first...');
const req1 = http.get('http://localhost:3000/health', (res) => {
  console.log('/api/health status code:', res.statusCode);
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('/api/health response:', data);
    console.log('\nNow testing /api/users with fake Authorization header...');
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/users',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer test'
      }
    };
    
    const req2 = http.request(options, (res2) => {
      console.log('/api/users status code:', res2.statusCode);
      let data2 = '';
      res2.on('data', (chunk) => {
        data2 += chunk;
      });
      res2.on('end', () => {
        console.log('/api/users response:', data2);
      });
    });
    
    req2.on('error', (e) => {
      console.error('Error with /api/users:', e);
    });
    
    req2.end();
  });
});

req1.on('error', (e) => {
  console.error('Error with /api/health:', e);
});

req1.end();
