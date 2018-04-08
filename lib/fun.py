# -*- coding: utf-8 -*-

class switch(object):
    def __init__(self, value):
        self.value = value
        self.fall = False
    def __iter__(self):
        """Return the match method once, then stop"""
        yield self.match
        raise StopIteration
    def match(self, *args):
        """Indicate whether or not to enter a case suite"""
        if self.fall or not args:
            return True
        elif self.value in args: # changed for v1.5, see below
            self.fall = True
            return True
        else:
            return False


def fetchArrayKey(outData,outLevel = 1,outStock = {}):

	newData 	= outStock
	newKey 		= len(outStock)
	for key,value in outData.items():
		if outLevel > 1:
			#typeData	= type(outData[key])
			if(is_dict(outData[key])):
				newData = fetchArrayKey(outData[key], outLevel-1, newData);
		else:
			newData[newKey] = key
			newKey+=1
	return newData;

def is_dict(outData = {}):
	if(isinstance(outData, (dict)) and len(outData)>0):
		return True
	else:
		return False

def in_dict(value,outData = {}):
	if(isinstance(outData, (dict)) and len(outData)>0):
		for _key,_val in outData.items():
			if(_val == value):
				return True
		return False
	else:
		return False
