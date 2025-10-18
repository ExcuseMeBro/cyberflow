'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardBody, CardHeader, Input, Button, Divider } from '@nextui-org/react';
import { Gamepad2, Shield, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { UserType } from '@/store/authStore';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    userType: 'user' as UserType,
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.dateOfBirth || !formData.password) {
      setError('All fields are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userType: formData.userType,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          dateOfBirth: formData.dateOfBirth,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setSuccess(true);

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);

    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-md shadow-2xl animate-scale-in">
        <CardHeader className="flex flex-col gap-4 py-6">
          <h1 className="text-4xl font-bold text-center bg-gradient-passion bg-clip-text text-transparent animate-pulse-soft">
            Create Account
          </h1>
          <p className="text-sm text-gray-600 text-center">
            {formData.userType === 'user' ? 'Join the gaming community' : 'Create parent control account'}
          </p>

          {/* User Type Toggle */}
          <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl">
            <motion.button
              type="button"
              onClick={() => handleInputChange('userType', 'user')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all ${
                formData.userType === 'user'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <Gamepad2 className="w-5 h-5" />
              Gamer
            </motion.button>
            <motion.button
              type="button"
              onClick={() => handleInputChange('userType', 'parent')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all ${
                formData.userType === 'parent'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <Shield className="w-5 h-5" />
              Parent
            </motion.button>
          </div>
        </CardHeader>

        <CardBody className="gap-4 pb-6">
          {success ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-8"
            >
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">Success!</h2>
              <p className="text-gray-600">Redirecting to login...</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex gap-2">
                <Input
                  type="text"
                  label="First Name"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  variant="bordered"
                  isRequired
                />
                <Input
                  type="text"
                  label="Last Name"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  variant="bordered"
                  isRequired
                />
              </div>

              <Input
                type="tel"
                label="Phone Number"
                placeholder="+1234567890"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                variant="bordered"
                isRequired
              />

              <Input
                type="date"
                label="Date of Birth"
                placeholder="YYYY-MM-DD"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                variant="bordered"
                isRequired
                startContent={<Calendar className="w-4 h-4 text-gray-400" />}
              />

              <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                variant="bordered"
                isRequired
              />

              <Input
                type="password"
                label="Confirm Password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                variant="bordered"
                isRequired
              />

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500 text-center bg-red-50 p-3 rounded-lg"
                >
                  {error}
                </motion.div>
              )}

              <Button
                type="submit"
                size="lg"
                isLoading={isLoading}
                className={`text-white font-semibold ${
                  formData.userType === 'user'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                }`}
              >
                {formData.userType === 'user' ? 'Create Gamer Account' : 'Create Parent Account'}
              </Button>
            </form>
          )}

          {!success && (
            <>
              <Divider className="my-2" />
              <p className="text-xs text-gray-500 text-center">
                Already have an account?{' '}
                <a href="/auth/login" className="text-primary-600 font-semibold smooth-transition hover:text-primary-500">
                  Sign in
                </a>
              </p>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
