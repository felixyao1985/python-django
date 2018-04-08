# -*- coding: utf-8 -*-
from lib.config import Config
import traceback

def traceback_log():
    file_object=open(Config.logPath + '/' + Config.errorlog,'w+')
    traceback.print_exc(file=file_object)
    file_object.flush()
    file_object.close()


def log(filename,text):
    file_object = open(Config.logPath + '/' + filename, 'w+')
    file_object.write(text)
    file_object.flush()
    file_object.close()




