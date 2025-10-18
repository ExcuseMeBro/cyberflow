'use client';

import { useState } from 'react';
import { Card, CardBody, Avatar, Button, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input } from '@nextui-org/react';
import { ArrowLeft, UserPlus, Settings, Clock, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';

// Mock child accounts
const mockChildAccounts = [
  {
    id: 1,
    name: 'Test Gamer',
    username: 'testgamer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=testgamer',
    isOnline: true,
    age: 12,
    dailyLimit: 4,
    todayPlayTime: 3.5,
  },
];

export default function ChildAccountsPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    age: '',
    dailyLimit: '4',
  });

  return (
    <div className="min-h-screen bg-gradient-soft pb-24 animate-fade-in">
      {/* Header */}
      <PageHeader
        title="Child Accounts"
        leftContent={
          <Button
            isIconOnly
            variant="light"
            onPress={() => router.back()}
            size="sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        }
        rightContent={
          <Button
            size="sm"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            startContent={<UserPlus className="w-4 h-4" />}
            onPress={() => setIsModalOpen(true)}
          >
            Add Child
          </Button>
        }
      />

      {/* Content */}
      <div className="p-4 space-y-4 animate-slide-up">
        {mockChildAccounts.map((child) => (
          <Card key={child.id} className="shadow-md w-full" isPressable>
            <CardBody className="relative flex w-full flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <Avatar
                    src={child.avatar}
                    className="w-16 h-16"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                    child.isOnline ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{child.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">@{child.username}</p>
                  <div className="flex items-center gap-2">
                    <Chip size="sm" variant="flat" color="primary">
                      Age: {child.age}
                    </Chip>
                    <Chip
                      size="sm"
                      variant="flat"
                      color={child.isOnline ? 'success' : 'default'}
                    >
                      {child.isOnline ? 'Online' : 'Offline'}
                    </Chip>
                  </div>
                </div>
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                >
                  <Settings className="w-5 h-5" />
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <p className="text-xs text-gray-600">Today</p>
                  </div>
                  <p className="text-lg font-bold text-blue-600">
                    {child.todayPlayTime}h / {child.dailyLimit}h
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-4 h-4 text-purple-600" />
                    <p className="text-xs text-gray-600">Status</p>
                  </div>
                  <p className="text-lg font-bold text-purple-600">Protected</p>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  size="md"
                  variant="flat"
                  color="primary"
                  onPress={() => router.push('/parent-control')}
                >
                  Set Limits
                </Button>
                <Button
                  size="md"
                  variant="flat"
                  color="secondary"
                  onPress={() => router.push('/parent-stats')}
                >
                  View Stats
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}

        {/* Add Child Card */}
        <Card className="shadow-md border-2 border-dashed border-gray-300 w-full" isPressable>
          <CardBody className="relative flex w-full flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased p-6">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center mb-3">
                <UserPlus className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-base font-bold text-gray-800 mb-1">Add Another Child</h3>
              <p className="text-sm text-gray-500 mb-3">
                Create a new account for your child
              </p>
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                startContent={<UserPlus className="w-4 h-4" />}
                onPress={() => setIsModalOpen(true)}
              >
                Add Child Account
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Add Child Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="lg"
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
                    <UserPlus className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold">Add Child Account</h3>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="First Name"
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      variant="bordered"
                      isRequired
                    />
                    <Input
                      label="Last Name"
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      variant="bordered"
                      isRequired
                    />
                  </div>
                  <Input
                    label="Username"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    variant="bordered"
                    startContent={<span className="text-gray-400">@</span>}
                    isRequired
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="number"
                      label="Age"
                      placeholder="Enter age"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      variant="bordered"
                      isRequired
                    />
                    <Input
                      type="number"
                      label="Daily Limit (hours)"
                      placeholder="4"
                      value={formData.dailyLimit}
                      onChange={(e) => setFormData({ ...formData, dailyLimit: e.target.value })}
                      variant="bordered"
                      isRequired
                    />
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">
                      <strong>Note:</strong> You&apos;ll be able to configure additional settings like content filters, spending limits, and restrictions after creating the account.
                    </p>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="light"
                  onPress={onClose}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  onPress={() => {
                    // Here you would handle the actual account creation
                    console.log('Creating child account:', formData);
                    onClose();
                  }}
                >
                  Create Account
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <BottomNav />
    </div>
  );
}
