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

# delete 구현

## leads component delete button 삽입

```javascript
<button
  onClick={this.props.deleteLead.bind(this, lead.id)}
  className="btn btn-danger btn-sm"
>
  Delete
</button>
```

## actions 구현

1. deleteLead 구현 actions > leads.js 에 delete 구현을 위해 type 선언
   1. actions > types.js 에 delete type 추가 export const DELETE_LEAD = "DELETE_LEAD";
1. type 을 import 받고
1. delete axios 작성 ( \*\*\* 주의 : 삭제 시 get 이 아닌 delete로 넘겨야 한다. )

```javascript
// Delete
export const deleteLead = (id) => (dispatch) => {
  axios
    .delete(`/api/leads/${id}/`)
    .then((res) => {
      dispatch({
        type: DELETE_LEAD,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};
```

## reducer 구현

1. DELETE_LEAD type reducer 추가

```javascript
    case DELETE_LEAD:
      return {
        ...state,
        leads: state.leads.filter((lead) => lead.id !== action.payload),
      };

```

# Create data 구현

1. form ( component ) 정의
   1. state 추가 ( init data )
1. leads component propTypes 정의
   1. prop-types library 분석 필요
   1. vaildate 하는거라는데 어렵다...
1. form element를 작성하는데 영상에는 어디서 가저오는지 보이지 않음
   1. 그냥 완성본에서 가져 옴 ( 부트스트랩에서 따왔을거다 중얼중얼...)
   1. render() 함수안에 form 데이터를 가져올 state 정의 해줌
      1. const { name, email, message } = this.state;
   1. onChange, onSubmit 함수 정의
1. form element 확인을 위해 webbrower 확인 해보니 안나옴... why??
   1. webpack 이 안되는데?
   1. 음... 강력 새로고침하니까 되네
1. 폼과 리스트가 같이 있는화면에 자동으로 리프레쉬되게 만들거라는거 같다.
1. 이제 type 선언을 하고
1. action을 만들자 GET_LEADS 와 비슷하고 전달 방식이 POST 이다.
1. reducer를 추가 하고
1. Form.js 에 해야 할 일들이 많다
   1. connect, Prop-types, addLeads 를 import 받고
   1. export 때 state는 상속받을 필요없으니 null 로 넘기고 addLead 함수도 넘긴다.
      1. `export default connect(null, { addLead })(Form);`
   1. form 체크를 위해 static PropTypes를 선언 하고 다 필요한 항목이므로 func.isRequired 로 선언한다.
   1. onSubmit 함수에 lead 정보가 넘어갈 수 있도록 구현한다.
1. 중복값으로 데이터 생성 시에도 오류가 나는거 같은데 오류 매시지는 계속 Bad Request : /api/leads 이다
   1. 예상하는 바 이후 영상에 오류처리도 있을 거다
   1. 나와 같은 초심자들에게 이런 영상은 빛과 같다

```javascript
const { name, email, message } = this.state;
const lead = { name, email, message };
this.props.addLead(lead);
```

1. 엌 오류 난다
   1. bad request 라는데
   1. 원인은 post 로 넘길 때 form data 인 lead 객체를 넘겨주지 않아서 생긴 오류이다.

# tips

1. 지워진 데이터는 개발자도구 `diff` 탭에서 상세하게 확인 할 수 있다.

# WorkFlow (res, req)

1. 이게 지금 되게 해깔리는데...
1. 하나에 api 를 구현하기 위해서 해야 될 항목들은 아래와 같이 정리 할 수 있겠다.
   1. component 에서 구현 될 action 을 정의 한다.
   1. 예를 들면 버튼을 만들고 클릭 시 해당 데이터를 지운다던지 ( type : APP_DELETE )
   1. submit 버튼을 클릭 시 입력 된 폼에 데이터를 생성 한다 던지 ( type : APP_CREATE )
1. 각 엑션에 대한 type 을 먼저 선언 해 준다.
   1. 해당 프로젝트에선 src/actions/types 에 선언해 준다.
   1. `export const DELETE_LEAD = "DELETE_LEAD"` 이런 식으로
1. type 을 선언했으니 해당 타입에 대한 action 과 reducer 를 구현 해야 한다.
1. src/actions/leads.js 에 타입에 대한 action 부터 구현한다.
   1. 상기 `## actions 구현` 에 정의한 코드와 일치하며
   1. 해당 action 에 axios 를 이용하여 서버와 통신한 데이터를 가져온다.
   1. 주의 점은 통신 시 정의 된 api 에 따라 방식이 달라진다는 것이다. ( get, post, delete, update 등)
1. src/reducers/leads.js
   1. 상기 `## reducer 구현` 와 일치하며
   1. 여기서 state 관리가 이루어 진다.
1. workflow
   1. client 에서 delete 버튼을 눌렀을 때를 예로 들면
   1. leads.js ( componet ) 에 rendering 시 lead에 id 를 가지고 생성 되어 있으며 해당 버튼을 누를 시 props.deleteLead 를 통해 deleteLead 함수를 호출 한다.
   1. 해당 컴포넌트에서 connect ( reduce function ) 함수를 통해 전달 되며
      1. state 에 데이터는 mapStateToProps 라는 component 내부 함수에 의해 움직인다.
      1. connect 인자로 넘긴 mapStateToProps, {getLeads, deleteLead}
         1. mapStateToProps function 은 약속 된 명칭으로 보이며 react 에 props로 reducer에 함수를 연결 해주는 역할을 하는 듯 하다.
   1. 지우기 버튼 동작을 수행 해줄 deleteLead 함수를 정의 한다.
      1. action 을 생성하기 전에 type 을 먼저 만들어 준다.
      1. 선언한 type 으로 deleteLead 함수를 정의 한다. ( action )
         1. axios 를 이용한 서버와에 통신을 한다.
      1. action 에 해단 reducer를 구현한다.
         1. 선언된 type 대한 reducer를 switch 문을 이용하여 구현한다.
   1. 구현해야 되는 구현체를 종합하면 간단하게 하기와 같다.
      1. type
      1. action
      1. reducer
      1. component
