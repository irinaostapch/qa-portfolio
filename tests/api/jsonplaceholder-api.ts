export class JSONPlaceholderAPI {
  constructor(private request: any) {}

  async getPosts() {
    const response = await this.request.get('/posts');
    return {
      status: response.status(),
      body: await response.json()
    };
  }
  
  async createPost(postData: { title: string; body: string; userId: number }) {
    const response = await this.request.post('/posts', {
      data: postData
    });
    return {
      status: response.status(),
      body: await response.json()
    };
  }
}