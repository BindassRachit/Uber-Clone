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
`POST /captains/register`

## Description
Registers a new captain. Requires vehicle details and personal information. Returns a JWT token and captain data on success.

## Request Body
```jsonc
{
  "fullname": {
    "firstname": "string", // required, min 1 char
    "lastname": "string"   // optional
  },
  "email": "string",        // required, valid email
  "password": "string",     // required, min 6 chars
  "vehicle": {
    "color": "string",      // required
    "plate": "string",      // required
    "capacity": 4,           // required, number
    "type": "car"           // required, one of: car, bike, truck, van
  }
}
```

### Example
```jsonc
{
  "fullname": {
    "firstname": "Alice",
    "lastname": "Smith"
  },
  "email": "alice.smith@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ1234",
    "capacity": 4,
    "type": "car"
  }
}
```

## Responses

### Success (201 Created)
```jsonc
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
      "plate": "XYZ1234",
      "capacity": 4,
      "vehicleType": "car"
    }
    // ...other captain fields
  }
}
```

### Validation Error (400 Bad Request)
```jsonc
{
  "errors": [
    {
      "msg": "First name is required",
      "param": "fullname.firstname",
      "location": "body"
    },
    // ...other errors
  ]
}
```

### Duplicate Email (400 Bad Request)
```jsonc
{
  "message": "Captain with this email already exists"
}
```

## Notes
- All required fields must be present and valid.
- The password is securely hashed before storage.
- On success, a JWT token is returned for authentication.

# Captain Login Endpoint Documentation

## Endpoint
`POST /captains/login`

## Description
Authenticates a captain with email and password. Returns a JWT token and captain data on success.

## Request Body
```jsonc
{
  "email": "string",      // required, valid email
  "password": "string"    // required, min 6 chars
}
```

### Example
```jsonc
{
  "email": "alice.smith@example.com",
  "password": "password123"
}
```

## Responses

### Success (200 OK)
```jsonc
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
      "plate": "XYZ1234",
      "capacity": 4,
      "vehicleType": "car"
    }
    // ...other captain fields
  }
}
```

### Validation Error (400 Bad Request)
```jsonc
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

### Authentication Error (400 Bad Request)
```jsonc
{
  "message": "Captain with this email does not exists"
}
// or
{
  "message": "Invalid email or password"
}
```

## Notes
- Both email and password are required and validated.
- On success, a JWT token is returned for authentication.
- Returns 400 if credentials are invalid or captain does not exist.

# Captain Profile Endpoint Documentation

## Endpoint
`GET /captains/profile`

## Description
Returns the authenticated captain's profile information. Requires a valid JWT token in the Authorization header.

## Request Headers
- `Authorization: Bearer <jwt_token>` (required)

## Responses

### Success (200 OK)
```jsonc
{
  "captain": {
    "_id": "<captain_id>",
    "fullname": {
      "firstname": "Alice",
      "lastname": "Smith"
    },
    "email": "alice.smith@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ1234",
      "capacity": 4,
      "vehicleType": "car"
    }
    // ...other captain fields
  }
}
```

### Authentication Error (401 Unauthorized)
```jsonc
{
  "message": "Authentication required"
}
```

## Notes
- Requires a valid JWT token in the Authorization header.
- Returns the profile of the currently authenticated captain.

# Captain Logout Endpoint Documentation

## Endpoint
`GET /captains/logout`

## Description
Logs out the authenticated captain by invalidating the session or token. Requires a valid JWT token in the Authorization header.

## Request Headers
- `Authorization: Bearer <jwt_token>` (required)

## Responses

### Success (200 OK)
```jsonc
{
  "message": "Logged out successfully"
}
```

### Authentication Error (401 Unauthorized)
```jsonc
{
  "message": "Authentication required"
}
```

## Notes
- Requires a valid JWT token in the Authorization header.
- Logs out the currently authenticated captain.
