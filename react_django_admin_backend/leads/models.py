from django.db import models

# Create your models here.

class Lead(models.Model):
    objects = models.Manager() # pylint 에서 못 읽을 경우 사용
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    message = models.CharField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)