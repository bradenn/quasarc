# Quasarc

## API Reference 

#### /api/user/ POST
###### Request to append user database
###### Returns 200 (Okay), 401 (Authentication Error), or 400 (Inputs not satisifed)
~~~
{
  username: "user",
  password: "plaintext",
  email: "example@example.com",
  key_id: key
}
~~~
#### /api/user/:data GET
###### Verify user username and password
###### Returns 200 (Okay), 204 (Mismatch Query)
~~~
{
  username: "user",
  password: "hash",
  key_id: key
}
~~~
#### /api/user/check/:data GET
###### Check if username is taken
##### Model deprecated
~~~
/api/user/check/$username
~~~
