To implement a function for allowing any logged-in user to follow a company, you can follow these general steps:

1. **Database Schema**:
   - Create a database schema to store user-company follow relationships. This could involve creating a new table or adding fields to an existing table to track which users are following which companies.

2. **Backend API**:
   - Create backend API endpoints to handle follow actions:
     - Endpoint to retrieve a list of companies followed by a specific user.
     - Endpoint to follow/unfollow a company.
     - Endpoint to retrieve a list of users following a specific company (optional, for company profile page).

3. **Authentication**:
   - Ensure that users are authenticated before they can access the follow/unfollow endpoints. You can use session-based authentication, JWT (JSON Web Tokens), OAuth, or any other authentication mechanism based on your application's requirements.

4. **Frontend Integration**:
   - Implement frontend components to allow users to follow/unfollow companies:
     - Add a follow button or toggle switch to company profile pages or job listings.
     - Handle user interactions (e.g., clicks) to trigger follow/unfollow actions.
     - Display the current follow status (e.g., followed/unfollowed) to users.

5. **Backend Logic**:
   - Implement the backend logic to handle follow/unfollow actions:
     - When a user follows a company, add a new entry in the database to establish the follow relationship.
     - When a user unfollows a company, remove the corresponding entry from the database.

6. **Error Handling**:
   - Implement error handling and validation logic to handle edge cases such as unauthorized access, duplicate follows, etc.

7. **Testing and Debugging**:
   - Test the follow/unfollow functionality thoroughly to ensure it works as expected.
   - Debug any issues that arise during testing and make necessary adjustments to the implementation.

Here's a simplified example of how you might implement the backend API endpoints in Node.js with Express.js:

```javascript
// POST /api/companies/:companyId/follow
app.post('/api/companies/:companyId/follow', authenticateUser, (req, res) => {
  const { companyId } = req.params;
  const userId = req.user.id;

  // Add logic to check if the user is already following the company
  // If not, add a new entry in the database to establish the follow relationship

  res.status(200).json({ success: true, message: 'Company followed successfully' });
});

// DELETE /api/companies/:companyId/unfollow
app.delete('/api/companies/:companyId/unfollow', authenticateUser, (req, res) => {
  const { companyId } = req.params;
  const userId = req.user.id;

  // Add logic to remove the follow relationship between the user and the company

  res.status(200).json({ success: true, message: 'Company unfollowed successfully' });
});
```

In this example, `authenticateUser` is a middleware function that ensures the user is logged in before allowing access to the follow/unfollow endpoints. You would need to replace `authenticateUser` with your actual authentication middleware.