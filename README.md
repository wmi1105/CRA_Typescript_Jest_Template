```
** expect({ name: 'son' }).toEqual({ name: 'son' });
toBe : 객체의 값과 메모리 비교
toEqual : 객체의 값만 비교

```

#### [expect]

```
화면에 보이는 것을 찾을 때 expect().toBeInTheDocument();
화면에 보이지 않는 것을 찾을 때 expect().not.toBeInTheDocument();
현재 값을 확인할 때 expect(input).toHaveValue("");  //input이 빈값인지 확인
```

#### [screen]

```
* 텍스트 가져오기
값이 있는 것을 원할 때 screen.getByText('');
값이 없는 것을 원할 때 screen.queryByText('');

* element 가져오기
const button = screen.getByRole("button", { name: "버튼이름" });
const input = screen.getByRole("textbox");  //<input type="text"/> 찾기
```

```
유저 이벤트 처리
userEvent.type(input, "input에 글자 입력 하기");
userEvent.type(input, "{backspace}");
userEvent.click(button);
```

### 참고

- https://jestjs.io/docs/expect
- https://velog.io/@jiseong/test-jest%EC%99%80-react-testing-library-%EA%B3%B5%EB%B6%80
