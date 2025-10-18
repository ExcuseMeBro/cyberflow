'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardBody, CardHeader, Input, Button, Divider } from '@nextui-org/react';
import { useAuthStore } from '@/store/authStore';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuthStore();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(phone, password);
      router.push('/home');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = () => {
    setPhone('+10000000000');
    setPassword('guest123');
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-md shadow-2xl animate-scale-in">
        <CardHeader className="flex flex-col gap-2 py-6">
          <h1 className="text-4xl font-bold text-center bg-gradient-passion bg-clip-text text-transparent animate-pulse-soft">
            CyberFlow
          </h1>
          <p className="text-sm text-gray-600 text-center">
            Sign in to continue streaming
          </p>
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
              className="btn-gradient text-white font-semibold"
            >
              Sign In
            </Button>
          </form>

          <Divider className="my-2" />

          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-4 border-2 border-primary-200 smooth-transition hover:border-primary-300">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              🎉 Guest Login:
            </p>
            <p className="text-xs text-gray-600 mb-1">
              Phone: <span className="font-mono font-semibold">+10000000000</span>
            </p>
            <p className="text-xs text-gray-600 mb-3">
              Password: <span className="font-mono font-semibold">guest123</span>
            </p>
            <Button
              size="sm"
              variant="flat"
              onClick={handleGuestLogin}
              className="w-full bg-gradient-to-r from-primary-100 to-secondary-100 smooth-transition hover:scale-105"
            >
              Use Guest Credentials
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-2">
            Don't have an account?{' '}
            <a href="#" className="text-primary-600 font-semibold smooth-transition hover:text-primary-500">
              Sign up
            </a>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
