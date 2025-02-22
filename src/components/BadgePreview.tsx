
import { Card } from "./ui/card";

interface BadgePreviewProps {
  employee: {
    name?: string;
    position?: string;
    department?: string;
    employeeId?: string;
    photo?: string;
  };
}

export const BadgePreview = ({ employee }: BadgePreviewProps) => {
  return (
    <Card className="w-64 h-96 p-4 mx-auto glass-card animate-scale-in">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden">
          {employee.photo ? (
            <img
              src={employee.photo}
              alt={employee.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Photo
            </div>
          )}
        </div>
        <div className="text-center space-y-2">
          <h3 className="font-semibold text-lg">{employee.name || "Name"}</h3>
          <p className="text-sm text-gray-600">{employee.position || "Position"}</p>
          <p className="text-sm text-gray-600">
            {employee.department || "Department"}
          </p>
          <p className="text-sm font-mono">{employee.employeeId || "ID: ####"}</p>
        </div>
      </div>
    </Card>
  );
};
