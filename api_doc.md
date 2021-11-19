# Movie API Documentation

## Endpoints :

List of available endpoints:


- `POST /register`
- `POST /login`
- `GET /trips`
- `POST /trips`
- `PUT /trips/:id`
- `POST /payment/:id`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "email": "string",
  "password": "string",
  "firstName": "string",
  "lastName": "string",
  "isDriver": "boolean",
}
```

_Response (201 - Created)_

```json
{
    "message": "Register successful",
    "email": "email@mail.com",
}
```

_Response (400 - Bad Request)_

```json
[
    "Email are required",
    "Please enter a valid email address",
    "Password are required",
    "first name are required",
    "last name are required",
]
OR
[
    "email must be unique"
]
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Login successful",
  "access_token": "string",
  "user_id": 1,
  "is_driver": "boolean"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. GET /trip

Description:

- Get all trips from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 32,
        "UserId": 7,
        "DriverId": 7,
        "pickupLat": "-6.921152067931175",
        "pickupLong": "107.66306753896748",
        "pickupLocation": "Mesjid Al-Hikmah, Jln. Sampang No. 1",
        "destinationLat": "-6.931961488821898",
        "destinationLong": "107.67167736128528",
        "destinationLocation": "Kelurahan Cisaranten Endah, Jl. Parakansaat No.150",
        "tripStart": null,
        "tripEnd": null,
        "status": "string",
        "redirectUrl": null,
        "updatedAt": "2021-11-18T06:29:53.006Z",
        "User": {
            "firstName": "John",
            "lastName": "Doe"
        },
        "Driver": {
            "firstName": "John",
            "lastName": "Doe"
        }
    },
  ...
]
```
&nbsp;

## 4. POST /trip

Description:

- Create trip by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
    "pickup": ["-6.921152067931175", "107.66306753896748"],
    "pickupLocation": ["-6.931961488821898", "107.67167736128528"],
    "destination": "Mesjid Al-Hikmah, Jln. Sampang No. 1",
    "destinationLocation": "Kelurahan Cisaranten Endah, Jl. Parakansaat No.150",
}
```

_Response (201 - Created)_

```json
{
    "id": 32,
    "UserId": 7,
    "DriverId": 7,
    "pickupLat": "-6.921152067931175",
    "pickupLong": "107.66306753896748",
    "pickupLocation": "Mesjid Al-Hikmah, Jln. Sampang No. 1",
    "destinationLat": "-6.931961488821898",
    "destinationLong": "107.67167736128528",
    "destinationLocation": "Kelurahan Cisaranten Endah, Jl. Parakansaat No.150",
    "tripStart": null,
    "tripEnd": null,
    "status": "string",
    "redirectUrl": null,
    "updatedAt": "2021-11-18T06:29:53.006Z",
    "User": {
        "firstName": "John",
        "lastName": "Doe"
    },
    "Driver": {
        "firstName": "John",
        "lastName": "Doe"
    }
},
```


&nbsp;

## 5. PATCH /trip/:id

Description:

- Update status by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)",
  "status": "string (required)"
}
```

_Response (200 - OK)_

```json
{
    "id": 32,
    "UserId": 7,
    "DriverId": 7,
    "pickupLat": "-6.921152067931175",
    "pickupLong": "107.66306753896748",
    "pickupLocation": "Mesjid Al-Hikmah, Jln. Sampang No. 1",
    "destinationLat": "-6.931961488821898",
    "destinationLong": "107.67167736128528",
    "destinationLocation": "Kelurahan Cisaranten Endah, Jl. Parakansaat No.150",
    "tripStart": null,
    "tripEnd": null,
    "status": "string",
    "redirectUrl": null,
    "updatedAt": "2021-11-18T06:29:53.006Z",
    "User": {
        "firstName": "John",
        "lastName": "Doe"
    },
    "Driver": {
        "firstName": "John",
        "lastName": "Doe"
    }
},
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden: Not Authorized"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Trip with id {id} not found"
}
```

&nbsp;

## 6. POST /google-signin

Request:

- body:

```json
{
  "id_token": "string",
}
```

_Response (200 - OK)_

```json
{
  "message": "Login successful",
  "access_token": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "Login successful",
  "access_token": "string",
  "user_id": 1,
  "user_role": "Staff"
}
```

&nbsp;

## 7. POST /payment

Request:

- body:

```json
{
  "card_number": "string",
  "card_exp_month": "string",
  "card_exp_year": "string",
  "card_cvv": "string",
  "price": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Charge successful",
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Not Authorized"
}
OR
{
  "message": "Invalid Email or Password"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```