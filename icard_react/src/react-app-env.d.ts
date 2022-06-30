/// <reference types="react-scripts" />

type Token = string;

type User = {
  id: number;
  username: "Jairo";
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  is_staff: boolean;
};

type Auth = {
  token: Token;
  me: User;
};
