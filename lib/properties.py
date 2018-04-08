# -*- coding: utf-8 -*-
import gettext
import locale
from lib.fun import switch
from main.dict.propertiesmap import i18nmap
from lib.log import traceback_log
from lib.config import Config

'''
获取当前系统的语言

language,encoding= locale.getdefaultlocale()

其中"lang"为国际化文件的名字，
"./locale"为文件路径，
其中获取到language的值为"./locale"的子目录，即”./locale/zh_CN“（这里为中文系统，所以获取的language=zh_CN）
而且要按照gettext预定到的文件目录，还要新建LC_MESSAGES文件夹，并将lang.mo放入该文件夹下

es = gettext.translation('tree','./lib/i18n', languages=[language]).install(True)
'''

def i18n(mo):
	try:
		language, encoding = locale.getdefaultlocale()
		es = gettext.translation(mo, Config.i18nPath, languages=[language])
		ret = es.ugettext
	except:
		traceback_log()
		es = gettext.translation(mo, Config.i18nPath, languages=['zh_CN'])
		ret = es.ugettext

	for case in switch(mo):
		if case('map'):
			return i18nmap(ret)
			break
		if case():#default
			return ret


