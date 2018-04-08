# -*- coding: utf-8 -*-
import os
import glob
import shutil
import sys
import ast
import getopt
import struct
import array

def fetchi18n():
	out_path	= os.getcwd()+'\lib\Tools\i18n'
	input_path	= os.getcwd()+'\lib\i18n\zh_CN\LC_MESSAGES'
	pofiles		= out_path+'\*.po'


	print("################i18n###################")	
	print("-----------------------------------")
	print("start msgfmt")
	for filename in glob.glob(pofiles):
		print("msgfmt "+filename)
		os.system("python "+out_path+"\msgfmt.py "+filename)
	print("end msgfmt")
	print("-----------------------------------")

	print("-----------------------------------")
	print("start copyfile")
	mofiles		= out_path+'\*.mo'
	for filename in glob.glob(mofiles):
		print("copyfile  "+filename)
		copyfile(filename, out_path, input_path)
	print("end copyfile")
	print("-----------------------------------")

# 收集静态文件
def collectstatic():
	os.system("python manage.py collectstatic --noinput")

def copyfile(real_name, out_path, input_path):
	if not os.path.exists(input_path):
		os.makedirs(input_path, 0777)
	shutil.copy2(real_name, input_path)


def main():
	#print(sys.argv[1:])
	fetchi18n()
	collectstatic()


if __name__ == '__main__':
    main()

