---
title: Keyboard Junkie
author: Sir_X_
pubDate: 2024-10-14
toc: true
share: true
ogImage: true
---

![](../../assets/dom-images/logo.jpg)

## Description
Author: @JohnHammond

My friend wouldn't shut up about his new keyboard, so...

## Solution
The challenge provided a .pcap file with numerous USB-related packets. Suspecting that these packets might contain keyboard press data, I sought a tool that could parse this information.

The tool I opted for was the ctf-usb-keyboard-parser. https://github.com/TeamRocketIst/ctf-usb-keyboard-parser

According to the tool's readme file, the first step is to filter out the pertinent packets from the entire packet capture file and store them in a new .pcap file.   
This can be done using the following command:

`tshark -r ./keyboard_junkie -Y 'usb.capdata && usb.data_len == 8' -T fields -e usb.capdata | sed 's/../:&/g2' > keyboard.pcap`

Following this, we then use our tool to interpret what was typed.
```
python3 usbkeyboard.py keyboard.pcap
so the answer is flag{f7733e0093b7d281dd0a30fcf34a9634} hahahah lol
```
Voila! That gives us our flag.  

Flag: `flag{f7733e0093b7d281dd0a30fcf34a9634}`

---
**Dombusters**: _Writeup written by Sir_X_
