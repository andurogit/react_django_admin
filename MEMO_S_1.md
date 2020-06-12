# 기본 튜토리얼 종료 후 진행 예정사항

1. ducks pattern 적용 전 소스 git branch 처리
1. redux 사용 시 type, action, reduce 3개에 파일을 생성해야 해서 ducks pattern 적용 및 테스트
1. 프로세스 확인 및 리마인트

# git branch

1. > git branch "branch name"
1. > git branch publish

# ducks 패턴 적용

# 프로세스 확인 및 리마인트

1. login 부터 프로세스를 확인 해 보자
1. 접속시 그냥 로그인 되는 현상 또 발생
   1. 추적을 해 보자
   1. / 로 접속 시 app.js 로 접속 될 것이고
   1. PrivateRouter를 통해 isLoading, isAuthenticated 데이터 체킹이 이루어 진다.
      1. reduce에 connect에 의해서
      1. USER_LOADING 과 USER_LOADED 는 loadUser (action) 함수에서 이루어 진다.
      1. loadUser 는 App.js mount 시 수행 된다.
      1. 처음에 dispatch 로 USER_LOADING 이 수행 되어 Loading... 텍스트가 나오는거 까지는 정상
      1. ajax 로 /api/auth/user 요청을 보내면 { id: null , username : ""} 으로 리턴코드 200이 된다.
         1. 이렇게 되면 정상 동작이기 떄문에 reducer에서 isAuthenticated: true, 이기 떄문에 로그인 된 상태가 되어 버린다.
      1. 그럼 여기서 의심되는 프로세스오류는 /api/auth/user 이거 이다. 이 ajax 수행 시 토큰에 대한 부분 프로세스가 잘 못 된 것으로 보인다.
      1. 토큰이 없으면 AUTH_ERROR 를 타야하는데 안탄다.
      1. backend로가서 path('api/auth', include('knox.urls')), 이걸로 봐선 knox가 정상동작 안한다고 봐야겠다.
      1. 역시 뭔가 이상하다했더니 'accounts' app 가 등록이 되어 있지 않았다.
      1. 그래도 안됨
      1. accounts 에 APIView 와 permission_class -> permission_classes 변경 했더니 된다...
      1. 오류도 안나고 틀린건지 우찌알어...