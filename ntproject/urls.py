# -*- coding: utf-8 -*-
"""ntproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from mainFrame import views as mFviews
from main import views as mviews

urlpatterns = [
    url(r'^admin/', admin.site.urls),
	# ^$ 代表空，表示URL后面不输任何东西的时候调用此方法
	url(r'^$', mFviews.plan),
	url(r'main/^$', mviews.manage),
	url(r'main/manage/', mviews.manage),
]
