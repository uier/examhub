import axios, { AxiosPromise } from 'axios';

const agent = axios.create({ baseURL: '/api' });

const Announcement = {
  get: (id: number): AxiosPromise<Announcement.Info> => agent.get(`/announcements/${id}`),
  getList: (): AxiosPromise<Announcement.ListItem[]> => agent.get('/announcements'),
  create: (body: Announcement.CreateBody): AxiosPromise<number> => agent.post('/announcements', body),
};

const Auth = {
  logout: (): AxiosPromise => agent.get('/auth/logout'),
};

const Users = {
  get: (id: number): AxiosPromise<User.Detail> => agent.get(`/users/${id}`),
  getList: (): AxiosPromise<User.Detail[]> => agent.get('/users'),
  getMe: (): AxiosPromise<User.Info> => agent.get('/users/me'),
};

export default {
  Announcement,
  Auth,
  Users,
};
