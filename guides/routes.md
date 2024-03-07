# Job Board Web Application - Routes

## Overview
This document provides an overview of the routes used in the Job Board Web Application. It outlines the endpoints and their corresponding functionalities.

## Routes

### Public Routes
1. **Home Page**
   - Route: `/`
   - Description: Displays the home page of the application, including search functionality and featured job listings.

2. **Job Listings Page**
   - Route: `/jobs` or `/search`
   - Description: Displays a list of job listings based on search criteria or filters selected by the user.

3. **Job Details Page**
   - Route: `/jobs/:id`
   - Description: Displays detailed information about a specific job listing, including the job description, requirements, and application instructions.

4. **Login/Register Page**
   - Route: `/login` and `/register`
   - Description: Provides forms for users to log in to existing accounts or register for new accounts.

5. **404 Error Page**
   - Route: `*`
   - Description: Displays a 404 error page when a requested route does not exist.

6. **Employer Page**
   - Route: "/employer/:id"

7. **Employee Page**
   - Route: "/employee/:id"

### Protected Routes
1. **User Profile Page**
   - Route: `/profile`
   - Description: Displays user-specific information and settings, such as saved job listings, application history, and account preferences.
   - Access: Requires authentication (all logged-in users).

2. **Employer Dashboard**
   - Route: `/employer:id/dashboard`
   - Description: Provides access to employer-specific features, such as posting new job listings, managing applications, and viewing analytics.
   - Access: Requires authentication and employer role.

3. **Job Application Page**
   - Route: `/jobs/:id/apply`
   - Description: Allows job seekers to submit applications for specific job listings by uploading their resumes and cover letters.
   - Access: Requires authentication and job seeker role.

4. **Employee Profile**
    - Route: `employee/:id`

5. **Employees**


6. **Applied**
## Conclusion
The routes outlined above provide a structured overview of the Job Board Web Application's navigation flow and functionality. By organizing routes into public and protected categories, the application ensures appropriate access control and user experience.



To check a user's role when accessing a protected route and grant or deny access accordingly, you can implement middleware functions in your backend server. Here's a general approach using Node.js and Express.js:

1. **Define Middleware Function:**
   Create a middleware function that checks the user's role before allowing access to the protected route. This middleware function can be applied to specific routes or globally to all routes that require authentication.

```javascript
// Middleware function to check user role
const checkUserRole = (requiredRole) => {
  return (req, res, next) => {
    // Check if user is authenticated and has the required role
    if (req.user && req.user.role === requiredRole) {
      // User has the required role, grant access
      next();
    } else {
      // User does not have the required role, deny access
      return res.status(403).json({ error: "Unauthorized" });
    }
  };
};
```

2. **Apply Middleware to Protected Routes:**
   Apply the `checkUserRole` middleware to the routes that require specific user roles for access. You can pass the required role as an argument to the middleware function.

```javascript
// Example route for the employer dashboard
app.get("/employer/dashboard", checkUserRole("employer"), (req, res) => {
  // Route handler logic
});
```

3. **Pass User Role to Requests:**
   Ensure that the user's role is included in the request object before reaching the middleware. This can be done during the authentication process or by retrieving the user's role from the database based on their authentication credentials.

```javascript
// Example middleware to authenticate users and attach user information to request object
const authenticateUser = (req, res, next) => {
  // Authentication logic to verify user credentials
  // Assuming user information is stored in req.user after authentication
  req.user = {
    // User information retrieved from authentication process
    // Example: { id: "123", username: "example", role: "employer" }
    // Include user's role along with other information
    id: "123",
    username: "example",
    role: "employer",
  };
  next();
};

// Apply authentication middleware globally
app.use(authenticateUser);
```

With this setup, the `checkUserRole` middleware will verify whether the user has the required role before granting access to protected routes. If the user does not have the required role, access will be denied, and an error response will be sent to the client. This approach helps enforce role-based access control (RBAC) in your application.