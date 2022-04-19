# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django.contrib import admin
from django.urls import path, include  # add this
from apps.home import views

urlpatterns = [
    path('admin/', admin.site.urls),          # Django admin route
    path("", include("apps.authentication.urls")), # Auth routes - login / register
    path("", include("apps.home.urls")),             # UI Kits Html files
    path('user_unix/', views.user_unix, name='user_unix'), # User Unix python script
    path('samba/', views.samba, name='samba'), # samba python script
    path('directories/', views.directories, name='directories'), #directory python script
    path('group_unix/', views.group_unix, name='group_unix'), #group_unix python script
]
