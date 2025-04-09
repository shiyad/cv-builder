type StatCardProps = {
  name: string;
  value: number | string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  change: string;
};

export function StatCard({ name, value, icon: Icon, change }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-900">{name}</h3>
        <div className="text-2xl font-semibold text-gray-900">{value}</div>
      </div>
      <div className="flex items-center text-sm text-gray-500">
        <Icon className="h-4 w-4 mr-2" />
        <span>{change}</span>
      </div>
    </div>
  );
}
