export interface User {
  id: string;
  email?: string;
  username?: string;
  isActive?: boolean;
  firstName?: string;
  lastName?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GetInput {
  id?: string | number;
  email?: string;
}

export interface IPostgreStrategy {
  findOne: (table: string, options: GetInput) => Promise<User[]>;
}
