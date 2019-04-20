# wikit
Wiki and Reddit had a baby.

API:


New user:

localhost:3001/api/user/new/:
{
  username: "user",
  password: "hash",
  email: "example@example.com",
  birthdate: "1/1/19",
  key_id: key,
  token: token
}
Response:
{
  "status": "success",
  "message": "user has been created"
}

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
