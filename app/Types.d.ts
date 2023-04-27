export interface JournalEntry {
  id: number;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  tagName: string;
  tagId: number;
}
export interface UserProfile {
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