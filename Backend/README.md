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

# User Profile Endpoint Documentation

## Endpoint

`GET /users/profile`

## Description
Returns the authenticated user's profile information. Requires a valid JWT token in the Authorization header.

## Request Headers
- `Authorization: Bearer <jwt_token>` (required)

## Responses

    `user` (object):
        `fullname` (object):
            `firstname` (string): User's first name.
            `lastname` (string): User's last name.
        `email` (string): User's email address.
        // ...other user fields

### Success (200 OK)
```
Status: 200 OK
{
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

### Authentication Error (401 Unauthorized)
```
Status: 401 Unauthorized
{
  "message": "Authentication required"
}
```

## Notes
- Requires a valid JWT token in the Authorization header.
- Returns the profile of the currently authenticated user.

# User Logout Endpoint Documentation

## Endpoint

`GET /users/logout`

## Description
Logs out the authenticated user by invalidating the session or token (implementation may vary). Requires a valid JWT token in the Authorization header.

## Request Headers
- `Authorization: Bearer <jwt_token>` (required)

## Responses



### Success (200 OK)
```
Status: 200 OK
{
  "message": "Logout successful"
}
```

### Authentication Error (401 Unauthorized)
```
Status: 401 Unauthorized
{
  "message": "Authentication required"
}
```

## Notes
- Requires a valid JWT token in the Authorization header.
- Logs out the currently authenticated user.

# Captain Registration Endpoint Documentation

## Endpoint

`POST /captain/register`

## Description
Registers a new captain in the system. This endpoint accepts captain details, validates them, hashes the password, creates a new captain, and returns an authentication token along with the captain data.

## Request Body
The request body must be a JSON object with the following structure:

```
{
  "fullname": {
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (min 3 chars, optional)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)",
  "vehicle": {
    "color": "string (required)",
    "plate": "string (required)",
    "capacity": "number (required)",
    "type": "string (car, bike, truck, van; required)"
  }
}
```

### Example
```
{
  "fullname": {
    "firstname": "Alice",
    "lastname": "Smith"
  },
  "email": "alice.smith@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "plate": "ABC1234",
    "capacity": 4,
    "type": "car"
  }
}
```

## Responses

    `captain` (object):
        `fullname` (object):
            `firstname` (string): Captain's first name (minimum 3 characters).
            `lastname` (string): Captain's last name (minimum 3 characters).
        `email` (string): Captain's email address (must be a valid email).
        `vehicle` (object):
            `color` (string): Vehicle color.
            `plate` (string): Vehicle plate.
            `capacity` (number): Vehicle capacity.
            `type` (string): Vehicle type (car, bike, truck, van).
        // ...other captain fields
    `token` (String): JWT Token

### Success (201 Created)
```
Status: 201 Created
{
  "token": "<jwt_token>",
  "captain": {
    "_id": "<captain_id>",
    "fullname": {
      "firstname": "Alice",
      "lastname": "Smith"
    },
    "email": "alice.smith@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC1234",
      "capacity": 4,
      "type": "car"
    }
    // ...other captain fields
  }
}
```

### Validation Error (400 Bad Request)
```
Status: 400 Bad Request
{
  "errors": [
    {
      "msg": "First name is required",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Invalid email address",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    },
    {
      "msg": "Vehicle color is required",
      "param": "vehicle.color",
      "location": "body"
    },
    {
      "msg": "Vehicle plate is required",
      "param": "vehicle.plate",
      "location": "body"
    },
    {
      "msg": "Vehicle capacity must be a number",
      "param": "vehicle.capacity",
      "location": "body"
    },
    {
      "msg": "Invalid vehicle type",
      "param": "vehicle.type",
      "location": "body"
    }
    // ...other errors
  ]
}
```

## Notes
- All required fields must be present and valid.
- The password is securely hashed before storage.
- On success, a JWT token is returned for authentication.
- Vehicle details are required for captain registration.
