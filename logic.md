Fat secret Api works:
Authentication
	-> Managing my own users
		> I can provide seamless experience for users so they need never keave your site in order auth themselves. 
		You can also use the auth protocol to direct non-registered visitors to your site to signup in order
		to access content provided by the platform app. 
* [ ] An HTTP cookie is used to store the session and signing credentials for the user. 
	> I need to take care of this cookie! 

There are two simple steps to setting up the credentials for your users:
	1: Obtain a valid session for your user using the FatSecret Platform REST API
		> In order to obtain this session I need to call the profile.request_script_session_key method call. 
		this method sends me the session info in either 2 forms:
			- As a value to be used as a query paramater to the URL "https://platform.fatsecret.com/js"
				> In the ex online I see it being appened to the URL for fatsecret so lets do that instead of this
				cookie value as that will be easier I think but if this does not work then we can move onto the 2nd
				option
	
			- As a cookie value that you can explicitely set in the HTTP response of your page

	2: Provide this session info to the JavaScript API
		> This is the what we do when we get session and append it into the fatsecret url in the above that I wrote!:w

* [ ] So what i need to take care of now is creating a new session/ user acc for new users that do sign up into my website
> The more ideal option would be that at the moment that they are logged in I call onto the backend which would create the account
for the fatsecret platform and once they go in to their fitness page then it would render their session so they can have their data
> Basically the UX would appear as if you jkust registered and had access to all of the features that FatSecret has available!

To create a new user with FatSecret what I will need is to call the method profie.create and then pass in the same uid that I have
for users in firebase when they first register

So what I can do is create a new api point where I can do a fetch call and pass it the user's uid when they first register and then we can
call it so create their account in fatsecret.

Currently I have two objects that correspon to the two method calls that I am creating so:
registerObj is going to have the profile.create func
reqObj is going to have the profile.request_script_session_key which will be used in order to get the session and get the user's data from
	fat secret
--------------------->
Chart()
    type: bar chart

What do we need?
    > labels: a global reference to all instances
    of when a user exercises
> timeArr <- getData()

    > Data for each exercise
# Issue: I need the dates from the timeArr to match
# the dates when a certain exercise is done




time  = [6/9, 6/28, 7/12, null]
benchtime = [null, ]
          [100, 55, 60, 111, null]

        = [6/8, null, 6/28, null, null]

Mapping = {key, value}
          {'6/8' : 100}

* [X] ~~*Get bench date*~~ [2020-07-14]
* [X] ~~*Map the keys (date) -> value (weight)*~~ [2020-07-14]
> time = [ "6/8", "6/9", "7/12" ]
> benchw = [ 100, 55, 111 ]

Map(3) { "6/8" → 100, "6/9" → 55, "7/12" → 111 }

> Find all bench times
    > Then replace the dates with their mapping weight

Compare time with timeArr

timeArr = [6/8, 6/9, 6/28, 7/12, 7/13]
time = [ "6/8", "6/9", "7/12" ]
 ["6/8", null, null, "7/12", null ]

 indexOf() ->  [0, 1, 3]
