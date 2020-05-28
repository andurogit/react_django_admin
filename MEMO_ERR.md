# 오류 해결 법 unresolved import warning
1. vscode 실행
2. Ctrl + Shift + P
3. "Configure Language Specific" 입력, 엔터
4. "Python" 선택 --> settings.json 열림
5. python.jediEnabled:false --> true or python.jediEnabled --> false,

# pylint 에서 못 읽을 경우

model py 에서
class 에 objects = models.Manager() 추가