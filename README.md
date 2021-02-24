# Social Media Site

## Description
This is a simple social media website. You can make an account and then connect with other users, make image posts, make friends, and imteract with posts. Its built on Express with MongoDb as the database and EJS as a templating engine.

## Framework(s)/Package(s)
* ExpressJs
* EJS
* Semantic UI
* Mongoose 

## What I learned
* Better ways to do input validation
* How to protect routes
* Better error handling
* A better understanding of Express and the HTTP protocol.

## Challenges
 * Making input validation consistent on the server and the client. To solve this problem I used the validator package and used the same checks on the client and the server. This creates a better user experience (they get client side validation while filling out the form). It also decreases server load because the client will prevent invalid forms from getting sent to the server. However, because any data can be sent to the server, the server still validates. 
 * Authorization - For authorization I created a ```checkAuth``` middleware. By default, users get an auth level of 10, which allows them to use the site as a normal user. An auth level of 100 would give a user total access to any page. 
