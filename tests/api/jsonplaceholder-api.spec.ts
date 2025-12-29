 import { test, expect } from '@playwright/test'; 
 import { JSONPlaceholderAPI } from './jsonplaceholder-api'; 
 
 test.describe('JSONPlaceholder API tests', () => {
  test('GET posts', async ({ request }) => {
    const api = new JSONPlaceholderAPI(request);
    
    const result = await api.getPosts();
    
    expect(result.status).toBe(200);
    expect(Array.isArray(result.body)).toBe(true);
    expect(result.body.length).toBeGreaterThan(0);
    
    console.log(`Got ${result.body.length} posts`);
  });
  
  test('POST create post', async ({ request }) => {
    const api = new JSONPlaceholderAPI(request);
    
    const postData = {
      title: 'API Test Post',
      body: 'Testing API with Playwright',
      userId: 1
    };
    
    const result = await api.createPost(postData);
    
    expect(result.status).toBe(201);
    expect(result.body.title).toBe(postData.title);
    expect(result.body.id).toBeDefined();
    
    console.log(`Created post with ID: ${result.body.id}`);
  });
});