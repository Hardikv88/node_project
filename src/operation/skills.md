# Enterprise Backend CRUD Generator

## Description

Generate complete production-ready backend modules for Node.js, Express.js, PostgreSQL, and Sequelize.

The generated code must follow enterprise architecture standards and be deployable without major modifications.

---

## Agent Responsibilities

When a user provides:

* Table Name
* Columns
* Relations

Automatically generate:

* Folder Structure
* Migration
* Sequelize Model
* Associations
* Validation
* Repository
* Service
* Controller
* Routes
* Middleware
* Swagger Documentation
* Postman Collection
* SQL Queries
* Unit Tests

---

## Technology Stack

Default Stack:

* Node.js
* Express.js
* PostgreSQL
* Sequelize ORM
* Joi Validation
* JWT Authentication
* RBAC Authorization
* AWS S3
* Swagger
* Jest

---

## Architecture Rules

Always follow:

* Clean Architecture
* SOLID Principles
* DRY Principle
* Repository Pattern
* Service Layer Pattern
* Async/Await
* Separation of Concerns

Never place business logic inside controllers.

Controllers must only:

* Validate request
* Call service
* Return response

---

## Folder Structure

Always generate:

src/

├── modules/
│   └── {module}
│       ├── model
│       ├── repository
│       ├── service
│       ├── controller
│       ├── validation
│       ├── routes
│       └── swagger

├── middleware
├── utils
├── config
├── migrations
├── tests

---

## Model Rules

Generate Sequelize models with:

* UUID Primary Key
* Timestamps
* Soft Delete
* Audit Fields

Required audit fields:

* created_by
* updated_by
* deleted_by
* created_at
* updated_at
* deleted_at

Generate:

* Associations
* Hooks
* Indexes

Automatically create indexes for:

* email
* mobile
* foreign keys

---

## Migration Rules

Always generate:

* Up Migration
* Down Migration

Support:

* Foreign Keys
* Unique Constraints
* Indexes
* Enum Types
* Default Values

---

## Validation Rules

Use Joi.

Generate:

### Create Validation

### Update Validation

### Query Validation

Support:

* Required
* Email
* UUID
* Enum
* Phone
* String Length
* Pagination Params

---

## CRUD APIs

Generate:

### Create

POST /resource

### Get All

GET /resource

Features:

* Pagination
* Search
* Sorting
* Filtering

### Get By Id

GET /resource/:id

### Update

PUT /resource/:id

### Delete

DELETE /resource/:id

Soft delete only.

Never permanently delete records.

---

## Repository Layer

Generate reusable repository methods:

* create
* findById
* findOne
* findAll
* update
* softDelete
* count

Database access must remain inside repository layer.

---

## Service Layer

Generate business logic layer.

Responsibilities:

* Validation handling
* Duplicate checks
* Business rules
* Transaction handling
* S3 integration

---

## Controller Layer

Generate:

* create()
* getAll()
* getById()
* update()
* delete()

Use try/catch.

Never place Sequelize queries directly inside controller.

---

## Authentication

Generate:

authenticate()

Responsibilities:

* Verify JWT
* Extract User
* Validate Token

Store current user in:

req.user

---

## Authorization

Generate:

authorize()

Support:

* super_admin
* admin
* user

Examples:

authorize("admin")

authorize("super_admin")

---

## Search Engine

Generate reusable search utility.

Support:

Search Fields:

* name
* email
* title
* description

Search Type:

* Partial Match
* Case Insensitive

---

## Filtering

Support:

* status
* role
* created_at
* updated_at

Date Range Filters:

startDate

endDate

---

## Sorting

Support:

sortBy

sortOrder

Allowed:

ASC

DESC

---

## Pagination

Support:

page

limit

Return:

{
page,
limit,
totalRecords,
totalPages
}

---

## Response Format

Success:

{
"success": true,
"message": "Operation successful",
"data": {},
"meta": {}
}

Error:

{
"success": false,
"message": "Operation failed",
"errors": []
}

Always use this format.

---

## Error Handling

Generate:

AppError Class

Global Error Middleware

Handle:

* Joi Errors
* Sequelize Errors
* JWT Errors
* Not Found Errors

---

## S3 Upload Rules

If table contains:

* image
* avatar
* profile_image
* logo
* document
* file

Automatically generate:

uploadToS3()

deleteFromS3()

replaceExistingFile()

Supported:

* JPG
* JPEG
* PNG
* PDF

Old file must be removed before replacing.

---

## Logging

Generate Winston logger.

Log:

* Request
* Response
* Error

Include:

* Method
* URL
* Status
* User ID

---

## Security

Always implement:

Helmet

CORS

Rate Limiter

Input Sanitization

SQL Injection Protection

Environment Variable Validation

---

## Swagger

Generate complete OpenAPI documentation.

Include:

* Request Body
* Response Body
* Query Params
* Error Responses
* Authorization Header

---

## Unit Tests

Generate Jest tests.

Cover:

* Create
* Get All
* Get By Id
* Update
* Delete
* Validation
* Authentication

Minimum Coverage:

80%

---

## SQL Queries

Generate:

INSERT

SELECT

UPDATE

DELETE

SEARCH

FILTER

PAGINATION

COUNT

---

## Output Sequence

Always generate in this order:

1. Folder Structure
2. Migration
3. Model
4. Validation
5. Repository
6. Service
7. Controller
8. Routes
9. Middleware
10. Swagger
11. Postman
12. SQL Queries
13. Unit Tests

---

## Mandatory Rules

Always generate complete code.

Never generate placeholders.

Never omit imports.

Never omit exports.

Never generate pseudo-code.

Always generate runnable production-ready code.

If foreign keys exist:

Generate Sequelize associations automatically.

If image fields exist:

Generate S3 upload integration automatically.

Always include:

* Pagination
* Search
* Sorting
* Filtering
* JWT Authentication
* RBAC Authorization
* Soft Delete
* Validation
* Swagger
* Error Handling
* Audit Fields

Return code that is ready for production deployment.
