import { Topic } from './Topic';
import { User } from './User';

export interface Note {
  _id: string;
  title: string;
  content: string;
  background: string;
  topics: Topic[];
  user: User;
  is_trash: boolean;
  is_pin: boolean;
  slug: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type NewNote = Pick<Note, 'title' | 'content' | 'background'> & {
  topics: string[];
};
export interface NoteParams {
  is_trash?: boolean;
  is_pin?: boolean;
  limit?: string;
  page?: string;
  sort?: string;
  q?: string;
}

export type GetNotePayload = {
  endpoint?: string;
  params?: NoteParams;
};
export interface NoteUpdateRequierd
  extends Pick<Note, 'title' | 'content' | 'background' | 'is_trash' | 'is_pin'> {
  topics: string[];
  id: string;
}

export type NoteUpdate = {
  [Property in keyof NoteUpdateRequierd]?: NoteUpdateRequierd[Property];
};

export interface ToggleNoteToTrash {
  id: string;
  is_trash: boolean;
}

export interface ToggleNoteToPin {
  id: string;
  is_pin: boolean;
}
