import { Note } from './Note';
import { User } from './User';

export interface Topic {
  name: string;
  background: string;
  user: User;
  notes: Note[];
}
