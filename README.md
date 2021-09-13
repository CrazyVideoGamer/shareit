# How it's going to work:
1. select file/folder to share
3. run express app with & to run as a background process. Make sure to print the PID. note that only one folder can be shared at a time
4. use port forwarding (most likely my own server, although ngrok works) to host file/folder on the web
5. Finallly, on a separate computer, run wget -r http://RANDOM_ID.some_site/, or wget http://RANDOM_ID.some_site/ to download the folder/file

## how port forwarding could work

1. We get the global IP adress of the user, then we do something like 
```
app.get("/:url", (req, res) => {
  res.send(`${IP}:${local_port}/${req.params.url}`) // this doesn't actually work
})
```

2. SSH connection? - https://superuser.com/questions/1345341/ssh-local-port-forwarding-to-a-website

## how to download all the files from the web
Just use wget like so:
`wget -q --show-progress --content-disposition -r https://shareit.crazyvideogamer.repl.co/route`

Note: the `--content-disposition` is for files. It doesn't do anything when a directory was uploaded. What it does is that when downloading a file, we get the actual filename instead of "download"

Note 2: the `-q --show-progress` is for hiding most of the prints

Or use curl like so:
`curl `


### TODO:
maybe split the folder server and the main application into 2 repositories?

check links

1. https://www.google.com/search?q=port+forward+node&rlz=1CAJIKU_enUS923US923&ei=ye06Yau8K8_N_AaB7aigDw&oq=port+forward+node&gs_lcp=Cgdnd3Mtd2l6EAMyBQgAEIAEMgUIABCABDIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjIGCAAQFhAeMgYIABAWEB46BwgAEEcQsANKBAhBGABQ3CpYuy5g4DBoAXACeACAAfUBiAHnBZIBBTAuMi4ymAEAoAEByAEIwAEB&sclient=gws-wiz&ved=0ahUKEwjrxOz21vPyAhXPJt8KHYE2CvQQ4dUDCA4&uact=5&safe=active&ssui=on

2. https://gist.github.com/462720/544868b1c9bc51a0205b1a4af5f6ab1322008afa

3. https://gist.github.com/sqren/2d9639ad228ccb051a9da752c8c70c66