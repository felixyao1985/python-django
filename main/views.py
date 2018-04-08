# -*- coding: utf-8 -*-
import os
import sys
from django.shortcuts import render
from django.http import HttpResponse,HttpResponseNotFound,HttpResponseRedirect,JsonResponse,FileResponse
from django.template import loader
from lib.fun import switch
from lib.properties import i18n
from lib.config import Config

# Create your views here.
modTplPath = os.getcwd()+"/main/templates"

def manage(request):
	job		=  request.GET.get('job','index')
	username 	= request.GET.get('username')
	pwd 	= request.GET.get('pwd')
	context	= {'mod':'main','op':'manage','job':job,'optpl':modTplPath+'/manage.tpl','css':[],'js':[],'api':[]}

	for case in switch(job):
		if case('index'):
			context = vindex(context)
			break
		if case('map'):
			context = vmap(context)
			break
		if case('json'):
			context = vjson(context)
			return HttpResponse(context)
			break
		if case():#default
			return HttpResponse('{"mod":"page error"}')

	html =render(request, 'index.tpl', context)
	return html

def vindex(context):
	context['jobtpl'] = modTplPath+'/manage.index.tpl'

	return context

def vmap(context):
	context['jobtpl']	= modTplPath+'/manage.map.tpl'
	css					= ['main.css','map.css']
	js					= ['map.js']
	api					= ['http://api.map.baidu.com/api?v=2.0&ak=kIaNyERY2Q7gRkrBlEWZ49IwqXC9Kxq5',Config.defPath+'/javascript/ajaxPromise.js']
	context['css']		= css
	context['js']		= js
	context['api']		= api
	context['tpldicts']	= i18n('map')
	return context

