 curl http://localhost:3333/api/authentication/profile
 > {"statusCode":401,"message":"Unauthorized"}

 curl -X POST http://localhost:3333/api/authentication/login -d '{"username": "joao", "password": "asdf1234a"}' -H "Content-Type: application/json"
 > {"statusCode":401,"message":"Unauthorized"}j

 curl -X POST http://localhost:3333/api/authentication/login -d '{"username": "joao", "password": "asdf1234"}' -H "Content-Type: application/json"

 > {"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvYW8iLCJpYXQiOjE2NzQ1MDg4MTEsImV4cCI6MTY3NDUwODg3MX0.LHv_eXxhKWu-kpdEyQi8AHIHd64R8atzuD27Brdi2eY"}

 curl http://localhost:3333/api/authentication/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvYW8iLCJpYXQiOjE2NzQ1MDg5NzgsImV4cCI6MTY3NDUwOTAzOH0._33_tjJYsZhFHlMHMoLwbeFjVbJSMv8-IwmODs9k16g"

> {"password":"asdf1234","username":"joao"}
