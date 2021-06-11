import axios, { AxiosResponse } from 'axios';

const agent = axios.create({ baseURL: '/api' });

const Auth = {
  logout: (): Promise<AxiosResponse> => agent.get('/auth/logout'),
};

const Users = {
  getUsers: (): Promise<AxiosResponse<User.Info[]>> => agent.get('/users'),
  getMe: (): Promise<AxiosResponse<User.Info>> => agent.get('/users/me'),
};

export default {
  Auth,
  Users,
};
