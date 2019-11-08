# synotptic_project_moishe
## How to set up Application:

### Step 1: Set up backend:
-   Open Application in new Terminal
-   enter: 'cd frontend'
-   enter: 'npm install'
-   enter: 'npm start'
-   Now your server is running and is connected to your database (PLEASE ENSURE YOU HAVE INTERNET CONNECTION)

### Step 2: Set up frontend:
-   Open Application in another Terminal
-   enter: 'cd backend'
-   enter: 'npm install'
-   enter: 'npm start'
-   Now the frontend is running and you can visit <http://localhost:3000/> to proceed to the Application

## Exisiting User details
**Restricted** user can only see quizzes and questions

**View** user can also see the quizzes questions and multiple choice answers.

**Edit** user can view, edit, add and delete quizzes, questions and answers

**Admin** user can create new users and assign there permissions to either restricted, view or edit

### Changing Admin details

You can change the password for the admin user in Application/frontend/src/config/keys.js

To do so simply change the string for adminPassword or adminUsername to what you wish.
<script >
  //config/keys.js
module.exports = {
  adminPassword: 'password',
  adminUsername: 'admin'
}
</script>


