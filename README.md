# Blog Post Panel Project

## Overview
The **Blog Post Panel** is a full-stack web application where users can register, log in, and manage their own blog posts. Users can create, edit, and delete their blogs, while being able to view blogs posted by others in a read-only mode.

## Project Stack
- **Frontend (UI)**: EJS (Embedded JavaScript Templates)
- **Backend**: Express.js
- **Database**: MongoDB
- **Authentication**: Passport.js (for user registration and login)
- **File Uploads**: Multer (for blog image uploads)

## Features

### User Authentication
- **Register**: Users can create an account.
- **Login**: Users log in using Passport.js authentication.
- **Session Management**: Sessions/cookies are used to keep users logged in.

### Blog Management
- **Add Blog**: Users can create a new blog post with a title, content, and image (uploaded using Multer).
- **Edit Blog**: Users can edit their own blog posts.
- **Delete Blog**: Users can delete their own blog posts.

### View Blogs
- **All Blogs Page**: A public page that shows all users' blogs (view-only, no edit/delete options).
- **My Blogs Page**: A private page where logged-in users can view, edit, or delete only their own blogs.

## Key Routes & Logic

### User Authentication Routes
- `POST /register`: To create a new user.
- `POST /login`: To log in the user using Passport.js.
- `GET /logout`: To log out the user.

### Blog Routes
- `GET /blogs`: View all users' blogs.
- `GET /my-blogs`: View logged-in user’s blogs (with edit/delete options).
- `POST /blogs/add`: Add a new blog post (with file upload).
- `POST /blogs/edit/:id`: Edit a specific blog (only by the author).
- `DELETE /blogs/delete/:id`: Delete a specific blog (only by the author).

## Additional Learning Points
- Understanding user authentication and authorization using Passport.js.
- Handling secure file uploads with Multer.
- Structuring Express.js applications to work with MongoDB for data persistence.
- Building a dynamic UI using EJS templates.


![Screenshot 2024-10-03 153519](https://github.com/user-attachments/assets/5a4087c0-fbf3-4a90-b9b4-1df1a024e649)
![Screenshot 2024-10-03 153446](https://github.com/user-attachments/assets/cb115c27-2df7-4fb6-975b-81e39230a804)
![Screenshot 2024-10-03 153341](https://github.com/user-attachments/assets/a7b5523d-f565-4130-a00d-e6e537fb190c)
![Screenshot 2024-10-03 153309](https://github.com/user-attachments/assets/8951173f-1486-413b-9d9c-a70ec4938b04)
![Screenshot 2024-10-03 153114](https://github.com/user-attachments/assets/a1bb04ea-4816-4a8c-84fd-236a6cad4d18)
![Screenshot 2024-09-22 212844](https://github.com/user-attachments/assets/9f231019-6d58-4725-860f-cb8a55d908fe)
![Screenshot 2024-09-22 212744](https://github.com/user-attachments/assets/864077b8-e89d-4636-be9e-b39ebcf16a95)
![Screenshot 2024-09-22 212651](https://github.com/user-attachments/assets/1ef1bd57-8241-4ca1-8dde-7afbd6afbc05)


