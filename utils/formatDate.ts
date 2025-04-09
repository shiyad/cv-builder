export const formatDate = (dateString?: string): string => {
  if (!dateString) return "Present";
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
