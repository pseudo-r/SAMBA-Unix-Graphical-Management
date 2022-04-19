# -*- encoding: utf-8 -*-

from django.urls import path, re_path
from apps.home import views

urlpatterns = [
    # The home page
    path('', views.index, name='home'),
    # test fuction
    path('user_unix/', views.user_unix, name='user_unix'),
    path('samba/', views.samba, name='samba'),
    path('directories/', views.directories, name='directories'),
    path('group_unix/', views.group_unix, name='group_unix'),
    # Matches any html file
    re_path(r'^.*\.*', views.pages, name='pages'),
]

