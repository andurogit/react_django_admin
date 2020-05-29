# 제 2장 react 적용 하기

# 초기 설치

1. 가상환경 실행하고
   1. > pipenv shell
1. frontend 앱 생성
   1. > py manaage.py startapp frontend
1. 앱 안에 컴포넌트들을 넣기 위한 폴더생성
   1. > mkdir -p ./frontend/src/components ( mac )
   1. > md frontend\src\components ( cmd )
1. staic, templates 폴더 생성 및 하위 frontend 폴더 생성
   1. > mkdir -p ./frontend/{static, templates}/frontend ( mac )
   1. > md frontend\static\frontend;frontend\templates\frontend ( cmd )
1. package.json 생성
   1. npm init -y
   1. npm upgrade 하래서 함 > npm install -g npm
1. webpack 설치
   1. i : install
   1. -D : DevDependency
   1. > npm i -D webpack webpack-cli
1. gitignore 추가 node_modules
1. bable 설치
   1. npm i -D @babel/core babel-loader @babel/preset-env @babel/preset-react babel-plugin-transform-class-properties
1. react 설치
   1. npm i react react-dom prop-types
1. bable 설정
   1. root 폴더에 .babelrc 파일 생성
   1. 해당 파일에 플러그인 과 프리셋 설정
   1. 해당 파일은 json 형태 이다.
1. webpack 설정
   1. root 폴더에 webpack.config.js 파일 생성
   1. 설정 파일도 javascript 이기 때문에 commonJs 문법으로 test , exclude, loader 설정
1. package.json 실행 파일 설정
   1. 이 부분은 node.js 영역
   1. "test" : ... 부분을 "dev" : ... 으로 변경
   1. ... -> "webpack --mode development ./react_django_admin_backend/frontend/src/index.js --output ./react_django_admin_backend/frontend/static/frontend/main.js"
   1. build scripts 추가
   1. "build": "webpack --mode production ./react_django_admin_backend/frontend/src/index.js --output ./react_django_admin_backend/frontend/static/frontend/main.js"
   1. 사족을 달자면 package.json -> scripts 에 기술 된 명령어들은 > npm run dev 와 같이 실행 가능 하다.
   1. 설정을 설명하자만 src/index.js 는 es6든 commonJs 든 코딩 된 js를 static/frontend/main.js 로 예전 버전 js에서도 읽을 수 있는 코드로 컴파일 해준다. 이것이 webpack에 역할이다.
   1. webpack 에 설정은 이보다 매우 어려운 것으로 알고 있고 스터디가 많이 필요한 영역이다.

# 대문 만들기

1. index.js
   1. webpack 에서 기술 했듯이 소스 js는 src/index.js 이다.
   1. 이 파일이 현재 없으므로 생성 한다.
   1. ... frontend/src/index.js
      1. index.js 에서는 component에 App.js를 가져 온다.
      1. import App from './components/App';
   1. ... frontend/src/components/App.js 생성
      1. 해당 파일에 본격적으로 react 를 사용한다.
      1. react , react-dom 을 import 하고
      1. 제목 테그를 불러 올 수 있도록 render 함수를 이용해 코딩 한다.
   1. react 를 불러올 수 있는 대문 페이지를 생성한다.
      1. ...\_backend/frontend/templates/frontend/index.html
      1. wow ... 빈 파일 안에 ! 를 입력하고 엔터를 누르면 기본적인 html 코드가 자동으로 입력 된다
         1. vscode 에 기능인거 같다.
      1. body 안에 app id를 가진 div 태그하나를 생성해 주고
      1. react script 를 선언해 준다.
         1. <script src="{% static "frontend/main.js" %}"></script>
         1. static 은 장고에서 지원하는 문법으로 추후에 npm dev 로 webpacking 되면 읽어 들일 수 있을 것이다.
      1. css가 귀찮으니 이 영상에서는 bootstrap을 이용한다.
      1. bootswatch.com 에서 대충 아무거나 갖다 끼운다.
         1. 원하는 것을 고르고 크롬기준 downlaod 버튼을 새창에서 띄우면 받아지는게 아니라 새탭에서 소스를 볼 수 있는데
         1. 이 주소를 index.html 에 link 해준다.
         1. vscode는 정말 유용한 툴이다. html 에서 link 입력 후 tab 을 누르면 자동 완성 된다.
         1. 복사한 주소를 href 에 넣어주자.
      1. bootstrap 이니까 jquery도 넣어야 겠다.
         1. http://getbootstrap.com/ 으로 이동 후
         1. Get started Js 부분에 3개에 script 를 가져 온다.
         1. bootstrap 탈 jquery 한다고 들었는데 아직 아닌가 보다.

