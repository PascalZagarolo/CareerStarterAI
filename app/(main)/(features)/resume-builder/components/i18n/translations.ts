export type Language = 'en' | 'de';

export interface Translations {
  // Section titles
  sections: {
    summary: string;
    experience: string;
    education: string;
    skills: string;
    projects: string;
    certifications: string;
  };
  
  // Personal info labels
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    portfolio: string;
    profilePicture: string;
  };
  
  // UI elements
  ui: {
    content: string;
    design: string;
    language: string;
    templates: string;
    colorSchemes: string;
    addSection: string;
    removeSection: string;
    moveUp: string;
    moveDown: string;
    toggleVisibility: string;
    generateWithAI: string;
    generating: string;
    printView: string;
    downloadPDF: string;
    lastEdited: string;
    justNow: string;
    minutesAgo: string;
    hoursAgo: string;
    unsavedChanges: string;
    autoSaving: string;
    loadingTemplates: string;
    failedToLoadTemplates: string;
    tryAgain: string;
    resumeLoaded: string;
    resumeLoadError: string;
    pdfGenerated: string;
    pdfError: string;
  };
  
  // Placeholders
  placeholders: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    portfolio: string;
    summary: string;
    position: string;
    company: string;
    description: string;
    achievements: string;
    degree: string;
    field: string;
    institution: string;
    gpa: string;
    skill: string;
    projectName: string;
    technologies: string;
    certificationName: string;
    issuer: string;
    date: string;
  };
  
  // Messages
  messages: {
    languageDescription: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    sections: {
      summary: 'Professional Summary',
      experience: 'Work Experience',
      education: 'Education',
      skills: 'Skills',
      projects: 'Projects',
      certifications: 'Certifications',
    },
    personalInfo: {
      fullName: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
      linkedin: 'LinkedIn',
      portfolio: 'Portfolio',
      profilePicture: 'Profile Picture',
    },
    ui: {
      content: 'Content',
      design: 'Design',
      language: 'Language',
      templates: 'Templates',
      colorSchemes: 'Color Schemes',
      addSection: 'Add Section',
      removeSection: 'Remove Section',
      moveUp: 'Move Up',
      moveDown: 'Move Down',
      toggleVisibility: 'Toggle Visibility',
      generateWithAI: 'Generate with AI',
      generating: 'Generating...',
      printView: 'Print View',
      downloadPDF: 'Download PDF',
      lastEdited: 'Last edited',
      justNow: 'Just now',
      minutesAgo: 'minutes ago',
      hoursAgo: 'hours ago',
      unsavedChanges: 'You have unsaved changes',
      autoSaving: 'Auto-saving in 30 seconds...',
      loadingTemplates: 'Loading beautiful templates...',
      failedToLoadTemplates: 'Failed to Load Templates',
      tryAgain: 'Try Again',
      resumeLoaded: 'Resume loaded successfully',
      resumeLoadError: 'Failed to load resume',
      pdfGenerated: 'PDF generated successfully!',
      pdfError: 'Failed to generate PDF. Please try again.',
    },
    placeholders: {
      fullName: 'Enter your full name',
      email: 'your.email@example.com',
      phone: '+1 (555) 123-4567',
      location: 'City, State',
      linkedin: 'linkedin.com/in/yourprofile',
      portfolio: 'yourportfolio.com',
      summary: 'Write a compelling professional summary...',
      position: 'Job Title',
      company: 'Company Name',
      description: 'Describe your role and responsibilities...',
      achievements: 'Add your key achievements...',
      degree: 'Degree',
      field: 'Field of Study',
      institution: 'Institution Name',
      gpa: 'GPA (optional)',
      skill: 'Add a skill',
      projectName: 'Project Name',
      technologies: 'Technologies used',
      certificationName: 'Certification Name',
      issuer: 'Issuing Organization',
      date: 'Date',
    },
    messages: {
      languageDescription: 'Choose the language for your resume interface and section titles.',
    },
  },
  de: {
    sections: {
      summary: 'Berufliche Zusammenfassung',
      experience: 'Arbeitserfahrung',
      education: 'Ausbildung',
      skills: 'Fähigkeiten',
      projects: 'Projekte',
      certifications: 'Zertifizierungen',
    },
    personalInfo: {
      fullName: 'Vollständiger Name',
      email: 'E-Mail',
      phone: 'Telefon',
      location: 'Standort',
      linkedin: 'LinkedIn',
      portfolio: 'Portfolio',
      profilePicture: 'Profilbild',
    },
    ui: {
      content: 'Inhalt',
      design: 'Design',
      language: 'Sprache',
      templates: 'Vorlagen',
      colorSchemes: 'Farbschemata',
      addSection: 'Abschnitt hinzufügen',
      removeSection: 'Abschnitt entfernen',
      moveUp: 'Nach oben',
      moveDown: 'Nach unten',
      toggleVisibility: 'Sichtbarkeit umschalten',
      generateWithAI: 'Mit KI generieren',
      generating: 'Generiere...',
      printView: 'Druckansicht',
      downloadPDF: 'PDF herunterladen',
      lastEdited: 'Zuletzt bearbeitet',
      justNow: 'Gerade eben',
      minutesAgo: 'Minuten her',
      hoursAgo: 'Stunden her',
      unsavedChanges: 'Sie haben ungespeicherte Änderungen',
      autoSaving: 'Automatisches Speichern in 30 Sekunden...',
      loadingTemplates: 'Lade schöne Vorlagen...',
      failedToLoadTemplates: 'Vorlagen konnten nicht geladen werden',
      tryAgain: 'Erneut versuchen',
      resumeLoaded: 'Lebenslauf erfolgreich geladen',
      resumeLoadError: 'Lebenslauf konnte nicht geladen werden',
      pdfGenerated: 'PDF erfolgreich generiert!',
      pdfError: 'PDF konnte nicht generiert werden. Bitte versuchen Sie es erneut.',
    },
    placeholders: {
      fullName: 'Geben Sie Ihren vollständigen Namen ein',
      email: 'ihre.email@beispiel.com',
      phone: '+49 (0) 123 456789',
      location: 'Stadt, Bundesland',
      linkedin: 'linkedin.com/in/ihrprofil',
      portfolio: 'ihrportfolio.de',
      summary: 'Schreiben Sie eine überzeugende berufliche Zusammenfassung...',
      position: 'Berufsbezeichnung',
      company: 'Firmenname',
      description: 'Beschreiben Sie Ihre Rolle und Verantwortlichkeiten...',
      achievements: 'Fügen Sie Ihre wichtigsten Erfolge hinzu...',
      degree: 'Abschluss',
      field: 'Studienfach',
      institution: 'Institution Name',
      gpa: 'Notendurchschnitt (optional)',
      skill: 'Fähigkeit hinzufügen',
      projectName: 'Projektname',
      technologies: 'Verwendete Technologien',
      certificationName: 'Zertifizierungsname',
      issuer: 'Ausstellende Organisation',
      date: 'Datum',
    },
    messages: {
      languageDescription: 'Wählen Sie die Sprache für Ihre Lebenslauf-Oberfläche und Abschnittstitel.',
    },
  },
}; 