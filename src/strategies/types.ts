export interface UserPostgre {
  id: number;
  email: string;
  username: string;
  is_active: boolean;
  first_name: string;
  last_name: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserMongo {
  email: string;
  username: string;
  password: string;
  last_name?: string;
  first_name?: string;
  is_active?: boolean;
}
