# User Registration Endpoint Documentation

## Endpoint

`POST /user/register`

## Description
Registers a new user in the system. This endpoint accepts user details, validates them, hashes the password, creates a new user, and returns an authentication token along with the user data.

## Request Body
The request body must be a JSON object with the following structure:

```
{
  "fullname": {
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (min 3 chars, optional)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

### Example
```
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Responses

    `user` (object):
        `fullname` (object).
            `firstname` (string): User's first name (minimum 3 characters).
            `lastname` (string): User's last name (minimum 3 characters).
        `email` (string): User's email address (must be a valid email).
        `password` (string): User's password (minimum 6 characters).
    `token` (String): JWT Token

### Success (201 Created)
```
Status: 201 Created
{
  "token": "<jwt_token>",
  "user": {
    "_id": "<user_id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
    // ...other user fields
  }
}
```

### Validation Error (400 Bad Request)
```
Status: 400 Bad Request
{
  "errors": [
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    // ...other errors
  ]
}
```

## Notes
- All required fields must be present and valid.
- The password is securely hashed before storage.
- On success, a JWT token is returned for authentication.

# User Login Endpoint Documentation

## Endpoint

`POST /users/login`

## Description
Authenticates a user with email and password. On success, returns a JWT token and user data.

## Request Body
The request body must be a JSON object with the following structure:

```
{
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

### Example
```
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Responses

    `user` (object):
        `fullname` (object):
            `firstname` (string): User's first name.
            `lastname` (string): User's last name.
        `email` (string): User's email address.
        // ...other user fields
    `token` (String): JWT Token

### Success (200 OK)
```
Status: 200 OK
{
  "token": "<jwt_token>",
  "user": {
    "_id": "<user_id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
    // ...other user fields
  }
}
```

### Validation Error (400 Bad Request)
```
Status: 400 Bad Request
{
  "errors": [
    {
      "msg": "Please enter a valid email address",
      "param": "email",
      "location": "body"
    },
    // ...other errors
  ]
}
```

### Authentication Error (401 Unauthorized)
```
Status: 401 Unauthorized
{
  "message": "User not found"
}

Status: 401 Unauthorized
{
  "message": "Invalid credentials"
}
```

## Notes
- Both email and password are required and validated.
- On success, a JWT token is returned for authentication.
- Returns 401 if credentials are invalid or user does not exist.
