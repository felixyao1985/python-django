# -*- coding: utf-8 -*-
# 公共资源
from django.conf import settings as original_settings
from lib.config import Config 

def settings(request):
    print('felix-config')
    print(Config)
    return {'settings': original_settings,'Config': Config}
