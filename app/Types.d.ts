export interface JournalEntry {
  id: number;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    name: string;
  }
  tagName: string;
  tagId: number;
}
export interface UserProfile {
  id: number;
  username: string;
  password: string;
  name: string;
  address: string;
  email: string;
  image: string;
}
export type Props = {
  params: {
    id: string;
  }
};
export type Comment = {
  id: number;
  body: string;
  journal_entry_id: number;
  user_id: number;
  created_at: Date;
  username: string;
  userImage: string;
};
