FROM python:3

WORKDIR /usr/src/react-django-admin

COPY . .


RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["python", "./react_django_admin_backend/manange.py runserver"]