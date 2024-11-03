---
title: OceanLocust
author: Sir_X_
pubDate: 2024-10-5
toc: true
share: true
ogImage: true
---

![](../../assets/dom-images/logo.jpg)

## Description
Author: @JohnHammond

Wow-ee zow-ee!! Some advanced persistent threats have been doing some tricks with hiding payloads in image files!

We thought we would try our hand at it too.

## Solution
I have to admit, I wasted a lot of time on this one, making the attempt to reverse engineer the binary. Obviously, considering this is a reverse engineering challenge. But in the end, I solved it fully dynamically, with the good old trial and error. It's possibly not the most efficient method but eventually, I got the flag...

Since we have the binary that encoded the flag into the image and can execute it ourself to encode new data into an image of our choosing I tried to figure out what exactly changed when creating an image. Thus, I made an empty PNG image for myself to serve as a source. I then encoded a flag from a challenge I'd done before. This was simply to have a similar amount of data as I would expect. However, upon comparing, it seemed that the whole image, apart from the PNG header, had changed. This wasn't of much help. Even when encoding the same flag in the identical source image several times, there were major differences each time.

To me, this seemed more like a steganography challenge now. Accordingly, I turned to the "CTF Image Steganography Checklist" and started going through the steps listed there. https://georgeom.net/StegOnline/checklist

Point 5 instructs us to execute pngcheck -vtp7f filename.png, which I did.
```
pngcheck -vtp7 1_encoded_empty.png            
zlib warning:  different version (expected 1.2.13, using 1.3.1)

File: 1_encoded_empty.png (181 bytes)
  chunk IHDR at offset 0x0000c, length 13
    1 x 1 image, 32-bit RGB+alpha, non-interlaced
  chunk biTa at offset 0x00025, length 5
    unknown private, ancillary, safe-to-copy chunk
  chunk biTg at offset 0x00036, length 5
    unknown private, ancillary, safe-to-copy chunk
  chunk biTh at offset 0x00047, length 5
    unknown private, ancillary, safe-to-copy chunk
  chunk biTb at offset 0x00058, length 5
    unknown private, ancillary, safe-to-copy chunk
  chunk biTe at offset 0x00069, length 5
    unknown private, ancillary, safe-to-copy chunk
  chunk biTc at offset 0x0007a, length 5
    unknown private, ancillary, safe-to-copy chunk
  chunk biTf at offset 0x0008b, length 5
    unknown private, ancillary, safe-to-copy chunk
  chunk biTd at offset 0x0009c, length 5
    unknown private, ancillary, safe-to-copy chunk
  chunk IEND at offset 0x000ad, length 0:  no IDAT chunks
ERRORS DETECTED in 1_encoded_empty.png
```

Those biT* chunks seem a bit weird. They are present in every image I generate but are almost always ordered differently. Also they don't seem to be default chunks of PNG files. As my online research didn't really tell me anything about them. So i dug deeper into those chunks trying to figure out what they are doing. Next I try to encode only "A" characters in the length of a flag (38) to see where exactly our data is stored. But the data just seems to be random in there, since I don't find my expected pattern of 38 identical hex chars. Therefore I guess our content has to be encrypted in some form.
To figure out what is going on I try to use the magic receipt of CyberChef. But first to extract the chunks i used the online tool [png-file-chunk-inspector](https://www.nayuki.io/page/png-file-chunk-inspector). 
For example the chunk of biTa would give us a byte sequence looking like this: `00 00 00 05 62 69 54 61 23 28 15 20 9d c5 69 88`. Where the first 8 bytes would be identical for all of the biT* chunks. Therefore they are probably irrelevant when we try to find the string encoded in them. After those we got a couple of bytes that likely contain our data. Because for the last 4 bytes the chunk inspector tells us that it's the CRC Checksum. In the previous example our data is stored in the following bytes: `23 28 15 20` and that across all the biT* sections. When only pasting this data into the magic receipt of CyberChef, the chunks sorted alphabetically by the biT* character, we get a hit on the xor encryption.  Where the used key is defined as `0x41` but the decrypted text is just some gibberish "biTabbiTbbbiTcbbiTdbbiTebbiTfbbiTgbbiT" that looks similar to the chunk names. And now we get to the part where I wasted way too much time, until i remembered what xor is. With the Key `0x41` I didn't find the actual XOR key used by the application to encode our data but the character I entered for encoding. Therefore the gibberish string I got has to be the XOR Key used to encrypt the data. 

Let's try it on the image we got that contains the actual flag. All the extracted chunks are as follows:
```
a: 00 00 00 05 62 69 54 61 04 05 35 06 19 9d c5 69 88	
b: 00 00 00 05 62 69 54 62 04 0c 37 5a 55 0c b9 9f 21	
c: 00 00 00 05 62 69 54 63 01 5f 6d 53 00 7d 55 d6 ec	
d: 00 00 00 05 62 69 54 64 5a 0c 37 5c 06 f9 fb aa 5e	
e: 00 00 00 05 62 69 54 65 54 5c 36 5d 00 b7 20 36 7b	
f: 00 00 00 05 62 69 54 66 00 58 64 03 07 a6 21 a5 2e	
g: 00 00 00 05 62 69 54 67 55 0b 36 51 57 c8 e8 02 80	
h: 00 00 00 05 62 69 54 68 06 59 29 c2 c8 0a af 71 26	
```
Extracting the relevant bytes and therefore excluding the chunks starts that likely define the chunk itself and the checksum at the end we get the following data:
```
04 05 35 06 19
04 0c 37 5a 55
01 5f 6d 53 00
5a 0c 37 5c 06
54 5c 36 5d 00
00 58 64 03 07
55 0b 36 51 57
06 59 29
```
And we get our flag printed out nicely. [CyberChef Receipt](https://gchq.github.io/CyberChef/#recipe=From_Hex('Auto')XOR(%7B'option':'UTF8','string':'biTabbiTbbbiTcbbiTdbbiTebbiTfbbiTgbbiT'%7D,'Standard',false)&input=MDQgMDUgMzUgMDYgMTkKMDQgMGMgMzcgNWEgNTUKMDEgNWYgNmQgNTMgMDAKNWEgMGMgMzcgNWMgMDYKNTQgNWMgMzYgNWQgMDAKMDAgNTggNjQgMDMgMDcKNTUgMGIgMzYgNTEgNTcKMDYgNTkgMjk&oeol=FF)

Flag: `flag{fec87c690b8ec8d65b8bb10ee7bb65d0}`

---
**Dombusters**: _Writeup written by Sir_X_
