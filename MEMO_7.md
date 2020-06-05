# login Frontend Devleop

1. 이전에 loadUser 함수까지 만들었고 ...
1. login action을 만들어야 한다.

# login action

1. actions > auth.py 에서 구현
1. 먼저 LOGIN_SUCCESS, LOGIN_FAIL type을 선언하고 진행
1. action>auth.js 에 LOGIN types 구현

```js
export const login = (username, password) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  body = JSON.stringify({ username, password });

  axios
    .get("/api/auth/login", body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.reponse.date, err.response.status));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};
```

# component 구현

1. component>accounts>login.js
   1. connect, PropTypes, login , redirect import
1. mapStateToProps 구현 및 export connect & mapStateToProps 전달
1. login action 인자로 전달 : { login }

# hearder

1. connect, PropTypes import
1. props 컨트롤
1. isAuth 분기로 다른 정보 보여주도록 처리
   1. {isAuthenticated ? authLinks : guestLinks}

# logout 구현

1. reducer, actions 구현
1. header component 에서 logout 메소드 실행

# Alert 구현

1. 오류 메시지 표현 non_field_errors 일 때

# 로그인 시 접속자 이름 표기

1. Header.js 수정
   1. 로그인 사용자 이름 상단에 표기
   1. span > strong 태그 생성 및 이름 출력

# actinos 리펙토링

1. actions > auth.js
   1. 공통적인 코드인 token 정보 구성을 tokenConfig 함수로 변환

# 회원등록 (Register.js) component 구현

1. password, password2 를 비교하는 로직 구현
   1. 일치하는 확인 후 메시징 처리
   1. 메시징 처리해야하므로 export 에 createMessage 함수 추가하는거 잊지 말것
   1. Alert.js에 해당 alert 추가

# leads actions 수정

1. tokenconfig 를 import 받아
1. axios 시 getState를 인자로 전달하여 token을 가져온다.
