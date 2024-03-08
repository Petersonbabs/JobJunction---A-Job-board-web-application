# User Model:

1. username
2. email
3. password (hashed)
4. profile information ({

    employee:    {
            a. address
            b. phone
            c. resume
            d. qualifications
            e. job preferences
            f. Ready to work
        },
    
    employer: {

    }
})
5. role (job seeker or employer)


# Job Listing Model:

Represents individual job listings posted by employers.

1. title
2. description
3. company name
4. salary
5. requirements
6. application deadline
7. location
8. job type
9. feedback
10. hiring number


# Application Model:

Represents job applications submitted by job seekers for specific job listings.
Attributes may include the applicant's information, resume, cover letter, application status, etc.

status values: pending review, interviewing, offer extended, offer accepted, closed, employed
May have a foreign key relationship with the Job Listing model.

# Company Profile Model:

Represents profiles for companies or organizations posting job listings.

1. company name
2. description
3. industry
4. logo
5. website
6. reviews
7. Jobs
8. Photos
9. company size
10. founded
11. Ceo
12. Headquaters
13. candidates
14. Interviews


# Category Model:

Represents categories or tags that can be assigned to job listings for better organization and searchability.
Attributes may include category name, description, etc.
Can have a many-to-many relationship with the Job Listing model.

# Notification Model:

Represents notifications sent to users for events such as new job postings, application updates, etc.
Attributes may include notification type, content, timestamp, recipient (user), etc.

# Settings Model:

Represents user settings and preferences.
Attributes may include notification preferences, privacy settings, etc.
Can have a one-to-one relationship with the User model.

# Feedback Model:

Represents feedback or reviews submitted by users about job listings or the platform.
Attributes may include rating, comments, timestamp, etc.
Can have a foreign key relationship with the User and/or Job Listing model.