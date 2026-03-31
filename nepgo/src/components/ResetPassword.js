import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
=======
import { useParams, useNavigate } from 'react-router-dom';
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
<<<<<<< HEAD
import api from '../services/api';

const paperSx = {
  p: 4,
  bgcolor: 'var(--surface)',
  color: 'var(--text-main)',
  border: '1px solid var(--border-color)',
  borderRadius: 2,
};

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const { token: pathToken } = useParams();
  const token = searchParams.get('token') || pathToken || '';
=======
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams();
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [tokenValid, setTokenValid] = useState(null);

  useEffect(() => {
    // Verify token validity on component mount
    const verifyToken = async () => {
      try {
<<<<<<< HEAD
        await api.get(`/api/auth/verify-reset-token/${encodeURIComponent(token)}`);
        setTokenValid(true);
      } catch {
=======
        await axios.get(`/api/auth/verify-reset-token/${token}`);
        setTokenValid(true);
      } catch (error) {
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
        setTokenValid(false);
        setError('Invalid or expired reset token. Please request a new password reset.');
      }
    };

    if (token) {
      verifyToken();
<<<<<<< HEAD
    } else {
      setTokenValid(false);
      setError('Missing reset token. Open the link from your email or paste the token in the URL (?token=…).');
=======
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
    }
  }, [token]);

  const validateForm = () => {
    const newErrors = {};

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
<<<<<<< HEAD
=======
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one lowercase letter, one uppercase letter, and one number';
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setMessage('');
    setError('');

    try {
<<<<<<< HEAD
      const response = await api.post('/reset-password', {
        token,
        newPassword: formData.password,
=======
      const response = await axios.post('/api/auth/reset-password', {
        token,
        password: formData.password
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
      });

      setMessage(response.data.message || 'Password reset successful! You can now log in with your new password.');
      
      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (error) {
      console.error('Password reset error:', error);
      setError(
        error.response?.data?.message || 
        'An error occurred while resetting your password. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  if (tokenValid === null) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
<<<<<<< HEAD
        <Paper elevation={0} sx={{ ...paperSx, textAlign: 'center' }}>
=======
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
          <CircularProgress />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Verifying reset token...
          </Typography>
        </Paper>
      </Container>
    );
  }

  if (tokenValid === false) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
<<<<<<< HEAD
        <Paper elevation={0} sx={{ ...paperSx, textAlign: 'center' }}>
=======
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
          <Typography variant="h4" component="h1" gutterBottom color="error">
            Invalid Token
          </Typography>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
          <Button
            variant="contained"
            onClick={() => navigate('/forgot-password')}
            sx={{ mr: 2 }}
          >
            Request New Reset
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/login')}
          >
            Back to Login
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
<<<<<<< HEAD
      <Paper elevation={0} sx={paperSx}>
=======
      <Paper elevation={3} sx={{ p: 4 }}>
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
          Reset Password
        </Typography>
        
        <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
          Enter your new password below
        </Typography>

        {message && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {message}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm New Password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={toggleConfirmPasswordVisibility}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                Resetting Password...
              </>
            ) : (
              'Reset Password'
            )}
          </Button>

          <Box textAlign="center">
            <Button
              variant="text"
              onClick={() => navigate('/login')}
              disabled={loading}
            >
              Back to Login
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ResetPassword;
