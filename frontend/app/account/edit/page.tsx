'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Textarea, Button, Avatar } from '@nextui-org/react';
import { ArrowLeft, Camera } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { useAuthStore } from '@/store/authStore';

export default function EditProfilePage() {
  const router = useRouter();
  const { user, updateUser } = useAuthStore();

  const [formData, setFormData] = useState({
    username: user?.username || 'AndrewAimsley',
    displayName: user?.displayName || 'AndrewAimsley',
    bio: user?.bio || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    discord: user?.links?.discord || 'https://discord.gg/AndrewAimsley',
    youtube: user?.links?.youtube || 'https://youtube.com/channel/AndrewAimsley',
    twitter: user?.links?.twitter || 'https://twitter.com/AndrewAimsley',
    instagram: user?.links?.instagram || 'https://instagram.com/AndrewAimsley',
    facebook: user?.links?.facebook || '',
    telegram: user?.links?.telegram || '',
    linkedin: user?.links?.linkedin || '',
  });

  const handleSave = () => {
    if (user) {
      updateUser({
        ...user,
        username: formData.username,
        displayName: formData.displayName,
        bio: formData.bio,
        links: {
          discord: formData.discord,
          youtube: formData.youtube,
          twitter: formData.twitter,
          instagram: formData.instagram,
          facebook: formData.facebook,
          telegram: formData.telegram,
          linkedin: formData.linkedin,
        },
      });
    }
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <Button
            isIconOnly
            variant="light"
            size="sm"
            onPress={() => router.back()}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold">Edit Channel Profile</h1>
          <Button
            size="sm"
            color="primary"
            onPress={handleSave}
            className="bg-gradient-to-r from-purple-600 to-pink-600"
          >
            Save
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <Avatar
              src={user?.avatar || 'https://i.pravatar.cc/150?img=1'}
              className="w-24 h-24"
            />
            <button className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full">
              <Camera className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold">ABOUT</h2>

          <Input
            label="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            variant="bordered"
          />

          <Input
            label="Display Name"
            value={formData.displayName}
            onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
            variant="bordered"
          />

          <Textarea
            label="Bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            variant="bordered"
            minRows={4}
            maxRows={6}
          />
        </div>

        {/* Social Links Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold">SOCIAL LINKS</h2>

          <Input
            label="Discord"
            value={formData.discord}
            onChange={(e) => setFormData({ ...formData, discord: e.target.value })}
            variant="bordered"
            placeholder="https://discord.gg/username"
          />

          <Input
            label="YouTube"
            value={formData.youtube}
            onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
            variant="bordered"
            placeholder="https://youtube.com/channel/username"
          />

          <Input
            label="Twitter"
            value={formData.twitter}
            onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
            variant="bordered"
            placeholder="https://twitter.com/username"
          />

          <Input
            label="Instagram"
            value={formData.instagram}
            onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
            variant="bordered"
            placeholder="https://instagram.com/username"
          />

          <Input
            label="Facebook"
            value={formData.facebook}
            onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
            variant="bordered"
            placeholder="https://facebook.com/username"
          />

          <Input
            label="Telegram"
            value={formData.telegram}
            onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
            variant="bordered"
            placeholder="https://t.me/username"
          />

          <Input
            label="LinkedIn"
            value={formData.linkedin}
            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
            variant="bordered"
            placeholder="https://linkedin.com/in/username"
          />
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
