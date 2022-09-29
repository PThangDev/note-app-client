import { Note } from './Note';
import { User } from './User';

export interface Topic {
  _id: string;
  name: string;
  background: string;
  description: string;
  user: User;
  notes: Note[];
  slug: string;
  createdAt: string;
  updateAt: string;
  __v: number;
}

export type NewTopic = Pick<Topic, 'name' | 'background' | 'description'>;

export type TopicUpdate = Partial<NewTopic>;

export interface TopicUpdateRequest {
  id: string;
  data: TopicUpdate;
}

export type BaseTopic = Pick<Topic, '_id' | 'name' | 'background'>;

export interface TopicParams {
  page?: string;
  sort?: string;
  limit?: string;
  q?: string;
}

export interface GetTopicsPayload {
  params?: TopicParams;
}
