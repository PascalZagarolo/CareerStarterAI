import { useLanguage } from '../i18n/language-context';

export function useTranslatedSectionTitle(sectionType: string): string {
  const { t } = useLanguage();
  
  const sectionTypeKey = sectionType as keyof typeof t.sections;
  return t.sections[sectionTypeKey] || sectionType;
} 