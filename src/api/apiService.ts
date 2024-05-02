export class ApiService {
  clientId: string;

  clientSecret: string;

  authHost: string;

  scope: string;

  region: string;

  projectKey: string;

  token: string;

  basePath: string;

  constructor() {
    this.clientId = import.meta.env.VITE_CTP_CLIENT_ID;
    this.clientSecret = import.meta.env.VITE_CTP_CLIENT_SECRET;
    this.authHost = import.meta.env.VITE_CTP_AUTH_URL;
    this.scope = import.meta.env.VITE_CTP_SCOPES;
    this.region = import.meta.env.VITE_REGION;
    this.projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
    this.token = '';
    this.basePath = `https://${this.region}.commercetools.com/${this.projectKey}/`;
  }

  async init(): Promise<void> {
    const url = `${this.authHost}/oauth/token`;

    const requestBody = new URLSearchParams();
    requestBody.append('grant_type', 'client_credentials');
    requestBody.append('scope', this.scope);

    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`${this.clientId}:${this.clientSecret}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: requestBody,
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      this.token = data.access_token;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  async GET<T>(
    path: string,
    params?: Record<string, string>,
  ): Promise<T | undefined> {
    let url = this.basePath + path;
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };
    if (params) {
      url = url + new URLSearchParams(params);
    }
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  async POST<T>(
    path: string,
    body: Record<string, string>,
  ): Promise<T | undefined> {
    const url = this.basePath + path;
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(body),
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  async DELETE<T>(
    path: string,
    params?: Record<string, string>,
  ): Promise<T | undefined> {
    let url = this.basePath + path;
    const requestOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };
    if (params) {
      url = url + new URLSearchParams(params);
    }
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }
}

const api = new ApiService();
const apiPOST = api.POST;
const apiGET = api.GET;
const apiDELETE = api.DELETE;
export { api, apiPOST, apiGET, apiDELETE };
