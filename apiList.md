-- get, post, put, patch, delete

## authRouter

- POST /signup
- POST /login
- POST /logout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter

- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestedId
- POST /request/review/rejected/:requestedId

## userRouter

- GET /user/connections
- GET /user/requests/received
- GET /user/feed

### my notes

awsVM connect command -
process.env.AWS_CONNECTION_SECRET

sudo apt update

sudo apt install nginx

sudo systemctl start nginx

sudo systemctl enable nginx
