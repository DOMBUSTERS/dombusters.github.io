---
title: # TXT Message
author: Sir_X_
pubDate: 2024-10-6
toc: true
share: true
ogImage: true
---

# TXT Message

<p align="center">
  <img src="../../images/logo.jpg" alt="Dombusters" width="25%">
</p>

## Description
Author: @JohnHammond

John Hammonds has added some peculiar DNS records to the ctf.games domain. Could one of them be hiding something of interest?

## Solution
Given a domain and the challenge's title suggesting a TXT message, it's likely that a TXT DNS record for the domain contains the information we're seeking. We can inspect the TXT DNS records of this domain using the `dig` tool. 

```
% dig ctf.games txt

; <<>> DiG 9.10.6 <<>> ctf.games txt
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 44119
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232
;; QUESTION SECTION:
;ctf.games.			IN	TXT

;; ANSWER SECTION:
ctf.games.		3600	IN	TXT	"146 154 141 147 173 061 064 145 060 067 062 146 067 060 065 144 064 065 070 070 062 064 060 061 144 061 064 061 143 065 066 062 146 144 143 060 142 175"

;; Query time: 1502 msec
;; SERVER: 162.252.172.57#53(162.252.172.57)
;; WHEN: Fri Oct 11 13:35:16 CEST 2024
;; MSG SIZE  rcvd: 202
```

The TXT record seems to contain a series of numbers that resemble ASCII codes.

We use the online Cipher Identifier tool at [Dcode](https://www.dcode.fr/cipher-identifier) to confirm our suspicion. Indeed, the TXT record matches highest with ASCII code. Upon pasting the record in the [ASCII code decoder](https://www.dcode.fr/ascii-code), the flag reveals itself in the `OCT` decoder result.

Flag: `flag{14e072f705d45882401d141c562fdc0b}`

---
**Dombusters**
_Writeup written by Sir_X_
