export interface ContactInformation {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  job_title?: string;
  profile_picture?: string;
}

export interface ExperienceItem {
  company?: string;
  position?: string;
  start_date?: string;
  end_date?: string;
  current?: boolean;
  description?: string;
}

export interface EducationItem {
  institution?: string;
  degree?: string;
  field_of_study?: string;
  start_date?: string;
  end_date?: string;
  current?: boolean;
  description?: string;
}

export interface SkillItem {
  name?: string;
  level?: string;
}

export interface LanguageItem {
  language?: string;
  proficiency?: string;
}

export interface PublicationItem {
  title?: string;
  publisher?: string;
  date?: string;
  url?: string;
  description?: string;
}

export interface CertificationItem {
  name?: string;
  issuer?: string;
  date?: string;
  description?: string;
}

export interface AchievementItem {
  title?: string;
  date?: string;
}

export interface ReferenceItem {
  name?: string;
  company?: string;
  contact?: string;
  position?: string;
}

export interface CVFormData {
  contact_information?: ContactInformation;
  objective?: {
    summary?: string;
  };
  experience?: ExperienceItem[];
  education?: EducationItem[];
  skills?: SkillItem[];
  languages?: LanguageItem[];
  publications?: PublicationItem[];
  certifications?: CertificationItem[];
  achievements?: AchievementItem[];
  references?: ReferenceItem[];
  is_public?: boolean;
}

export interface TemplateConfig {
  colors: {
    tertiary?: string;
    primary: string;
    primaryText?: string;
    secondary: string;
    text: string;
    background: string;
    cardBackground?: string;
  };
  typography: {
    fontFamily: string;
    headerSize: string;
    sectionHeaderSize: string;
  };
  layout: {
    type: string;
    [key: string]: any;
  };
}

export interface TemplateStyles {
  colors: TemplateConfig["colors"];
  typography: TemplateConfig["typography"];
  layout: TemplateConfig["layout"];
}
