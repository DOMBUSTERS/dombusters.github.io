---
title: Sekiro
author: saturn
pubDate: 2024-10-15 
toc: true
share: true
ogImage: true
---

# Sekiro
![](../../assets/dom-images/logo.jpg)

## Description

Author: @HuskyHacks 

お前はもう死んでいる (Omae wa mou shindeiru)

## Solution

We're presented a game where we are supposed to counter the enemy's attack, hence the name Sekiro. After a bit of trial and error, we know that the possible moves are:

"advance", "strike", "retreat", and "block".

Knowing this, we can ~~steal~~ borrow what a teammate stated about all the counters, and then counter them accordingly.

```plaintext
advance -> retreat
strike -> block
retreat -> strike
block -> advance
```

Here's the script

```python
from pwn import *

r = remote('challenge.ctf.games', 32670)
while True:
    try:
        r.recvuntil(b'Opponent move')
    except EOFError:
        break
    move = r.recvline().decode().strip()[1:].strip() # yeah this is beautiful
    log.info(move)

    if move == "advance":
        r.sendline(b'retreat')
    elif move == "strike":
        r.sendline(b'block')
    elif move == "retreat":
        r.sendline(b'strike')
    else:
        r.sendline(b'advance')

r.interactive()
```

```bash
$ python3 sekiro.py
[+] Opening connection to challenge.ctf.games on port 30081: Done
[*] block
[*] retreat
[*] retreat
[*] block
[*] block
[*] advance
[*] retreat
[*] block
[*] block
[*] strike
[*] block
[*] strike
[*] Switching to interactive mode
Your move:


~~~~~~~~~~~~~~~~~~ 忍殺! ~~~~~~~~~~~~~~~~~~~~
flag{a1ae4e5604576818132ce3bfebe95de5}[*] Got EOF while reading in interactive
```

ggwp


---
**Dombusters**: _Writeup written by saturn_
