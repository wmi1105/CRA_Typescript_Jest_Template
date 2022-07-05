```
** expect({ name: 'son' }).toEqual({ name: 'son' });
toBe : 객체의 값과 메모리 비교
toEqual : 객체의 값만 비교

```

```
값이 있는 것을 원할 때 screen.getByText('');
값이 없는 것을 원할 때 screen.queryByText('');
```

```
화면에 보이는 것을 찾을 때 expect().toBeInTheDocument();
화면에 보이지 않는 것을 찾을 때 expect().not.toBeInTheDocument();
```

### 참고

- https://jestjs.io/docs/expect
- https://velog.io/@jiseong/test-jest%EC%99%80-react-testing-library-%EA%B3%B5%EB%B6%80
