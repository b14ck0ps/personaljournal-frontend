export interface JournalEntry {
  id: number;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: number;
    username: string;
    password: string;
    name: string;
    address: string;
    email: string;
    image: string;
  };
}
export interface UserProfile {
  username: string;
  password: string;
  name: string;
  address: string;
  email: string;
  image: string;
}