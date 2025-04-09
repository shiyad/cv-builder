// components/template-styles.tsx
"use client";

export const getTemplateStyles = (templateConfig: any) => {
  const baseStyles = {
    background: {
      backgroundColor: templateConfig?.colors.background || "#f8fafc",
    },
    header: {
      color: templateConfig?.colors.primary || "#2563eb",
      borderColor: templateConfig?.colors.primary || "#2563eb",
    },
    sectionHeader: {
      color: templateConfig?.colors.primary || "#2563eb",
      borderColor: templateConfig?.colors.secondary || "#94a3b8",
    },
    skillBadge: {
      backgroundColor: templateConfig?.colors.secondary || "#e2e8f0",
      color: templateConfig?.colors.text || "#1e293b",
    },
  };

  // Add layout-specific styles
  if (templateConfig?.layout === "modern") {
    return {
      ...baseStyles,
      layout: {
        headerAlignment: "center",
        sectionSpacing: "1.5rem",
        cardPadding: "2rem",
      },
    };
  } else if (templateConfig?.layout === "creative") {
    return {
      ...baseStyles,
      layout: {
        headerAlignment: "left",
        sectionSpacing: "2rem",
        cardPadding: "1.5rem",
        sidebarWidth: "30%",
      },
    };
  }

  // Default classic layout
  return {
    ...baseStyles,
    layout: {
      headerAlignment: "left",
      sectionSpacing: "1rem",
      cardPadding: "1.5rem",
    },
  };
};
