import axios, { AxiosPromise } from 'axios';

const agent = axios.create({ baseURL: '/api' });

const Announcement = {
  get: (id: number): AxiosPromise<Announcement.Info> => agent.get(`/announcements/${id}`),
  getList: (): AxiosPromise<Announcement.Info[]> => agent.get('/announcements'),
  create: (body: Announcement.CreateBody): AxiosPromise<number> => agent.post('/announcements', body),
  modify: (id: number, body: Announcement.CreateBody): AxiosPromise => agent.patch(`/announcements/${id}`, body),
  delete: (id: number): AxiosPromise => agent.delete(`/announcements/${id}`),
};

const Ranking = {
  getList: (): AxiosPromise<Ranking.Info[]> => agent.get('/ranking'),
}

const Exam = {
  get: (id: number): AxiosPromise<Exam.Info> => agent.get(`/exam/${id}`),
  getList: (courseId?: number): AxiosPromise<Exam.ListItem[]> => agent.get('/exam', { params: courseId ? { courseId } : {} }),
  create: (body: Exam.CreateBody): AxiosPromise<number> => agent.post('/exam', body),
  delete: (id: number): AxiosPromise => agent.delete(`/exam/${id}`),
  vote: (id: number, score: number): AxiosPromise => agent.post(`/exam/${id}/vote`, { score }),
  getVote: (id: number): AxiosPromise<{ score: number }> => agent.get(`/exam/${id}/vote`),
};

const Comment = {
  getList: (areaId: number): AxiosPromise<Comment.Info[]> => agent.get('/comments', { params: { areaId } }),
  create: (body: Comment.CreateBody): AxiosPromise<number> => agent.post('/comments', body),
};

const Course = {
  get: (id: number): AxiosPromise<Course.Info> => agent.get(`/courses/${id}`),
  getList: (): AxiosPromise<Course.Info[]> => agent.get('/courses'),
  create: (body: Course.CreateBody): AxiosPromise<{ courseId: number }> => agent.post('/courses', body),
  modify: (id: number, body: Course.CreateBody): AxiosPromise => agent.patch(`/courses/${id}`, body),
};

const Auth = {
  logout: (): AxiosPromise => agent.get('/auth/logout'),
};

const Users = {
  get: (id: number): AxiosPromise<User.Detail> => agent.get(`/users/${id}`),
  getList: (): AxiosPromise<User.Detail[]> => agent.get('/users'),
  getMe: (): AxiosPromise<User.Info> => agent.get('/users/me'),
  modify: (id: number, body: Partial<User.Info>): AxiosPromise => agent.patch(`/users/${id}`, body),
};

export default {
  Announcement,
  Comment,
  Ranking,
  Exam,
  Course,
  Auth,
  Users,
};
