from urllib import request
from django.shortcuts import render, redirect
from .models import Post
from django.contrib import auth
from django.contrib.auth.models import User



def signup(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        sameUser = User.objects.filter(username = username)
        if len(sameUser):
            error = '이미 아이디가 존재합니다'
            return render(request,'signup.html', {'error': error})

        new_user = User.objects.create_user(username = username, password = password)
        auth.login(request, new_user)
        return redirect('home')    
    return render(request,'signup.html')


# Create your views here.
def login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = auth.authenticate(request, username = username, password = password)
        if user is not None:
            auth.login(request,user)
            return redirect('home')
        error = "아이디 또는 비밀번호가 틀립니다"
        return render(request, 'login.html', {'error': error})
    return render(request, 'login.html')


def logout(request):
    auth.logout(request)
    return redirect('home')




def home(request):

    posts = Post.objects.all()
    return render(request, 'index.html', {'posts':posts})


def new(request):
    if request.method == 'POST':
        newpost = Post.objects.create(
            title = request.POST['title'],
            content = request.POST['content'],
            cover = request.POST['cover'],
            back = request.POST['back'],
            author = request.user
        )
        return render(request, 'index.html')
    return render(request,'new.html')


def detail(request, post_pk):
    post = Post.objects.get(pk = post_pk)
    return render(request, 'detail.html', {'post':post})
