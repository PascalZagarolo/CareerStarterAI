'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface HeaderProps {
  onDownloadPDF: () => void;
}

export default function Header({ onDownloadPDF }: HeaderProps) {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI Resume Builder</h1>
            <p className="text-gray-600">Create a professional resume in minutes</p>
          </div>
          <Button
            onClick={onDownloadPDF}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
} 