# wikit
Wiki and Reddit had a baby.

## API Reference 

#### /api/user/new/
###### Add user to database
~~~
{
  username: "user",
  password: "hash",
  email: "example@example.com",
  key_id: key,
  token: token
}
~~~
#### /api/user/verify/
###### Verify user username and password
~~~
{
  username: "user",
  password: "hash",
  key_id: key,
  token: token
}
~~~
#### /api/user/check/
###### Check if username is taken
~~~
/api/user/check/$username
~~~
