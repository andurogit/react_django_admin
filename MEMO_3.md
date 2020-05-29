# Redux + HTTP

# Tools setting

1. Reduc DevTools ( chrome ) 이거 깔래
1. npm i redux react-redux redux-thunk redux-devtools-extension

# init

1. src 폴더에 store.js 를 생성
1. redux 에 역할은 state 관리에 있다.
   1. redux thunk 는 비동기 통신 시 사용

```javascript
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
```

# reducer 정의

1. reducers 폴더 를 만든다. src 폴더 밑에
1. 해당 폴더에 index.js 생성
1. combineReducers 를 가져오고 디폴트 상태로 놓는다.
1. App.js 로 가서
   1. store를 가져온다.
   1. Provider를 가져온다. react-redux
   1. Fragment 를 <Provider store={store}> 로 감싼다.
1. 이렇게 하고 페이지를 띄워보면 오류가 날 것이다.
   1. redux.js:327 Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.
   1. 뭐 대강 스토어에 알 수 없는 reducer 가 있으니 combineReducers에 알맞은 전달 값을 넣어라 정도의 뜻인거 같다.
1. 처음에 깔라고 했던 tool 사용법을 알려주는데...
   1. 개발자 모드에서 맨 마지막 탭에 Redux 가 생겼다
   1. 여기서 state 라던지 모니터링이라던지 로깅 같은 걸 할 수 있게 생겼다.

# action type 정의, reducer 정의

1. reducers 폴더에 index.js 로 돌아와서
   1. combineReducers 에 leads 를 포함 시킨다.
1. leads.js 를 정의 해야 하는데...
   1. 첫번째로 action type을 선언한다.
   1. redux에 기본 구성은 action 과 payload 가 있다.
   1. 아무튼 action type을 정의 하기 위해 src 폴더 밑에 actions 폴더 생성
   1. 해당 폴더에 types.js 파일을 생성해 두자
      1. export const GET_LEADS = "GET_LEADS";
      1. LEADS 데이터를 가져온다라는 type을 만들었다고 보면 될 거 같다.
   1. 다시 reducers/leads 로 돌아와서
   1. 선언된 type을 import 해주고 import { GET_LEADS } from "../actions/type.js";
   1. state와 leads 를 반환 하자
   1. reducers/leads.js 소스

```javascript
import { GET_LEADS } from "../actions/type.js";

const initialState = {
  something: "text",
  leads: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LEADS:
      return {
        ...state,
        leads: action.payload,
      };
    default:
      return state;
  }
}
```

# action 정의

1. 이제 실체를 만들어야 한다.
1. actions 폴더에 leads.js를 생성하고 데이터 베이스와 통신을 해야 한다.
1. 통신을 위해 axios를 설치 한다.
   1. npm i axios
1. 여기는 또 에로우 펑션을 썼네... 여하튼
1. axios 를 통해 django server /api/leads/ 로 요청을 보내 res.data를 태워서 오는 그런 코드

# componets > leads

1. 이 리스트를 불러올 leads 라는 컴포넌트에
1. 통신을 통해 불러오는 actions에 lead로 데이터를 가져오도록 해야 한다.
1. connect , getLeads , prop-types 를 import 하여 사용 할 것이고
1. mapStateToProps 라는 함수로 getLeads 에서 가져온 데이터를 props로 넘겨 줄 것이다.
1. 이 컴포넌트에서 export default connect(mapStateToProps, { getLeads })(Leads); 와 같이 데이터와 클래스를 같이 수출한다.
1. PropTypes = {leads: PropTypes.array.isRequired}; 이건 솔직히 무슨 의미인지 아직 모르겠다.

```javascript
const mapStateToProps = (state) => ({
  // state.leads : reducer
  leads: state.leads.leads,
});
```

1. 이걸 compoentDidMount() 로 getLeads() 를 가져가면 화면상에 response로 모든 leads를 가져갔을 것이다.
1. 개발자 모드에 state 탭에서 확인 가능하다.
1. state 까지 데이터가 넘어 왔으면 이제 그리기만 하면 끝이다.
1. table 그리기 팁 table.table.table-striped + tab

# res, req workflow

1. 이게 지금 되게 해깔리는데...
