# Project Rules & Standards

## 1. Project Architecture Rules
- **MVC Pattern**: Strictly follow Model-View-Controller architecture
- **Separation of Concerns**: Each layer has a single responsibility
- **Service Layer**: (Optional but recommended) For complex business logic
- **Dependency Injection**: Keep modules loosely coupled

## 2. Folder Structure Conventions
```
src/
├── config/          # Configuration files (DB, env, etc.)
├── controllers/     # Request handlers
├── middlewares/     # Express middlewares
├── models/          # Sequelize models
├── routes/          # API route definitions
├── services/        # Business logic (optional)
├── utils/           # Utility functions
├── validators/      # Request validators
├── app.js           # Express app setup
└── server.js        # Server entry point
```

## 3. Naming Conventions
- **Files/Folders**: kebab-case (e.g., `user-routes.js`, `middlewares/`)
- **Variables/Functions**: camelCase (e.g., `getUserById`, `userName`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_PAGE_SIZE`, `JWT_SECRET`)
- **Classes/Models**: PascalCase (e.g., `User`, `Product`)
- **Database Tables**: snake_case, plural (e.g., `users`, `product_categories`)
- **Database Columns**: snake_case (e.g., `user_id`, `created_at`)

## 4. Coding Standards
- Use `const` by default, `let` only when reassignment is necessary
- Avoid `var`
- Use semicolons
- Prefer async/await over callbacks
- Use meaningful variable and function names
- Keep functions small and focused (max 50 lines)
- Write comments only when necessary (code should be self-documenting)

## 5. API Response Standards
### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": []
}
```

### HTTP Status Codes
- `200 OK`: Success
- `201 Created`: Resource created
- `400 Bad Request`: Invalid input
- `401 Unauthorized`: Missing/invalid credentials
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource doesn't exist
- `500 Internal Server Error`: Server error

## 6. Security Standards
- Always validate and sanitize user input
- Use parameterized queries (Sequelize handles this)
- Hash passwords using bcrypt
- Use JWT for authentication
- Implement rate limiting
- Use helmet.js for security headers
- Never expose secrets in code
- Validate CORS origins

## 7. Scalability Practices
- Use environment variables for configuration
- Implement proper error handling
- Use connection pooling for database
- Optimize database queries
- Implement caching where appropriate
- Use async operations for I/O
- Design stateless APIs

## 8. Clean Code Guidelines
- DRY (Don't Repeat Yourself)
- KISS (Keep It Simple, Stupid)
- YAGNI (You Aren't Gonna Need It)
- Write tests for critical functionality
- Refactor regularly
- Follow SOLID principles

## 9. Error Handling Patterns
- Use try/catch blocks for async operations
- Create custom error classes
- Centralize error handling middleware
- Log all errors properly
- Don't expose stack traces to clients
- Provide meaningful error messages

## 10. Sequelize Usage Standards
- Define models in separate files under `src/models/`
- Use `src/models/index.js` to load and associate all models
- Use migrations for database schema changes
- Use seeders for initial data
- Define validations in models
- Use transactions for multiple write operations
- Avoid raw queries unless necessary

## 11. Authentication Standards
- Use JWT with short-lived access tokens
- Implement refresh tokens
- Store sensitive data securely
- Validate tokens on protected routes
- Implement password reset functionality
- Use HTTPS in production

## 12. Logging Standards
- Use structured logging
- Log at different levels (info, warn, error, debug)
- Include timestamps and context in logs
- Don't log sensitive data (passwords, tokens)
- Use the `logHistory` utility for agent actions
- Rotate log files in production
