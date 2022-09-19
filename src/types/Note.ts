import { User } from './User';

export interface Note {
  _id: string;
  title: string;
  content: string;
  background: string;
  topics: string[] | null;
  user: User;
  is_trash: boolean;
  is_pin: boolean;
  slug: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type NewNote = Pick<Note, 'title' | 'content' | 'background' | 'topics'>;
