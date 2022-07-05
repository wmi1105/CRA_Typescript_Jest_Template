import { render, screen } from "@testing-library/react";
import { ShoppingCart } from "./ShoppingCart";
import { ICarts } from "./ShoppingCart_types";

const mock: ICarts[] = [
  {
    id: 1,
    name: "강아지 신발 사이즈 xs",
    price: 14000,
    discount: 0.1,
    quantity: 1,
    image: "https://via.placeholder.com/150.png",
  },

  {
    id: 2,
    name: "베이비 물티슈 200매",
    price: 2000,
    discount: 0.2,
    quantity: 10,
    image: "https://via.placeholder.com/150.png",
  },

  {
    id: 3,
    name: "강아지 사료 4kg",
    price: 40000,
    discount: 0.3,
    quantity: 3,
    image: "https://via.placeholder.com/150.png",
  },
];

describe("ShoppingCart 컴포넌트를 렌더링합니다.", () => {
  test("헤더가 있습니다.", () => {
    render(<ShoppingCart carts={mock} />);

    //헤더가 화면에 있는지 체크
    const header = screen.getByRole("heading", { name: "쇼핑 목록" });
    expect(header).toBeInTheDocument();
  });

  test("아이템 3개를 보여줍니다.", () => {
    render(<ShoppingCart carts={mock} />);

    const lis = screen.getAllByRole("listitem"); //모든 리스트 아이템을 찾음.
    expect(lis.length).toBe(3); //모두 총 3개인지 체크
  });

  test("아이템의 이미지를 노출합니다.", () => {
    render(<ShoppingCart carts={mock} />);

    const image = screen.getByAltText("강아지 사료 4kg"); //"강아지 사료 4kg" 텍스트로 이미지를 찾음.
    expect(image).toHaveAttribute("src", mock[2].image); //이미지의 src attribute가 mock의 데이터와 같은지 체크
  });
});

describe("계산된 값을 노출합니다.", () => {
  test("할인된 값을 보여줍니다.", () => {
    render(<ShoppingCart carts={mock} />);

    //상품 가격에 할인가가 반영되었는지 체크하세요.
    //상품 가격 = (price - price * discount) * quantity;
    const { price, quantity, discount } = mock[0];
    const discountPrice = (price - price * discount) * quantity;
    const prices = screen.getAllByText(/상품 가격 :/i);
    expect(prices[0]).toHaveTextContent(`상품 가격 : ${discountPrice}`);
  });

  test("총 가격을 보여줍니다.", () => {
    render(<ShoppingCart carts={mock} />);

    const getTotalPrice = (carts: ICarts[]) => {
      return carts
        .map(
          ({ price, quantity, discount }) =>
            (price - price * discount) * quantity
        )
        .reduce((acc, cur) => acc + cur, 0);
    };

    //화면에 보여지는 값과 직접 계산한 값이 같은지 체크
    const totalPrice = getTotalPrice(mock);
    const text = screen.getByText(`총 가격 : ${totalPrice}원`);
    expect(text).toBeInTheDocument();
  });
});
