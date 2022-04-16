export type product = {
  id: number | undefined;
  name: string;
  price: number;
  category: string | undefined;
};
export interface products extends product {
  quantity: number;
}
export type user = {
  id: number;
  firstname: string;
  lastname: string;
  password: string;
};
enum status {
  active,
  complete,
}
export type order = {
  id: number;
  status: status;
  user: user;
  products: products[];
};
