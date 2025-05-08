import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // General
    'app.title': 'IntervalFit Timer',
    'app.copyright': '© 2025 IntervalFit Timer | Designed for peak performance',
    
    // Volume Control
    'volume.label': 'Sound Volume',
    
    // Workout Selector
    'workout.configure': 'Configure Your Workout',
    'workout.sets': 'Number of Sets',
    'workout.workTime': 'Work Time (seconds)',
    'workout.restTime': 'Rest Time (seconds)',
    'workout.total': 'Total workout time',
    'workout.start': 'Start Workout',
    'workout.presets': 'Or Choose a Preset Workout',
    'workout.rounds': 'rounds',
    
    // Timer
    'timer.work': 'WORK',
    'timer.rest': 'REST',
    'timer.ready': 'READY',
    'timer.completed': 'COMPLETED',
    'timer.getReady': 'GET READY',
    'timer.done': 'DONE!',
    
    // Tools
    'tools.title': 'Fitness Tools',
    'tools.more': 'More Tools',
    'tools.comingSoon': 'Coming Soon',
    'tools.bmi.title': 'BMI Calculator',
    'tools.bmi.description': 'Calculate your Body Mass Index (BMI)',
    'tools.heartRate.title': 'Heart Rate Zones',
    'tools.heartRate.description': 'Calculate your training heart rate zones',
    'tools.pace.title': 'Pace Calculator',
    'tools.pace.description': 'Calculate running/cycling pace and split times',
    'tools.weight.title': 'Weight Tracker',
    'tools.weight.description': 'Track your weight progress over time',
    
    // Footer
    'footer.privacy': 'Privacy Policy',
    'footer.imprint': 'Imprint',
    
    // Privacy Policy
    'privacy.title': 'Privacy Policy',
    'privacy.data.title': '1. Data Collection',
    'privacy.data.content': 'We do not collect any personal data. All workout settings are stored locally in your browser.',
    'privacy.cookies.title': '2. Cookies',
    'privacy.cookies.content': 'This application does not use cookies or any other tracking mechanisms.',
    'privacy.thirdParty.title': '3. Third-Party Services',
    'privacy.thirdParty.content': 'We do not integrate with any third-party services that could collect user data.',
    'privacy.storage.title': '4. Data Storage',
    'privacy.storage.content': 'All workout configurations and settings are stored locally on your device and are never transmitted to any servers.',
    'privacy.contact.title': '5. Contact',
    'privacy.contact.content': 'For privacy-related questions, please contact us at ak92ziko@gmail.com',
    
    // Imprint
    'imprint.title': 'Imprint',
    'imprint.content': 'Angaben gemäß § 5 DDG:\nAlexander Knoth\nLudwigstr. 12B\n04315 Leipzig\nGermany\n\nContact\n\nEmail: ak92ziko@gmail.com'
  },
  de: {
    // General
    'app.title': 'IntervalFit Timer',
    'app.copyright': '© 2025 IntervalFit Timer | Entwickelt für Höchstleistung',
    
    // Volume Control
    'volume.label': 'Signallautstärke',
    
    // Workout Selector
    'workout.configure': 'Workout konfigurieren',
    'workout.sets': 'Anzahl der Sätze',
    'workout.workTime': 'Arbeitszeit (Sekunden)',
    'workout.restTime': 'Pausenzeit (Sekunden)',
    'workout.total': 'Gesamttrainingszeit',
    'workout.start': 'Workout starten',
    'workout.presets': 'Oder wähle ein vordefiniertes Workout',
    'workout.rounds': 'Runden',
    
    // Timer
    'timer.work': 'TRAINING',
    'timer.rest': 'PAUSE',
    'timer.ready': 'BEREIT',
    'timer.completed': 'BEENDET',
    'timer.getReady': 'MACH DICH BEREIT',
    'timer.done': 'FERTIG!',
    
    // Tools
    'tools.title': 'Fitness Tools',
    'tools.more': 'Weitere Tools',
    'tools.comingSoon': 'Demnächst verfügbar',
    'tools.bmi.title': 'BMI Rechner',
    'tools.bmi.description': 'Berechne deinen Body Mass Index (BMI)',
    'tools.heartRate.title': 'Herzfrequenzzonen',
    'tools.heartRate.description': 'Berechne deine Trainings-Herzfrequenzzonen',
    'tools.pace.title': 'Pace Rechner',
    'tools.pace.description': 'Berechne Lauf-/Rad-Tempo und Zwischenzeiten',
    'tools.weight.title': 'Gewichtstracker',
    'tools.weight.description': 'Verfolge deinen Gewichtsverlauf',
    
    // Footer
    'footer.privacy': 'Datenschutz',
    'footer.imprint': 'Impressum',
    
    // Privacy Policy
    'privacy.title': 'Datenschutzerklärung',
    'privacy.data.title': '1. Datenerfassung',
    'privacy.data.content': 'Wir erfassen keine personenbezogenen Daten. Alle Workout-Einstellungen werden lokal in Ihrem Browser gespeichert.',
    'privacy.cookies.title': '2. Cookies',
    'privacy.cookies.content': 'Diese Anwendung verwendet keine Cookies oder andere Tracking-Mechanismen.',
    'privacy.thirdParty.title': '3. Drittanbieterdienste',
    'privacy.thirdParty.content': 'Wir integrieren keine Drittanbieterdienste, die Benutzerdaten erfassen könnten.',
    'privacy.storage.title': '4. Datenspeicherung',
    'privacy.storage.content': 'Alle Workout-Konfigurationen und Einstellungen werden lokal auf Ihrem Gerät gespeichert und niemals an Server übertragen.',
    'privacy.contact.title': '5. Kontakt',
    'privacy.contact.content': 'Bei Fragen zum Datenschutz kontaktieren Sie uns bitte unter ak92ziko@gmail.com',
    
    // Imprint
    'imprint.title': 'Impressum',
    'imprint.content': 'Angaben gemäß § 5 DDG:\nAlexander Knoth\nLudwigstr. 12B\n04315 Leipzig\nGermany\n\nKontakt\n\nE-Mail: ak92ziko@gmail.com'
  }
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};