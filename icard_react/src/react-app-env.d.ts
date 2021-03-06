/// <reference types="react-scripts" />

type Token = string;
type Url = string;
type ID = number;

interface Auth {
  token: Token;
  me: User;
}

interface User {
  id: ID;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  is_staff: boolean;
}

interface CreateUser extends Omit<User, "id"> {}

interface EditUser extends Partial<CreateUser> {}

interface Category {
  id: ID;
  title: string;
  image: Url;
}

interface CreateCategory extends Omit<Category, "id" | "image"> {
  image: File;
}

interface EditCategory extends Partial<CreateCategory> {}

interface Product {
  id: ID;
  title: string;
  image: Url;
  price: number;
  active: boolean;
  category: ID;
  category_data: Category;
}

interface ProductWithQuantity extends Product {
  quantity: number;
}

interface CreateProduct
  extends Omit<Product, "id" | "image" | "category_data"> {
  image: File;
}

interface EditProduct extends Partial<CreateProduct> {}

interface Table {
  id: ID;
  number: number;
}

interface CreateTable extends Omit<Table, "id"> {}

interface EditTable extends Partial<CreateTable> {}

interface Order {
  id: ID;
  status: "PENDING" | "DELIVERED";
  close: boolean;
  created_at: string;
  table_data: Table;
  product_data: Product;
  payment?: ID;
}

interface TableFilter {
  number?: number | "";
}

interface CreateOrder extends Omit<Order, "id" | "created_at"> {}

interface EditOrder extends Partial<CreateOrder> {}

interface OrderFilter {
  idTable?: ID | "";
  status?: Order["status"] | "";
  close?: Order["close"] | "";
  payment?: ID | "";
  order?:
    | "table"
    | "status"
    | "close"
    | "-table"
    | "-status"
    | "-close"
    | "-status,created_at"
    | "-status,-created_at"
    | "";
}

interface Payment {
  id: ID;
  table: ID;
  table_data: Table;
  total_payment: number;
  payment_type: "CARD" | "CASH";
  status_payment: "PENDING" | "PAID";
  created_at: string;
}

interface CreatePayment
  extends Omit<Payment, "id" | "created_at" | "table_data"> {}
