export interface ICartProps {
  image: string;
  name: string;
  quantity: number;
  price: number;
}

export interface ICarts {
  id: number;
  image: string;
  name: string;
  quantity: number;
  price: number;
  discount: number;
}

export interface IShoppingCartProps {
  carts: ICarts[];
}
