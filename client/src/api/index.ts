import axios, { AxiosPromise } from 'axios';

const agent = axios.create({ baseURL: '/api' });

const Announcement = {
  get: (annId: number): AxiosPromise<Announcement.Info> => agent.get(`/announcements/${annId}`),
  getList: (): AxiosPromise<Announcement.List> => agent.get('/announcements'),
  create: (body: Announcement.CreateBody): AxiosPromise<number> => agent.post('/announcements', body),
};

const Auth = {
  logout: (): AxiosPromise => agent.get('/auth/logout'),
};

const Users = {
  get: (userId: number): AxiosPromise<User.Detail> => agent.get(`/users/${userId}`),
  getList: (): AxiosPromise<User.Detail[]> => agent.get('/users'),
  getMe: (): AxiosPromise<User.Info> => agent.get('/users/me'),
};

export default {
  Announcement,
  Auth,
  Users,
};
