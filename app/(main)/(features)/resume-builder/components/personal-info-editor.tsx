'use client';

import { ResumeData } from './types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from './i18n/language-context';
import ProfilePictureUpload from './profile-picture-upload';

interface PersonalInfoEditorProps {
  personalInfo: ResumeData['personalInfo'];
  onUpdate: (field: string, value: string) => void;
}

export default function PersonalInfoEditor({ personalInfo, onUpdate }: PersonalInfoEditorProps) {
  const { t } = useLanguage();
  
  const handlePictureChange = (pictureUrl: string | undefined) => {
    onUpdate('profilePicture', pictureUrl || '');
  };
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Picture Upload */}
        <ProfilePictureUpload
          currentPicture={personalInfo.profilePicture}
          onPictureChange={handlePictureChange}
        />
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">{t.personalInfo.fullName}</Label>
            <Input
              id="fullName"
              value={personalInfo.fullName}
              onChange={(e) => onUpdate('fullName', e.target.value)}
              placeholder={t.placeholders.fullName}
              className="text-gray-900 placeholder:text-gray-500"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">{t.personalInfo.email}</Label>
            <Input
              id="email"
              type="email"
              value={personalInfo.email}
              onChange={(e) => onUpdate('email', e.target.value)}
              placeholder={t.placeholders.email}
              className="text-gray-900 placeholder:text-gray-500"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">{t.personalInfo.phone}</Label>
            <Input
              id="phone"
              value={personalInfo.phone}
              onChange={(e) => onUpdate('phone', e.target.value)}
              placeholder={t.placeholders.phone}
              className="text-gray-900 placeholder:text-gray-500"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium text-gray-700">{t.personalInfo.location}</Label>
            <Input
              id="location"
              value={personalInfo.location}
              onChange={(e) => onUpdate('location', e.target.value)}
              placeholder={t.placeholders.location}
              className="text-gray-900 placeholder:text-gray-500"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="linkedin" className="text-sm font-medium text-gray-700">{t.personalInfo.linkedin}</Label>
            <Input
              id="linkedin"
              value={personalInfo.linkedin || ''}
              onChange={(e) => onUpdate('linkedin', e.target.value)}
              placeholder={t.placeholders.linkedin}
              className="text-gray-900 placeholder:text-gray-500"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="portfolio" className="text-sm font-medium text-gray-700">{t.personalInfo.portfolio}</Label>
            <Input
              id="portfolio"
              value={personalInfo.portfolio || ''}
              onChange={(e) => onUpdate('portfolio', e.target.value)}
              placeholder={t.placeholders.portfolio}
              className="text-gray-900 placeholder:text-gray-500"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 