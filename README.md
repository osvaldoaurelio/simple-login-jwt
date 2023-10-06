<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

```bash
# installation
$ yarn

# run the aplication - dev env
$ yarn start:dev

# run unit tests
$ yarn test
```

### Swagger url
```
http://localhost:3000/api-doc/
```

---

### Login endpoint
```
http://localhost:3000/auth/login/
```

---

### Curl request example
```
curl -X 'POST' \
  'http://localhost:3000/auth/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "username": "username1",
  "password": "password1",
  "rememberMe": true
}'
```