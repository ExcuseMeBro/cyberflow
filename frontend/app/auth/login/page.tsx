'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardBody, CardHeader, Input, Button, Divider } from '@nextui-org/react';
import { useAuthStore, UserType } from '@/store/authStore';
import { Gamepad2, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userType, setUserType] = useState<UserType>('user');
  const { login } = useAuthStore();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(phone, password, userType);
      router.push('/home');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = () => {
    if (userType === 'user') {
      setPhone('+10000000000');
      setPassword('guest123');
    } else {
      setPhone('+20000000000');
      setPassword('parent123');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-md shadow-2xl animate-scale-in">
        <CardHeader className="flex flex-col gap-4 py-6">
          <h1 className="text-4xl font-bold text-center bg-gradient-passion bg-clip-text text-transparent animate-pulse-soft">
            CyberFlow
          </h1>
          <p className="text-sm text-gray-600 text-center">
            {userType === 'user' ? 'Sign in to continue streaming' : 'Parent control access'}
          </p>

          {/* User Type Toggle */}
          <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl">
            <motion.button
              type="button"
              onClick={() => {
                setUserType('user');
                setPhone('');
                setPassword('');
                setError('');
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all ${
                userType === 'user'
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
              onClick={() => {
                setUserType('parent');
                setPhone('');
                setPassword('');
                setError('');
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all ${
                userType === 'parent'
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
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Input
              type="tel"
              label="Phone Number"
              placeholder="+1234567890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              variant="bordered"
              isRequired
            />
            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="bordered"
              isRequired
            />

            {error && (
              <div className="text-sm text-red-500 text-center">
                {error}
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              isLoading={isLoading}
              className={`text-white font-semibold ${
                userType === 'user'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                  : 'bg-gradient-to-r from-blue-500 to-cyan-500'
              }`}
            >
              {userType === 'user' ? 'Sign In' : 'Access Control Panel'}
            </Button>
          </form>

          <Divider className="my-2" />

          <motion.div
            key={userType}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`rounded-xl p-4 border-2 smooth-transition ${
              userType === 'user'
                ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:border-purple-300'
                : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 hover:border-blue-300'
            }`}
          >
            <p className="text-sm font-semibold text-gray-700 mb-2">
              {userType === 'user' ? '🎮 Test Gamer Account:' : '👨‍👩‍👧‍👦 Test Parent Account:'}
            </p>
            <p className="text-xs text-gray-600 mb-1">
              Phone: <span className="font-mono font-semibold">{userType === 'user' ? '+10000000000' : '+20000000000'}</span>
            </p>
            <p className="text-xs text-gray-600 mb-3">
              Password: <span className="font-mono font-semibold">{userType === 'user' ? 'guest123' : 'parent123'}</span>
            </p>
            <Button
              size="sm"
              variant="flat"
              onPress={handleGuestLogin}
              className={`w-full smooth-transition hover:scale-105 ${
                userType === 'user'
                  ? 'bg-gradient-to-r from-purple-100 to-pink-100'
                  : 'bg-gradient-to-r from-blue-100 to-cyan-100'
              }`}
            >
              Use Test Account
            </Button>
          </motion.div>

          <div className="flex flex-col gap-2 mt-2">
            <p className="text-xs text-gray-500 text-center">
              Don&apos;t have an account?{' '}
              <a href="/auth/register" className="text-primary-600 font-semibold smooth-transition hover:text-primary-500">
                Sign up
              </a>
            </p>
            <p className="text-xs text-gray-500 text-center">
              <button
                onClick={() => {
                  localStorage.removeItem('onboardingCompleted');
                  router.push('/onboarding');
                }}
                className="text-purple-600 font-semibold smooth-transition hover:text-purple-500"
              >
                ← Back to onboarding
              </button>
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
