import { ICarts, ICartProps, IShoppingCartProps } from "./ShoppingCart_types";

const getDiscountPrice = (
  price: number,
  quantity: number,
  discount: number
) => {
  return (price - price * discount) * quantity;
};

const getTotalPrice = (carts: ICarts[]) => {
  return carts
    .map(({ price, quantity, discount }) =>
      getDiscountPrice(price, quantity, discount)
    )
    .reduce((acc, cur) => acc + cur, 0);
};

function Cart({ image, name, quantity, price }: ICartProps) {
  return (
    <li>
      <div>
        <img src={image} alt={name} />
      </div>

      <div>
        <div>개수 : {quantity}</div>
        <p>상품 가격 : {price}원</p>
      </div>
    </li>
  );
}

export function ShoppingCart({ carts }: IShoppingCartProps) {
  return (
    <div>
      <h2>쇼핑 목록</h2>

      <ul>
        {carts.map(({ id, image, name, quantity, price, discount }) => (
          <Cart
            key={id}
            image={image}
            name={name}
            quantity={quantity}
            price={getDiscountPrice(price, quantity, discount)}
          />
        ))}
      </ul>

      <div>총 가격 : {getTotalPrice(carts)}원</div>
    </div>
  );
}
