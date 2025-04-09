interface ProgressBarProps {
  level?: string; // Make level optional
  primaryColor: string;
  secondaryColor?: string;
  height?: number;
  showPercentage?: boolean;
}

export const ProgressBar = ({
  level = "", // Default empty string
  primaryColor,
  secondaryColor = primaryColor,
  height = 2.5,
  showPercentage = false,
}: ProgressBarProps) => {
  const percentage = (() => {
    const normalizedLevel = level?.toLowerCase() || "";
    switch (normalizedLevel) {
      case "expert":
        return 95;
      case "advanced":
        return 80;
      case "intermediate":
        return 60;
      case "beginner":
        return 35;
      default:
        return 0;
    }
  })();

  return (
    <div className="flex items-center gap-2">
      <div
        className="bg-gray-200 rounded-full overflow-hidden"
        style={{ height: `${height}px`, width: "100%" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            background: secondaryColor
              ? `linear-gradient(90deg, ${primaryColor} 0%, ${secondaryColor} 100%)`
              : primaryColor,
          }}
        />
      </div>
      {showPercentage && (
        <span className="text-xs text-gray-500 whitespace-nowrap">
          {percentage}%
        </span>
      )}
    </div>
  );
};
