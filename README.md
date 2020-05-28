
# CLONE 후 필요 작업 내역

1. ENV 설정
    1. pipenv 미 존재 시 설치
    1. > python -m pip install --upgrade pip
    1. > pip3 install pipenv
    1. 또는 > pip intall pipvenv
1. env 설치
    1. > pipevn install
    1. 버전설정 가능
    1. > pipenv install --two or --three ...
1. env 실행
    1. pipenv shell
1. interpreter 선택
    1. ctrl + shift + p -> python: select interpreter
    1. env 선택
1. sqllite3 데이터베이스 파일을 ignore 할 것인가 말것인가...??
1. ignore 시 데이터베이스 마이그레이트 필요
    1. > py manage.py migrate
    1. migrate 앱들에 대한 테이블 없을 경우 같이 생성 되니 makemigrations 까지 해 줄 필요는 없다.
1. start server
    1. > py manage.py runserver
    1. 구동 성공 

# create .gitignore
1. vscode gitignore extension install
1. ctl + shift + p : enter the pattlet

# react_django_admin
backend side : django , frontend side : react

# 참조 사이트
https://www.django-rest-framework.org/
https://www.youtube.com/watch?v=Uyei2iDA4Hs&t=245s

# git repository
https://github.com/andurogit/react_django_admin.git

# 제 2장 Start

https://www.youtube.com/watch?v=GieYIzvdt2U

# 다른 환경에서 구동해 보기

