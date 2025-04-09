// components/template-styles.tsx
"use client";

export const getTemplateStyles = (templateConfig: any) => {
  const baseStyles = {
    colors: {
      primary: templateConfig?.colors.primary || "#2563eb",
      secondary: templateConfig?.colors.secondary || "#93c5fd",
      text: templateConfig?.colors.text || "#1e293b",
      background: templateConfig?.colors.background || "#f8fafc",
      cardBackground: templateConfig?.colors.cardBackground || "#ffffff",
    },
    typography: {
      fontFamily:
        templateConfig?.font === "serif"
          ? "font-serif"
          : templateConfig?.font === "monospace"
            ? "font-mono"
            : "font-sans",
      headerSize: "text-3xl",
      sectionHeaderSize: "text-xl",
    },
    spacing: {
      cardPadding: "1.5rem",
      sectionSpacing: "1.5rem",
    },
  };

  // Layout-specific overrides
  switch (templateConfig?.layout) {
    case "modern":
      return {
        ...baseStyles,
        layout: {
          type: "modern",
          headerAlignment: "center",
          sectionSpacing: "1.5rem",
          cardPadding: "2rem",
          sectionDividers: "border-b",
        },
      };
    case "creative":
      return {
        ...baseStyles,
        layout: {
          type: "creative",
          headerAlignment: "left",
          sectionSpacing: "2rem",
          cardPadding: "1.5rem",
          sidebarWidth: "30%",
          sectionDividers: "none",
        },
      };
    case "minimalist":
      return {
        ...baseStyles,
        colors: {
          ...baseStyles.colors,
          background: "#ffffff",
          cardBackground: "#ffffff",
        },
        layout: {
          type: "minimalist",
          headerAlignment: "left",
          sectionSpacing: "1rem",
          cardPadding: "1rem",
          sectionDividers: "none",
        },
      };
    case "two-column":
      return {
        ...baseStyles,
        layout: {
          type: "two-column",
          headerAlignment: "split",
          sectionSpacing: "1.25rem",
          cardPadding: "1.5rem",
          sectionDividers: "none",
        },
      };
    case "academic":
      return {
        ...baseStyles,
        typography: {
          ...baseStyles.typography,
          fontFamily: "font-serif",
        },
        layout: {
          type: "academic",
          headerAlignment: "left",
          sectionSpacing: "1.5rem",
          cardPadding: "1.5rem",
          sectionDividers: "border-b",
        },
      };
    case "tech":
      return {
        ...baseStyles,
        typography: {
          ...baseStyles.typography,
          fontFamily: "font-mono",
        },
        layout: {
          type: "tech",
          headerAlignment: "left",
          sectionSpacing: "1.25rem",
          cardPadding: "1.5rem",
          sectionDividers: "none",
        },
      };
    case "executive":
      return {
        ...baseStyles,
        colors: {
          ...baseStyles.colors,
          cardBackground: "#ffffff",
        },
        typography: {
          ...baseStyles.typography,
          fontFamily: "font-serif",
        },
        layout: {
          type: "executive",
          headerAlignment: "centered-name",
          sectionSpacing: "1.75rem",
          cardPadding: "2rem",
          sectionDividers: "border",
        },
      };
    default: // classic
      return {
        ...baseStyles,
        layout: {
          type: "classic",
          headerAlignment: "left",
          sectionSpacing: "1rem",
          cardPadding: "1.5rem",
          sectionDividers: "border-b",
        },
      };
  }
};
