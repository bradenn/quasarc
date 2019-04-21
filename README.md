# wikit
Wiki and Reddit had a baby.

API:


New user:

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
###### Success:
~~~
{
  "status": "success",
  "message": "user has been created"
}
~~~
###### Fault:
~~~
{
  "status": "error",
  "message": "error message"
}
~~~

Check if username exists:

localhost:3001/api/user/exists/*username*
Response:
{
  "status": "success",
  "value": true or false
}

{
  "username": "test",
  "password": "pass",
  "email": "email",
  "birthdate": "000",
  "key_id": "dab6bb2aa7fc264e73af748e3eb0f453",
  "token": "eurIKVa5VWMWmEsH9Qse6oadeJYYW2LRQiZHsX3kGcTwyE0TKC97rMB0a0LAqStj"
}
