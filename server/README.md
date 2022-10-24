# CRM API

This API is a part of CRM ticket system with MERN stack.

## How to use

- run `git clone ...`
- run `npm install`
- run `npm start`

Note: Make sure you have nodemon installed in your system otherwise install as dev dependencies.

## API Resources

### User API Resources

All the user API router follows `/v1/user/`

| #   | Routers                   | Verbs  | Progress | Is Private | Description                                      |
| --- | ------------------------- | ------ | -------- | ---------- | ------------------------------------------------ |
| 1   | `/v1/user`                | GET    | DONE     | Yes        | Get user Info                                    |
| 2   | `/v1/user`                | POST   | DONE     | No         | Create a user                                    |
| 3   | `/v1/user/login`          | POST   | DONE     | No         | Verify user Authentication and return JWT        |
| 4   | `/v1/user/reset-password` | POST   | DONE     | No         | Verify email and email pin to reset the password |
| 5   | `/v1/user/reset-password` | PATCH  | DONE     | No         | Replace with new password                        |
| 6   | `/v1/user/logout`         | DELETE | DONE     | Yes        | Delete user accessJWT                            |

### Ticket API Resources

All the user API router follows `/v1/ticket/`

| #   | Routers                        | Verbs | Progress | Is Private | Description                             |
| --- | ------------------------------ | ----- | -------- | ---------- | --------------------------------------- |
| 1   | `/v1/ticket`                   | GET   | DONE     | Yes        | Get all ticket for the logined in user  |
| 2   | `/v1/ticket/{id}`              | GET   | DONE    | Yes        | Get a ticket details                    |
| 3   | `/v1/ticket`                   | POST  | DONE     | Yes        | Create a new ticket                     |
| 4   | `/v1/ticket/{id}`              | PUT   | DONE     | Yes        | Update ticket details ie. reply message |
| 5   | `/v1/ticket/close-ticket/{id}` | PATCH | DONE     | Yes        | Update ticket status to close           |
| 6   | `/v1/ticket/{id}`              | DELETE | TODO     | Yes        | Delete a ticket                         |

### Tokens API Resources

All the user API router follows `/v1/tokens`

| #   | Routers      | Verbs | Progress | Is Private | Description            |
| --- | ------------ | ----- | -------- | ---------- | ---------------------- |
| 1   | `/v1/tokens` | GET   | DONE     | No         | Get a fresh access JWT |