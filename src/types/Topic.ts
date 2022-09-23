import { Note } from './Note';
import { User } from './User';

export interface Topic {
  _id: string;
  name: string;
  background: string;
  user: User;
  notes: Note[];
  slug: string;
  createdAt: string;
  updateAt: string;
  __v: number;
}

export type BaseTopic = Pick<Topic, '_id' | 'name' | 'background'>;
