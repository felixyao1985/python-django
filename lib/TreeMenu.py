# -*- coding: utf-8 -*-
#!/usr/bin/env python
from fun import fetchArrayKey
from fun import is_dict
from fun import in_dict
from properties import i18n

class TreeMenu:
	arrTreeMenu		= {}
	arrTreeSubMenu  = {}
	TreeRole		= {}
	role			= ''
	i18ntree		= ''

	def __init__(self, role):
		self.role = role
		self.i18ntree		= i18n('tree')
		self.setMenuConfig()
		self.TreeRole['Privilege'] 		= fetchArrayKey(self.arrTreeSubMenu,1)
		self.TreeRole['SubPrivilege'] 	= fetchArrayKey(self.arrTreeSubMenu,2)
		self.TreeRole['TreePrivilege'] 	= fetchArrayKey(self.arrTreeSubMenu,4)
		self.TreeRole['FourPrivilege'] 	= fetchArrayKey(self.arrTreeSubMenu,6)


	def setMenuConfig(self):
		self.arrTreeMenu['menu-sys'] = {'name':self.i18ntree('sysManage')}
		self.arrTreeSubMenu['menu-sys'] = self.menuSys()

	def menuSys(self):
		childs					= {}
		tabTree					= {}
		childs['tab-sys-map']	= {'name':self.i18ntree('dataAnalysis'),'url':'/main/manage?job=map'}
		tabTree['tab-sys']		= {'name':self.i18ntree('dataAnalysis'),'url':'#','childs':childs}

		self.arrTreeSubMenu['menu-sys'] = tabTree
		return tabTree

	def getChilds(self,key,outDate,_def = {}):
		if(is_dict(outDate) and outDate.has_key(key)):
			childs 	= outDate[key]
		else:
			childs  = _def
		return childs

	def getMenu(self):
		strTreeMenu = ''
		if(is_dict(self.TreeRole['Privilege'])  and is_dict(self.TreeRole['SubPrivilege'])):
			for _key,_val in self.arrTreeMenu.items():
				if(in_dict(_key, self.TreeRole['Privilege'])):

					strTreeMenu += "<div title="+_val['name']+">"
					strTreeMenu += "<ul class='content-tree'>"

					for _key_sub,_val_sub in self.arrTreeSubMenu[_key].items():
						if(in_dict(_key_sub, self.TreeRole['SubPrivilege'])):
							let_name 		= _val_sub['name']
							let_url 		= _val_sub['url']
							let_childs 		= self.getChilds('childs',_val_sub)


							if(let_url == '#'):
								strTreeMenu += "<li isexpand='false'><span>"+let_name+"</span>"
								strTreeMenu += "<ul>"

								for _key_child,_val_child in let_childs.items():

									if(in_dict(_key_child, self.TreeRole['TreePrivilege'])):

										let_childname 	= let_childs[_key_child]['name']
										let_childurl 	= let_childs[_key_child]['url']
										let_childs2 	= self.getChilds('childs',let_childs[_key_child])
										print(let_childs2)
										if(let_childurl == '#'):
											strTreeMenu += "<li isexpand='false'><span>"+let_childname+"</span>"
											strTreeMenu += "<ul>"

											for _key_child2,_val_child2 in let_childs2.items():
												if(in_dict(_key_child, self.TreeRole['FourPrivilege'])):
													let_childname2 	= let_childs2[_key_child2]['name']
													let_childurl2 	= let_childs2[_key_child2]['url']
													strTreeMenu += "<li url='"+let_childurl2+"'><span>"+let_childname2+"</span></li>"
												else:
													strTreeMenu += ''
											strTreeMenu += '</ul>'
											strTreeMenu += '</li>'
										else:
											strTreeMenu +=  "<li url='"+let_childurl+"'><span>"+let_childname+"</span></li>"
									else:
										strTreeMenu += ''


								strTreeMenu += '</ul>'
								strTreeMenu += '</li>'
							else:
								strTreeMenu += "<li url='"+let_url+"'><span>"+let_name+"</span></li>"
						else:
							strTreeMenu += ''

					strTreeMenu += '</ul>'
					strTreeMenu += '</div>'
				else:
					strTreeMenu += ''
		else:
			strTreeMenu = ''

		return strTreeMenu