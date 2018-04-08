# python-django

貌似在WIN有问题，是个坑懒得去解决了，在linux下运行OK。

该范例中一样使用了模板语言，django只起到一个路由作用，页面的交互和数据都通过js来实现

sudo apt-get install python-pip

sudo pip install Django

sudo apt-get install ipython


Win

pip install virtualenvwrapper-win


建立新的项目

django-admin.py startproject project-name

django 
	生成需要翻译的文件

		python manage.py makemessages -l zh_hans

		python manage.py makemessages -l zh_hant

	编译

		python manage.py compilemessages

python  i18n

	python pygettext.py

	python msgfmt.py xx.po




