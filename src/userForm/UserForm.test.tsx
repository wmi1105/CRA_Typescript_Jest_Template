import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { UsernameForm } from "./UserForm";

describe("유저명 폼을 렌더링합니다.", () => {
  test("유저명 폼에는 input이 있습니다.", () => {
    render(<UsernameForm />);

    //input을 찾고, placeholder가 제대로 들어있는지 체크
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "유저명을 입력하세요");
  });

  test("유저명 폼에는 button이 있습니다.", () => {
    render(<UsernameForm />);

    //제출 버튼이 제대로 렌더링되는지 체크
    const button = screen.getByRole("button", { name: "제출" });
    expect(button).toBeInTheDocument();
  });
});

describe("유저명 폼을 검증합니다.", () => {
  test("빈 인풋 제출 시, 화면에 오류를 보여줍니다.", () => {
    render(<UsernameForm />);

    //인풋이 빈 값을 가지는지 체크
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("");

    //버튼 클릭
    const button = screen.getByRole("button", { name: "제출" });
    userEvent.click(button);

    //오류 메세지가 보이는지 체크
    const errorBox = screen.getByText("유저명을 필수로 입력해주세요.");
    expect(errorBox).toBeInTheDocument();
  });

  test("21자 이상의 문자열 입력 시 , 화면에 오류를 보여줍니다.", () => {
    render(<UsernameForm />);

    //input이 빈값을 가지는지 확인
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("");

    //input에 21자 이상의 문자열 입력
    userEvent.type(input, "1234567890123456789012");

    //제출 버튼 클릭
    const button = screen.getByRole("button", { name: "제출" });
    userEvent.click(button);

    //오류 문구가 보이는지 체크
    const text = screen.getByText("20자 이하의 문자열을 입력해주세요.");
    expect(text).toBeInTheDocument();
  });

  test("21자 이상의 문자열을 입력했으나 제출하지 않으면, 에러가 보이지 않습니다.", () => {
    render(<UsernameForm />);

    //input이 빈값을 가지는지 확인
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("");

    //input에 21자 이상의 문자열 입력
    userEvent.type(input, "1234567890123456789012");

    //오류 문구가 보이지 않는지 체크
    const text = screen.queryByText("20자 이하의 문자열을 입력해주세요.");
    expect(text).not.toBeInTheDocument();
  });

  test("21자 이상의 문자열 입력 시 에러를 보여주며, 1글자를 지우면 에러가 사라집니다.", () => {
    render(<UsernameForm />);

    const errorMsg = "20자 이하의 문자열을 입력해주세요.";

    //인풋이 빈 값을 가지는지 체크
    const input = screen.getByRole("textbox");

    expect(input).toHaveValue("");
    //에러메세지가 보이지 않는지 체크
    expect(screen.queryByText(errorMsg)).not.toBeInTheDocument();

    //21자 이상 문자를 입력한 수 제출버튼 클릭,
    //에러메세지가 보이는지 체크
    userEvent.type(input, "123456789012345678901");
    const button = screen.getByRole("button", { name: "제출" });
    userEvent.click(button);
    expect(screen.getByText(errorMsg)).toBeInTheDocument();

    //백스페이스 입력(한글자 지우기 )
    userEvent.type(input, "{backspace}");

    //에러메세지가 사라졌는지 체크
    expect(screen.queryByText(errorMsg)).not.toBeInTheDocument();
  });

  test("성공적으로 폼을 제출 시 성공 메시지를 보여줍니다.", () => {
    render(<UsernameForm />);

    // const errorMsg = "20자 이하의 문자열을 입력해주세요.";
    const successMsg = "유저명 생성에 성공했습니다.";

    //input이 빈값을 가지는지 확인
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("");

    //에러 메세지가 보이지 않는지 체크
    const errorBox = screen.queryByTestId("error-box");
    expect(errorBox).not.toBeInTheDocument();

    //성공 메세지가 보이지 않는지 체크
    const successBox = screen.queryByTestId("success-box");
    expect(successBox).not.toBeInTheDocument();

    /* ---------------------------------------- */

    // 정상적인 username 입력 후 제출버튼 클릭
    userEvent.type(input, "정상네임");
    const button = screen.getByRole("button", { name: "제출" });
    userEvent.click(button);

    const sucText = screen.getByText(successMsg);
    expect(sucText).toBeInTheDocument();
  });
});
