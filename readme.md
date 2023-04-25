
# Ziggo Connectbox V2 (Sagemcom F3896LG) reversed API.

The Connectbox V2 Sagemcom API reversed in order to find devices by hostname or get a list of all hosts connected to the network.
Sharing this because it may help others that were struggling doing the same as I was.
Check out #Experimenting documentation to see why I started playing around with this project.
This may prove totally useless but I guess it's interesting in a way haha.


## REST Endpoints
### `POST:`[`Login`](http://192.168.178.1/rest/v1/user/login)
For the vast majority of the REST API you'll need to authenticate yourself through the login, luckily this is merely just a JSON body with the password parameter.
JSON body example: 
```json
{
	"password": "WhichEverPasswordHere123?"
}
```

### `GET:`[`Hosts`](http://192.168.178.1/rest/v1/network/hosts?connectedOnly=true)
**Login required!**
This returns the hosts back to the consumer and you're able to add `?connectedOnly=true` to show connected only, this is better because in some cases it may return older devices that share the same hostname and it makes it a bit puzzling sometimes.

## Experimenting documentation
I started working on this because of the mere fact that my camera is not able to be detected through Windows for some reason. I can't even find it by MAC address and I've tried a whole bunch of modules that ended up wasting my time and not working.
I started looking into my modem, which is a brand new one that we're offering with the internet service nowadays, and if there was a way to actually get the hosts list as provided by the admin panel.

Luckily as soon as I entered the password in, I found everything I needed and right on the homepage too!
From here I just went through everything and ended up falling over some hiccups every once in a while as the token does not expire without logging out, so you'll be stuck on a page where it errors out when logging in because "someone else is already active in the dashboard".

