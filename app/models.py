from tkinter import CASCADE
from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Post(models.Model):
    
    # 제목
    title = models.CharField(max_length=30)
    # 내용
    content = models.CharField(max_length=200)
    #cover
    cover = models.ImageField(upload_to="cover/", blank = True)
    #back
    back = models.ImageField(upload_to="back/", blank = True)

    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')