# django 연동

1. 메인 app settings에 frontend app을 등록 해주자
1. frontend 에 views 파일에 렌더링 할 index.html 을 코딩 해 주자
1. frontend 에 urls.py을 생성 해주고 메인 app 과 연결 할 준비를 해주자
   1. 위에서 코딩한 views 와 django.urls 에 path를 가져오고 urlpatterns 에 기본 패턴을 index.html 을 바라 볼 수 있도록 하자.
   1. main app urls.py 에 path('',include('frontend.urls')) 를 추가 하자
   1. 여기서 드는 의문은 '' root request에 frontend 와 leads 두개에 패턴이 존재하는데 이게 충돌이 나지 않을까?

# 구동 test

1. 기본 테스트로 코딩 된 js를 webpack 으로 컴파일 한다.
   1. root 폴더에서
   1. > npm run dev
   1. 초반에 설정한 webpack 에 의해 static/frontend/main.js 로 컴파일 된다.
1. 이상없이 컴파일이 되면
1. django 프로젝트 폴더로 이동하여
   1. > py manage.py runserver
   1. http://localhost:8000 으로 접속하여
   1. index.html 에 렌더링 될 App.js 에서 입력 된 return <h1>React App</h1>; 요부분이 출력 되면 성공이다.
1. django 구동 runserver 중에 오류가 발생했다.
   1. 살펴보니 rest_framework 가 없다고 하는 듯 하다.
   1. 가상환경을 안 띄워놓고 해서 그렇다.
   1. > pipenv shell
   1. webpack 컴파일 때문에 두 개에 cmd 창을 띄워놓고 하나는 npm 컴파일용 하나는 django 서버구동용으로 하면 좋다.
1. 페이지 오류 발생
   1. Component 를 찾을 수 없단다.
   1. import React from 'react'; -> import React, { Component } from 'react';
   1. 해결 됨

# 페이지 layout

1. 구성을 위해 frontend/src/components/ layout 폴더 생성
1. 해당 폴더에 Header.js 생성
1. bootstrap 에서 nav 를 가져옴 ( 이 아조씨 부트스트랩 엄청 좋아하시넹... )
   1. https://getbootstrap.com/docs/4.5/components/navbar/
   1. 소스를 뜯어다가 Header.js 에 가공한다.
   1. react 에서는 class -> className 으로 인식하므로 변경해준다
   1. vscode 에서 단어를 ctrl + f 로 선택해 놓은다음 ctrl + d 로 순차 선택이 되니 참조 바란다. 수정할 때는 ctrl + f 를 풀기 위해 esc 한번 해주고 수정한다.
   1. 불필요한 테그들은 삭제 해주고
   1. navbar-expand-lg 요게 햄버거란다. navbar-expand-sm 으로 수정
1. App.js 로 이동해서 Header를 import 해 보자
   1. 기존 <h1> App react </h1> 를 import 한 (<header />) 로 바꿔준다.
1. 여기서 계속 webpack을 rebuild 해주면서 하는 작업에 의문점이 들 것을 고려 하여 하나의 작업을 해준다.
   1. package.json -> scripts -> dev 영역에
   1. --watch 옵션을 하나 주면 소스가 수정 될 때마다 자동 반영 된다.
   1. webpack --mode development --watch .....

# leads pages

1. 영상에서 leads 라는 application이 있고 이를 컨트롤 하기 위한 파일 3개를 만든다.
1. 파일 생성
   1. components 폴더안에 leads 라는 폴더를 생성하고
   1. Dashboard.js, Form.js, Leads.js 총 3개에 파일을 생성 한다.
1. Form, Leads 에 기본 소스를 생성하고 ( rec + tab ) h1 테그로 일단 제목만 입력 해준다.
1. Dashboard 에는 rcf + tab 을 이용하여 함수형 react 기본소스를 생성 한다.
   1. 여기에는 Fragment 를 사용한다. 뭐 파편이라는 뜻을 가지고 있긴한데...
   1. 부모 테그를 <div> 로 감싸지 않고 자식 테그를 반환해야 할 경우 사용하면 되겠다.
1. App.js 도 최상위 테그가 div 가 되면 문제가 생길 수 있으니 Fragment로 감싸준다.
   1. Frgment 태그 안에 Header 와 Dashboard 컴포넌트를 넣어주고
   1. Dashboard는 container class에 감싸주자
   1. tips : div 테그 만들기
      1. .container + tab 하면 자동 div로 클래스네임이 박힌 소스를 반환해 준다. ( x 방법을 못 찾...)

```

```
