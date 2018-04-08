# -*- coding: utf-8 -*-

from django.shortcuts import render
from django.http import HttpResponse,HttpResponseNotFound,HttpResponseRedirect,JsonResponse,FileResponse
from django.template import loader
from .models import NtMap

# Create your views here.

def hello(request):
	return HttpResponse('<html>hello world</html>')

def showMap(request):
	tpl			= loader.get_template('map.html') #页面模板
	maps		= NtMap.objects.all() #查询数据库
	context		= {'map':maps,'title':"数据展现"}
	html		= tpl.render(context)
	return HttpResponse(html)

def showBaiduMap(request):
	tpl			= loader.get_template('map_bd.html') #页面模板
	maps		= NtMap.objects.all() #查询数据库
	context		= {'map':maps,'title':"数据展现"}
	html		= tpl.render(context)
	return HttpResponse(html)