def vjson(context):
	_str = '[{"id":61,"displayName":"\u4e0a\u6d77\u6f4d\u574a\u793e\u533a\u56db\u6751\u957f\u8005\u7167\u62a4\u4e4b\u5bb6","city":"\u4e0a\u6d77\u5e02","district":"\u6d66\u4e1c\u65b0\u533a","tel":"021-50870171","address":"\u4e0a\u6d77\u5e02\u6d66\u4e1c\u65b0\u533a\u6f4d\u574a\u56db\u6751459-460\u53f7\u4e00\u697c ","status":0},{"id":75,"displayName":"\u4e0a\u6d77\u95f5\u884c\u533a\u6885\u9647\u9547\u7231\u7167\u62a4\u957f\u8005\u7167\u62a4\u4e4b\u5bb6","city":"\u4e0a\u6d77\u5e02","district":"\u95f5\u884c\u533a","tel":"021-54321507","address":"\u4e0a\u6d77\u5e02\u95f5\u884c\u533a\u4e0a\u4e2d\u897f\u8def762\u53f7 ","status":1},{"id":102,"displayName":"\u4e0a\u6d77\u5f90\u6c47\u533a\u67ab\u6797\u8857\u9053\u656c\u8001\u9662","city":"\u4e0a\u6d77\u5e02","district":"\u5f90\u6c47\u533a","tel":"021-64167843","address":"\u4e0a\u6d77\u5e02\u5f90\u6c47\u533a\u5c0f\u6728\u6865\u8def440\u5f0422\u53f7\u7532","status":0},{"id":103,"displayName":"\u4e0a\u6d77\u95f5\u884c\u8398\u5e84\u5de5\u4e1a\u533a\u7231\u7167\u62a4\u957f\u8005\u7167\u62a4\u4e4b\u5bb6","city":"\u4e0a\u6d77\u5e02","district":"\u95f5\u884c\u533a","tel":null,"address":"\u4e0a\u6d77\u5e02\u95f5\u884c\u533a\u74f6\u5317\u8def467\u53f7 ","status":1},{"id":104,"displayName":"\u4e0a\u6d77\u534e\u9633\u793e\u533a\u8001\u5e74\u4eba\u65e5\u95f4\u670d\u52a1\u4e2d\u5fc3","city":"\u4e0a\u6d77\u5e02","district":"\u957f\u5b81\u533a","tel":"021-52379839","address":"\u4e0a\u6d77\u5e02\u957f\u5b81\u533a\u4e07\u822a\u6e21\u8def1286\u53f7","status":0},{"id":112,"displayName":"\u4e0a\u6d77\u771f\u5982\u793e\u533a\u7231\u7167\u62a4\u957f\u8005\u7167\u62a4\u4e4b\u5bb6","city":"\u4e0a\u6d77\u5e02","district":"\u666e\u9640\u533a","tel":"021-62166689","address":"\u4e0a\u6d77\u5e02\u666e\u9640\u533a\u771f\u5317\u8def1902\u5f041\u53f7","status":1},{"id":115,"displayName":"\u4e0a\u6d77\u6b27\u9633\u793e\u533a\u848b\u5bb6\u6865\u957f\u8005\u7167\u62a4\u4e4b\u5bb6","city":"\u4e0a\u6d77\u5e02","district":"\u8679\u53e3\u533a","tel":"021-56372352","address":"\u4e0a\u6d77\u5e02\u8679\u53e3\u533a\u848b\u5bb6\u6865\u8def15\u53f7","status":0},{"id":119,"displayName":"\u5e78\u798f\u5927\u5bb6\u56ed\u4e3a\u8001\u670d\u52a1\u4e2d\u5fc3","city":"\u676d\u5dde\u5e02","district":"\u62f1\u5885\u533a","tel":"0571-88036771","address":"\u676d\u5dde\u5e02\u62f1\u5885\u533a\u5927\u5173\u897f\u516d\u82d112\u680b6\u5355\u5143","status":1},{"id":120,"displayName":" \u4e0a\u6d77\u77f3\u5c9a\u793e\u533a\u5feb\u6377\u7ad9","city":"\u4e0a\u6d77\u5e02","district":"\u666e\u9640\u533a","tel":"021-52393177","address":"\u4e0a\u6d77\u5e02\u666e\u9640\u533a\u5c9a\u768b\u8def\u77f3\u5c9a3\u675192\u53f7","status":0},{"id":121,"displayName":"\u4e0a\u6d77\u7530\u6797\u8857\u9053\u65e5\u95f4\u7167\u62a4\u4e2d\u5fc3","city":"\u4e0a\u6d77\u5e02","district":"\u5f90\u6c47\u533a","tel":"021-64828835","address":"\u4e0a\u6d77\u5e02\u5f90\u6c47\u533a\u7530\u6797\u5341\u4e09\u675117\u53f7","status":1},{"id":123,"displayName":"\u5927\u5b81\u7ba1\u7406\u5e73\u53f0","city":"\u4e0a\u6d77","district":"\u95f8\u5317\u533a","tel":null,"address":"\u4e0a\u6d77\u95f8\u5317\u533a\u7ca4\u79c0\u540d\u90b8\u5c0f\u533a","status":0},{"id":124,"displayName":"\u4e0a\u6d77\u66f2\u9633\u8857\u9053\u65e5\u95f4\u7167\u62a4\u4e2d\u5fc3","city":"\u4e0a\u6d77\u5e02","district":"\u8679\u53e3\u533a","tel":"021-65521171","address":"\u4e0a\u6d77\u5e02\u8679\u53e3\u533a\u7389\u7530\u8def430\u53f7","status":1},{"id":125,"displayName":"\u4e0a\u6d77\u548c\u517b\u4e34\u6c7e\u517b\u8001\u9662","city":"\u4e0a\u6d77\u5e02","district":"\u95f8\u5317\u533a","tel":"021-61259098","address":"\u4e0a\u6d77\u5e02\u95f8\u5317\u533a\u6c7e\u897f\u8def360\u53f7","status":0},{"id":126,"displayName":"\u4e07\u91cc\u793e\u533a\u7231\u7167\u62a4\u957f\u8005\u7167\u62a4\u4e4b\u5bb6","city":"\u4e0a\u6d77\u5e02","district":"\u666e\u9640\u533a","tel":"021-62660816","address":"\u4e0a\u6d77\u5e02\u666e\u9640\u533a\u6b66\u5a01\u4e1c\u8def553\u53f7 ","status":1},{"id":127,"displayName":"\u4e0a\u6d77\u67ab\u6797\u793e\u533a\u7231\u7167\u62a4\u957f\u8005\u7167\u62a4\u4e4b\u5bb6","city":"\u4e0a\u6d77\u5e02","district":"\u5f90\u6c47\u533a","tel":"021-62660816","address":"\u4e0a\u6d77\u5e02\u5f90\u6c47\u533a\u4e1c\u5b891\u6751121\u53f7 ","status":0},{"id":129,"displayName":"\u4e0a\u6d77\u4e1c\u660e\u65b0\u6751\u5feb\u6377\u7ad9","city":"\u4e0a\u6d77\u5e02","district":"\u6d66\u4e1c\u65b0\u533a","tel":"021-62660816","address":"\u4e0a\u6d77\u5e02\u6d66\u4e1c\u65b0\u533a\u4e1c\u660e\u65b0\u675112\u53f7102\u5ba4 ","status":1},{"id":130,"displayName":"\u4e0a\u6d77\u53e4\u7f8e\u5feb\u6377\u7ad9","city":"\u4e0a\u6d77\u5e02","district":"\u95f5\u884c\u533a","tel":"021-62660816","address":"\u4e0a\u6d77\u5e02\u95f5\u884c\u533a\u4e07\u6e90\u8def\u5e73\u5357\u4e09\u675148\u53f7 ","status":0}]'
	return _str