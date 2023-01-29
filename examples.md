## authentication/me

  ### 401
    curl https://localhost:3333/api/authentication/me
    > {"statusCode":401,"message":"Unauthorized"}

  ### success
    curl https://localhost:3333/api/authentication/me -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBlZjY3ZGI2LWZmMGEtNGJlOC04MDE4LTUzMGU0NzVkMGJjNiIsImlhdCI6MTY3NDc2OTU2OSwiZXhwIjoxNjc0Nzg3NTY5fQ.3i4nhVnHDdGyc9vGyus07ReKnyddNqQtwq5WuQprK_g"

    > {"password":"asdf1234","email":"joao"}


## authentication/signup
  ### 400 
    curl  --cacert /home/joaowedesouza/poc/realiza/configs/ssl/cert.pem -X POST https://localhost:3333/api/authentication/signup -d '{"email": "will2@user.com", "password": "asdf1234", "name": "Will", "passwordConfirmation": "" }' -H "Content-Type: application/json"
  ### success
    curl -X POST https://localhost:3333/api/authentication/signup -d '{"email": "will3@user.com", "password": "asdf1234", "name": "Will", "passwordConfirmation": "asdf1234" }' -H "Content-Type: application/json" --cacert /home/joaowedesouza/poc/realiza/configs/ssl/cert.pem

## authentication/signin

  ### admin success
  curl -X POST https://localhost:3333/api/authentication/signin -d '{"email": "joao@gmail.com", "password": "asdf1234"}' -H "Content-Type: application/json"
  > {"statusCode":401,"message":"Unauthorized"}j

  ### success
  curl -X POST https://localhost:3333/api/authentication/signin -d '{"email": "will@user.com", "password": "asdf1234"}' -H "Content-Type: application/json"

  > {"access_token":"<token>"}


## authentication/admin/signup
  ### 400 Bad Request
  curl -X POST https://localhost:3333/api/authentication/admin/signup -d '{"email": "joao@gmail.com", "name": "", "password": "asdf", "passwordConfirmation": "asdf"}' -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMxMjNkODQyLWE0ZTktNDFhYS1iMzM0LWM2M2UyYWY0YjBhOCIsImlhdCI6MTY3NDc3NTAxMiwiZXhwIjoxNjc0NzkzMDEyfQ.UWgOPOtUUF29g6lo_UcnQUkTdRURu7_gpE-lZwXB0Qo"


## /authentication/admin/users

curl https://localhost:3333/api/authentication/admin/users?page=1 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMxMjNkODQyLWE0ZTktNDFhYS1iMzM0LWM2M2UyYWY0YjBhOCIsImlhdCI6MTY3NDc5MDYwMiwiZXhwIjoxNjc0ODA4NjAyfQ.fKKHxLauCzA0ZAwmms_5IlJFKfJ52QPSZuiScBvvJe4"
