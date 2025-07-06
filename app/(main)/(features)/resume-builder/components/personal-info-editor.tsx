'use client';

import { ResumeData } from './types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PersonalInfoEditorProps {
  personalInfo: ResumeData['personalInfo'];
  onUpdate: (field: string, value: string) => void;
}

export default function PersonalInfoEditor({ personalInfo, onUpdate }: PersonalInfoEditorProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</Label>
          <Input
            id="fullName"
            value={personalInfo.fullName}
            onChange={(e) => onUpdate('fullName', e.target.value)}
            placeholder="Enter your full name"
            className="text-gray-900 placeholder:text-gray-500"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
          <Input
            id="email"
            type="email"
            value={personalInfo.email}
            onChange={(e) => onUpdate('email', e.target.value)}
            placeholder="your.email@example.com"
            className="text-gray-900 placeholder:text-gray-500"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone</Label>
          <Input
            id="phone"
            value={personalInfo.phone}
            onChange={(e) => onUpdate('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="text-gray-900 placeholder:text-gray-500"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm font-medium text-gray-700">Location</Label>
          <Input
            id="location"
            value={personalInfo.location}
            onChange={(e) => onUpdate('location', e.target.value)}
            placeholder="City, State"
            className="text-gray-900 placeholder:text-gray-500"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="linkedin" className="text-sm font-medium text-gray-700">LinkedIn</Label>
          <Input
            id="linkedin"
            value={personalInfo.linkedin || ''}
            onChange={(e) => onUpdate('linkedin', e.target.value)}
            placeholder="linkedin.com/in/yourprofile"
            className="text-gray-900 placeholder:text-gray-500"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="portfolio" className="text-sm font-medium text-gray-700">Portfolio</Label>
          <Input
            id="portfolio"
            value={personalInfo.portfolio || ''}
            onChange={(e) => onUpdate('portfolio', e.target.value)}
            placeholder="yourportfolio.com"
            className="text-gray-900 placeholder:text-gray-500"
          />
        </div>
      </CardContent>
    </Card>
  );
} 