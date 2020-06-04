# Auth State & Private Routers

1. > npm i react-router-dom
1. App.js에 구현
   1. import HashRouter
   1. HashRouter 와 BrowserRouter 가 있는데 차이점에 대해 설명은 따로 # Router 차이 에서 설명
1. AlertProvier 하위 태그에 Router 를 선언하고
1. switch 를 이용하여 SPA 기능을 구현 함
1. switch 태그안에 Route 를 사용하여 각 메뉴에 대한 페이지 이동을 시도 함
   1. ex) <Route exact path="/" component={Dashboard} />

# component 들 구현

1. componets 폴더 하위에 accounts 폴더를 만들고 Login.js, Register.js 를 생성
   1. Login, Register action 들을 수행할 수 있는 component 가 될거 임
1. Register.js 먼저 구현
   1. rec + tab ( class basic react template 생성 )
1. state 에 가져올 정보들을 초기화 해주고
1. render 함수안에 html 을 가져오는데 이 아조씨 또 스킵했어...
   1. bootstrap 꺼 같은데 찾아보자
   1. 못 찾겠다 그냥 소스에서 가져오자
   1. render 함수 안에 state 정보를 const 로 선언하고 this.state 로 rendering 시 가져오자
1. onsubmit event 구현
   1. test 를 위해 우선 클릭 시 submit text 출력
1. onChange event 구현
1. Login.js 구현
   1. register와 유사하기 때문에 복사 해서 사용

# app.js 추가

1. switch 태그에 login , register 컴포넌트 추가

# header.js 수정

1. link 를 이용하여 login, register 추가 및
1. 정렬을 위한 container class 추가

# Auth page 를 위한 reducer 추가

1. src > reducers > auth.js
   1. auth.js reducer 구현
   1. dashboard를 로그인 후 에만 볼 수 있도록 구현

# router 구현

1. src/common 폴더 생성
1. privateRouter.js 생성
   1. rcf + tab ( fucntion 형태 react 생성 )
   1. arrow function 으로 만들거임

# Router 차이

1. react-router-dom 라이브러리 안에 Router 들 차이에 대해 설명
1. HashRouter
   1. server-side router
   1. url 에 # 이 붙음 ex) http://localhost/#/react/test
   1. 이는 검색엔진에서 분석되지 않는 url 이라고 함
   1. SPA 에 국한되지 않음
1. BrowserRouter
   1. client-side router
   1. history API 를 사용하여 goback 과 같은 기능 구현 가능 즉 IE9 이하 버전에서는 사용 불가능
   1. 보통 SPA ( single page application ) 을 구성 할 때 많이 사용 한다.
