## authentication/profile

  ### 401
    curl http://localhost:3333/api/authentication/profile
    > {"statusCode":401,"message":"Unauthorized"}

  ### success
    curl http://localhost:3333/api/authentication/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvYW8iLCJpYXQiOjE2NzQ1MDg5NzgsImV4cCI6MTY3NDUwOTAzOH0._33_tjJYsZhFHlMHMoLwbeFjVbJSMv8-IwmODs9k16g"

    > {"password":"asdf1234","username":"joao"}

## authentication/login

  ### 401
  curl -X POST http://localhost:3333/api/authentication/login -d '{"username": "joao", "password": "asdf1234a"}' -H "Content-Type: application/json"
  > {"statusCode":401,"message":"Unauthorized"}j

  ### success
  curl -X POST http://localhost:3333/api/authentication/login -d '{"username": "joao", "password": "asdf1234"}' -H "Content-Type: application/json"

  > {"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvYW8iLCJpYXQiOjE2NzQ1MDg4MTEsImV4cCI6MTY3NDUwODg3MX0.LHv_eXxhKWu-kpdEyQi8AHIHd64R8atzuD27Brdi2eY"}


users
  ### 400 Bad Request
  curl -X POST http://localhost:3333/api/users -d '{"email": "joao@gmail.com", "name": "", "password": "asdf", "passwordConfirmation": "asdf"}' -H "Content-Type: application/json"

  ### success
    curl -X POST http://localhost:3333/api/users -d '{"email": "joao@gmail.com", "name": "joao", "password": "asdf1234", "passwordConfirmation": "asdf1234"}' -H "Content-Type: application/json"
