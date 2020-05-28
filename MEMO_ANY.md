# 필요 study 항목들

1. django
1. djangorestframework
1. django-knox ( 비동기 통신 )
1. react
1. redux ( state 관리 )
1. webpack ( es6 회피 관련 )

# djangorestframework

django 에 restframework 를 붙여 사용 함으로 써 가장 큰 차이 점은.
serializer 와 viewset 인 듯 하다.
이 두 개념을 이해해야 만 djangorestframework를 사용할 수 있겠다.

지금 까지 학습 한 바에 의하면 사용법은 아래와 같다.

1. django 에서 python manage.py startapp "appName" 으로 어플리케이션을 생성하면
1. 폴더 안에 models라는 기본생성 파일이 나오는데 여기에다가 테이블 정보를 입력 한다.
    1. 테이블 컬럼 정보들을 말이다.
    1. https://docs.djangoproject.com/en/3.0/ref/models/fields/ 여기를 참조하자
1. 정의가 끝이나면 admin 명령어로 마이그레이션을 수행하면 데이터베이스에 정의된 컬럼대로 테이블이 생성 된다.
    1. python manage.py makemigrations "appName"
    1. python manage.py migrate 
1. 기본 생성 파일에는 존재하지 않는 serializer를 정의 해줘야한다. 해당 파일을 참조 하자
1. 또 기본 생성 파일에 존재하지 않는 api ( viewset ) 을 위에서 정의한 model 과 serializer를 통해 정의하자.
    1. 이 파일에서 권한도 같이 설정 된다.
1. 이렇게 정의된 serializer 와 api(viewset) 을 urls.py 에 router를 이용해 urlMapping 으로 넘겨주면 rest_framework 에 한 사이클 기본 정의가 완료 된다.
1. 기본으로 정의 된 rest 는 urls.py 에서 DefaultRouter 를 사용 했다면 선언만으로도 CRUD 모두가 가능해 진다.
    1. 예를 들면 get 방식으로 요청한 rest 는 데이터 list를 반환하고
    1. post 방식으로 데이터를 보내면 create 되며
    1. pattern명칭에 /update 또는 /delete 로 pk를 전달하면 지우기와 데이터 update 도 가능하다.

사용방법만 숙지하면 기본 django 프레임워크를 최소한에 코딩으로 많은 일을 할 수 있다.
또한 프레임웍 자체에서 정의 된 urlpattern 들로 테스트 할 수 있는 기본페이지가 제공되어 개발에 매우 유용하다.
* 실제 빌드 시 해당 페이지를 숨기거나 유저들이 사용할 수 없도록 만들 수 있는지는 고려해 봐야겠다.

이상 기본중에 기본으로 restframework 사용 방법을 정리해 보았고 실제 코딩이나 상세사항은
MEMO_1.md 파일을 참조하면 되겠다.

