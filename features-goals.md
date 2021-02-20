# Features
* Have user accounts with a profile picture, bio, username, first and last name, and optionally location.
* Add the ability to change pfp, first and last name, and location
* Match users using an algorithm that takes into account last names, mutual friends, and location gathered through IP.
* Add friends
* Create posts that have pictures and a caption
* Comment on and like posts
* Respond to and interact with comments
* Change privacy settings (set your posts to private)
* Change password by getting an email link
* Get an email link on sign up to confirm email
* See a feed of posts made by friends and sort by date
* Implement a permissions system with varying levels
* Allow sharing with the propper metadata to display right on other apps

# Optional
* Use websockets to allow for real time text chat

# Ideas for implementation
* Use a storage bucket such as S3 or something to serve photos
* Fetch the user from the DB alongside each request, use the auth level gained from this call to determine whether they have access
* Use CSRF tokens in every form
* Create "pluggable" validators for text feilds that can be reused
* Create a util folder in root with the index.js being broken down (so things that interfact with the database might be db.[function-here])

# Current Project
## Implement a login system
* Create all the nessessary things to log in. Including authentication, database connections, pages, error handling, etc..
 - Create API route for checking if username or password already exist so the user can get immediate feedback