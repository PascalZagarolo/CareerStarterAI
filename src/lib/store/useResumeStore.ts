import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ResumeData } from '../../../app/(main)/(features)/resume-builder/components/types';
import { defaultResumeData } from '../../../app/(main)/(features)/resume-builder/components/data';

interface ResumeStoreState {
  resumeData: ResumeData;
  templateId: string;
  colorSchemeId: string;
  setResumeData: (data: ResumeData) => void;
  setTemplateId: (id: string) => void;
  setColorSchemeId: (id: string) => void;
}

export const useResumeStore = create<ResumeStoreState>()(
  persist(
    (set) => ({
      resumeData: defaultResumeData,
      templateId: defaultResumeData.template || 'professional-classic',
      colorSchemeId: 'navy-blue', // fallback, can be set from builder
      setResumeData: (data) => set({ resumeData: data }),
      setTemplateId: (id) => set({ templateId: id }),
      setColorSchemeId: (id) => set({ colorSchemeId: id }),
    }),
    { name: 'resume-store' }
  )
); 