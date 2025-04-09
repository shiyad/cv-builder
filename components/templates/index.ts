import { CVFormData, TemplateStyles } from "@/types";

export * from "./ClassicTemplate";
export * from "./ModernTemplate";
export * from "./CreativeTemplate";
export * from "./TwoColumnTemplate";
export * from "./AcademicTemplate";
export * from "./TechTemplate";
export * from "./ExecutiveTemplate";

export type TemplateProps = {
  formData: CVFormData;
  styles: TemplateStyles;
};
