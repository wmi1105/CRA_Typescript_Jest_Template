import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ShowUserInfo } from "./ShowUserInfo";

describe("앱을 렌더링 합니다", () => {
  test("버튼이 있습니다", () => {
    render(<ShowUserInfo />);

    const button = screen.getByRole("button", { name: "유저정보 보기" });
    expect(button).toBeInTheDocument(); //<ShowUserInfo /> 안에 <button>유저정보 보기</button> 이 있는지 체크
  });

  test("버튼을 누르지 않았을 시, 유저 정보 안내문이 보입니다.", () => {
    render(<ShowUserInfo />);

    const text = "유저정보를 보려면 버튼을 누르세요.";
    const getText = screen.getByText(text);
    expect(getText).toBeInTheDocument(); //텍스트가 존재하는지 체크
  });
});

describe("토글 기능을 테스트합니다.", () => {
  test("버튼을 눌렀을 시, 유저 정보가 보입니다.", () => {
    render(<ShowUserInfo />);

    const infoText = /유저정보를 보려면 버튼을 누르세요./i;

    const text = screen.getByText(infoText);
    expect(text).toBeInTheDocument();

    /* ------------------------------------------------ */

    const button = screen.getByRole("button", { name: "유저정보 보기" });
    userEvent.click(button); //버튼 클릭

    /* ------------------------------------------------ */

    //텍스트가 보이지 않는지 체크.
    //보이지 않는것이 정상이므로 queryByText를 통해 없어도 오류가 나지 않게 함.
    expect(screen.queryByText(infoText)).not.toBeInTheDocument();

    //이메일 정보가 문서에 존재하는지 체크
    const email = screen.getByText("email - email@email.com");
    expect(email).toBeInTheDocument();

    //버튼의 텍스트가 "유저정보 가리기" 로 바뀌는지 체크
    expect(button).toHaveTextContent("유저정보 가리기");
  });

  test("버튼을 두번 누르면, 유저 정보가 보이지 않습니다.", () => {
    render(<ShowUserInfo />);

    const button = screen.getByRole("button", { name: "유저정보 보기" });
    userEvent.click(button, undefined, { clickCount: 1 }); //button을 한번 클릭

    //화면에 email이 있는지 체크
    const email = screen.getByText("email - email@email.com");
    expect(email).toBeInTheDocument();

    userEvent.click(button, undefined, { clickCount: 1 }); //button을 한번 더 클릭

    //화면에 email이 없어졌는지 체크
    expect(email).not.toBeInTheDocument();
  });
});
