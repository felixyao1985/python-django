# -*- coding: utf-8 -*-
import os

class Config:
	defPath  	= '/static' #公共静态目录
	logPath 	= os.getcwd()+'/lib/log'
	i18nPath 	= os.getcwd()+'/lib/i18n'
	errorlog 	= 'error.log'
	# @staticmethod 静态方法装饰器#