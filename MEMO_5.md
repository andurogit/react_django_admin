# Django token Authentication

1. leads > models.py 수정
1. django.contrib.auth.models import User
1. owner 컬럼 추가
   1. 외래키로 User를 사용하고 삭제 시 같이 삭제되도록 설정 및 nullable 하도록 처리
1. env 에서 makemigrations 및 migrate 실행
   1. > py manage.py makemigrations
   1. > py manage.py migrate
   1. 오류남 `database is locked ( sqllite3 사용 시 데이터베이스 열고 있으면 발생 )
1. api.py 에서 구현
   1. 기존 all object 는 삭제하고 데이터 get 및 create 함수 구현
   1. permission any -> isAuthenticated 로 변경
   1. get_queryset, perform_create 두 함수 들은 미리 약속 된 함수들인 것 같다 자동 완성기능이 있네
1. 그리고 서버에서 확인하면 List 가 보이지 않는다. 인증된 유저데이터만 보이도록 구현되서 그렇다.
1. conosole 에서 확인 해보면 두개에 에러가 보일 것이다.
   1. 403
   1. 404 favicon 이 없어서 발생
1. 이 오류들 messaging 을 위해 구현체 코딩
   1. actions > message
   1. returnError function 정의
1. actions > leads 에서 error message 전달
   1. .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
   1. get, add 함수에 넣어 주면 redux 개발자툴 state 에서 status 와 msg 항목으로 상세정보를 볼 수 있다.

# token auth setting

1. django root setting.py
1. INSTALLED_APPS = [ ... 'knox' ] 추가
1. REST_FRAMEWORK = { 'DEFAULT_AUTHENTICATION_CLASSES':('knox.auth.TokenAuthentication') } 추가 입력
1. knox table 추가를 위한 migrate > py manage.py migrate

# 계정관리를 위한 accounts app setting

1. > py manage.py startapp accounts
1. INSTALLED_APPS = [ ... 'accounts' ] 추가
1. app 폴더 안에 serializer.py 생성 및 DAO 작업
   1. serializers , User, authenticate import
   1. UserSerializer, RegisterSerializer 생성
   1. model 은 User ( middleware 에 등록 된 contrib.auth ) 사용
1. serializer 에서 inner Meta class 에 의미에 대해 더 알아봐야 겠다.
   1. https://kimdoky.github.io/django/2018/07/11/drf-Serializers/ 참조

# app.py Register 구현

1. Register API
   1. post 형태로 user , token 정보를 받아 온다.
   1. 영상에서는 어떤 형태에 browser 든 session token을 가지고 있다고 한다.

# urls.py

1. 연결을 위한 url.py 추가

# TEST

1. http://localhost:8000/api/auth/register
1. 데이터 입력 후 reponse 데이터 오류인지 오류 발생 함
   1. Object of type AuthToken is not JSON serializable
   1. api.py AuthToken.objects.create(user) -> AuthToken.objects.create(user)[1] 변경
   1. return value 가 list 인가 봄

# app.py Login 구현

1. serializers.py
   1. LoginSerializer 클래스 구현
   1. arg : serializers.Serializer
      1. 여기서 ModelSerializer 를 사용하지 않는 이유는 login 은 정합성 체크나 model을 이용하지 않으므로 그렇단다.
   1. username, password 를 serializer로 받는다.
   1. django 기본 스키마에 is_active 컬럼을 통해 user 권한을 지정 한다.
   1. 위배 될 경우 serializers.ValidationError를 통해 오류를 리턴한다.
1. api.py
   1. class 구현 LoginAPI
