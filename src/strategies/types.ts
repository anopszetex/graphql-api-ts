export interface UserPostgre {
  id: number;
  email: string;
  username: string;
  isActive: boolean;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserMongo {
  email: string;
  username: string;
  password: string;
  last_name?: string;
  first_name?: string;
  is_active?: boolean;
}
