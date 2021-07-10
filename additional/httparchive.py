# -*- coding: utf-8 -*-
"""
Created on Thu Jul  8 19:39:58 2021

@author: Hoerger
"""

import redis


import json
import urllib.parse

# Opening JSON file
f = open('data.json',)
r = redis.Redis()


# returns JSON object as
# a dictionary
data = json.load(f)

# r.set("google.de", '{"validation":{"isGreen":0}')
for entry in data:
    keytocheck = entry["url"]
    keytocheck = keytocheck.replace("www.","")
    redisresult = r.get(keytocheck)
    # print(redisresult)
    if (redisresult):
        r.set(keytocheck, '{"isGreen":1, "SpeedIndex": ' + str(entry["SpeedIndex"]) + ', "bytesTotal":' + str(entry["bytesTotal"]) + '}', 18144000)
        # print(r.get(keytocheck))
    else:
        r.set(keytocheck, '{"isGreen":0, "SpeedIndex": ' + str(entry["SpeedIndex"]) + ', "bytesTotal":' + str(entry["bytesTotal"]) + '}', 18144000)
        # print(r.get(keytocheck))
    # print(r.get(keytocheck))
    # print(keytocheck)
# Closing file
f.close()

# print("test")

#r.mset({"Croatia": "Zagreb", "Bahamas": "Nassau"})
# print(r.get("Bahamas"))
# print(r.get("laura"))


#1. alle json durchsuchen von jedem URL nehmen, davon den Hostname nehmen, gucken, ob in der DB ein Key mit der DB vorhanden ist
# wenn ja, dann size hinzufÃ¼gen, und pagespeed