# Authentication System Documentation

## Overview
The NepGo application now has a complete authentication system with login, logout, registration, and password reset functionality.

## Features Implemented

### 1. Authentication Context (`AuthContext.js`)
- **Login**: Authenticates users with email and password
- **Register**: Creates new user accounts
- **Logout**: Clears user session and redirects to landing page
- **Forgot Password**: Generates password reset tokens
- **Reset Password**: Allows users to set new passwords
- **Auto-login**: Persists user sessions using localStorage

### 2. Updated Components

#### Login Component (`Login.js`)
- Uses AuthContext's `login` function
- Proper error handling and validation
- Success animations and toast notifications
- Redirects to home page after successful login

#### SignUp Component (`SignUp.js`)
- Uses AuthContext's `register` function
- Form validation and error handling
- Redirects to login page after successful registration

#### Navbar Component (`Navbar.js`)
- Shows login/register buttons when not authenticated
- Shows profile/logout buttons when authenticated
- Uses AuthContext's `logout` function

#### UnifiedTopbar (`App.js`)
- Conditional rendering based on authentication status
- Profile and logout buttons for authenticated users
- Login/register buttons for unauthenticated users

### 3. Protected Routes
- All main features are wrapped in `PrivateRoute` components
- Unauthenticated users are redirected to login
- Authenticated users are redirected to home from login/register pages

## Backend Requirements

### Environment Variables
Create a `.env` file in the `nepgo.backend` directory:

```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/nepgo

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Email Configuration (for password reset and 2FA)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Admin Email (for admin-only features)
ADMIN_EMAIL=admin@nepgo.com

# Weather API Key
OPENWEATHER_API_KEY=your-openweather-api-key

# Server Port
PORT=5000
```

### API Endpoints
- `POST /register` - User registration
- `POST /login` - User login
- `POST /forgot-password` - Password reset request
- `POST /reset-password` - Password reset
- `GET /dashboard` - Protected route example

## Testing the Authentication

### 1. Start the Backend Server
```bash
cd nepgo.backend
npm install
npm start
```

### 2. Start the Frontend
```bash
cd nepgo
npm start
```

### 3. Test Authentication Flow
1. Visit `/auth-test` to see authentication status
2. Try registering a new account
3. Try logging in with the registered account
4. Test logout functionality
5. Verify protected routes require authentication

## User Flow

### Registration Flow
1. User visits `/signup`
2. Fills out registration form
3. Submits form → calls `/register` endpoint
4. Success → redirects to `/login`
5. User can now log in

### Login Flow
1. User visits `/login`
2. Enters email and password
3. Submits form → calls `/login` endpoint
4. Success → stores token and user data in localStorage
5. Updates AuthContext state
6. Redirects to `/home`

### Logout Flow
1. User clicks logout button
2. Calls AuthContext's `logout` function
3. Clears localStorage (token and user data)
4. Updates AuthContext state
5. Redirects to landing page

## Security Features

### JWT Tokens
- Tokens are stored in localStorage
- Automatic token expiration handling
- Axios interceptors for automatic token inclusion in requests

### Password Security
- Passwords are hashed using bcrypt
- Minimum password length validation
- Secure password reset flow

### Route Protection
- PrivateRoute component prevents unauthorized access
- Automatic redirects for unauthenticated users
- Session persistence across page reloads

## Troubleshooting

### Common Issues

1. **Backend not running**
   - Make sure MongoDB is running
   - Check that all environment variables are set
   - Verify the server is running on port 5000

2. **CORS errors**
   - Backend has CORS enabled for development
   - Check that frontend is making requests to correct URL

3. **Authentication not persisting**
   - Check localStorage for token and user data
   - Verify AuthContext is properly initialized
   - Check browser console for errors

4. **Login/Register not working**
   - Verify backend endpoints are accessible
   - Check network tab for request/response details
   - Ensure all required fields are filled

### Testing Authentication Status
Visit `/auth-test` to see:
- Current authentication status
- User information (if logged in)
- Local storage contents
- Test logout functionality

## Future Enhancements

1. **Email Verification**: Add email verification for new accounts
2. **Social Login**: Integrate Google, Facebook, or GitHub login
3. **Two-Factor Authentication**: Implement 2FA for enhanced security
4. **Session Management**: Add session timeout and refresh tokens
5. **User Profiles**: Enhanced user profile management
6. **Admin Panel**: Admin interface for user management 