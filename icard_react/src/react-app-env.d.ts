/// <reference types="react-scripts" />

type Token = string;

interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  is_staff: boolean;
}

interface CreateUser extends Omit<User, "id"> {}

interface EditUser extends Partial<Omit<User, "id">> {}

interface Auth {
  token: Token;
  me: User;
}
