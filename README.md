# Twitter-Login-with-NodeJS
Connect your NodeJS app with twitter login using passport, express 

This app is client side application for posting small person blogs. I am currently working on this repo.

# Packages Used
- express
- path
- morgan
- bodyParser 
- MongoClient
- Passport

#### Twitter Consumer key, Secret credentails are obtained from twitter's developers account. 

#### start with 
```sh
npm init

```

### and install all the dependencies using npm to successfully run this app
```sh
npm i name_of_package

```



## Make these changes:
- In the twi.js file, Connection_URL string is obtained from your MONGO DB Atlas account. Go to your account->clusters->connect->In an application-> copy the string.
- You need to add your password in the CONNECTION_URL string, which is your ATLAS PASSWORD.
- I have used a constant variable DATABASE_NAME because I had just one database. You are allowed to use it as you go.
- TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET are used to authenticate your app with twitter server


### To run the app
```sh
Windows:

D:\path_to_directory> npm start

```

#### Open the browser and input the following url:

```sh
http://127.0.0.1:3000/

```



You can check the input in your atlas cluster or write a new app.get() method to display the data from the database

```sh
app.get('/data', function(req,res)=>{
  ##code to print the data
});

```

For any doubts: drop in www.facebook.com/rachithatesyou
