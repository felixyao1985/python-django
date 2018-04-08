# -*- coding: utf-8 -*-
import os
from django.shortcuts import render
from lib.TreeMenu import TreeMenu
# Create your views here.

def plan(request):
	treeMenu	= TreeMenu('admin')
	context		= {'Tree':'tree','treeMenu':treeMenu.getMenu()}
	return render(request, 'mainFrame.tpl', context)

