export default class CatServices {
  constructor() {
    this._apiBase = `https://api.thecatapi.com/v1/images/search?limit=15&page=35&order=Desc`;
  }

  async getResource() {
    const result = await fetch(`${this._apiBase}`, {
      headers: {
        'x-api-key': '2affc8da-e2a2-4adc-a4f8-24cc08b7640b'
      }
    });

    return await result.json();
  }
}