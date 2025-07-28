import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, AlertCircle, User, UserPlus } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../hooks/useAuth';
import { APP_NAME } from '../utils/constants';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string; displayName?: string }>({});
  const { signUp, signInWithGoogleProvider, error, clearError, loading } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const errors: { email?: string; password?: string; displayName?: string } = {};
    let isValid = true;

    if (!displayName) {
      errors.displayName = 'Name is required';
      isValid = false;
    }

    if (!email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }

    if (!password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!validateForm()) return;

    try {
      await signUp(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithGoogleProvider();
      navigate('/dashboard');
    } catch (error) {
      console.error('Google sign up failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2">
          <div className="bg-gradient-to-r from-primary-600 to-accent-500 w-10 h-10 rounded-md flex items-center justify-center text-white font-bold text-lg">
            A
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-500">
            {APP_NAME}
          </span>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-neutral-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-600">
          Or{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-error-50 border border-error-300 text-error-700 px-4 py-3 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Input
                label="Full Name"
                id="displayName"
                name="displayName"
                type="text"
                autoComplete="name"
                leftIcon={<User size={16} />}
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                error={formErrors.displayName}
                required
              />
            </div>

            <div>
              <Input
                label="Email address"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                leftIcon={<Mail size={16} />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={formErrors.email}
                required
              />
            </div>

            <div>
              <Input
                label="Password"
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                leftIcon={<Lock size={16} />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={formErrors.password}
                helperText="Must be at least 6 characters"
                required
              />
            </div>

            <div>
              <Button
                type="submit"
                className="w-full"
                leftIcon={<UserPlus size={16} />}
                isLoading={loading}
              >
                Create account
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-neutral-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignUp}
                isLoading={loading}
              >
                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.495 16.87l-2.008-1.154c.706-.97 1.072-2.216 1.072-3.716 0-2.908-1.893-5-4.559-5-2.665 0-4.559 2.092-4.559 5 0 2.908 1.893 5 4.559 5 1.296 0 2.43-.418 3.276-1.189l2.02 1.16c-1.276 1.151-2.925 1.829-4.798 1.829-3.879 0-6.75-2.617-6.75-6.8 0-4.183 2.871-6.8 6.75-6.8 3.879 0 6.75 2.617 6.75 6.8 0 2.267-.987 4.196-2.753 5.37z"
                    fill="currentColor"
                  />
                </svg>
                Sign up with Google
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center text-sm">
            <p className="text-neutral-500">
              By signing up, you agree to our{' '}
              <Link to="/terms" className="font-medium text-primary-600 hover:text-primary-500">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="font-medium text-primary-600 hover:text-primary-500">
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          <div className="mt-8 text-center">
            <Link to="/" className="flex items-center justify-center font-medium text-primary-600 hover:text-primary-500">
              <ArrowLeft size={16} className="mr-1" />
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;