export interface Note {
  _id: string;
  title: string;
  content: string;
  background: string;
  topics: string[] | null;
  user: string;
  is_trash: boolean;
  is_pin: boolean;
  slug: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
