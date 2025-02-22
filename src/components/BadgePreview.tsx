
import { Card } from "./ui/card";
import { QrCode, Signature } from "lucide-react";

interface BadgePreviewProps {
  employee: {
    name?: string;
    position?: string;
    department?: string;
    employeeId?: string;
    photo?: string;
    bloodGroup?: string;
    email?: string;
    phone?: string;
    issueDate?: string;
    guardian?: string;
  };
}

export const BadgePreview = ({ employee }: BadgePreviewProps) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  return (
    <div className="flex flex-col gap-4 badge-preview">
      {/* Front of the card */}
      <Card className="w-[340px] h-[520px] p-6 mx-auto glass-card animate-scale-in bg-gradient-to-b from-white to-gray-50">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/2befb7fa-f337-4887-9d7b-fac42d1d5b2b.png" 
              alt="Logo" 
              className="w-8 h-8 object-contain"
            />
            <h2 className="text-xl font-semibold text-gray-800">eCard Generator Pro</h2>
          </div>
          
          <div className="w-40 h-40 border-4 border-gray-200 overflow-hidden">
            {employee.photo ? (
              <img
                src={employee.photo}
                alt={employee.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                No Photo
              </div>
            )}
          </div>

          <div className="w-full space-y-3 text-left">
            <div className="flex items-center gap-2">
              <span className="text-gray-500 w-24">Holder ID:</span>
              <span className="font-mono">{employee.employeeId || "123456789"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 w-24">Full Name:</span>
              <span>{employee.name || "Employee Name"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 w-24">Guardian:</span>
              <span>{employee.guardian || "Guardian Name"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 w-24">Phone:</span>
              <span>{employee.phone || "Contact Number"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 w-24">Email:</span>
              <span className="text-sm">{employee.email || "email@example.com"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 w-24">Blood Group:</span>
              <span>{employee.bloodGroup || "O+"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 w-24">Designation:</span>
              <span>{employee.position || "Position"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 w-24">Issue Date:</span>
              <span>{currentDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 w-24">Address:</span>
              <span className="text-sm">{employee.department || "Department"}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Back of the card */}
      <Card className="w-[340px] h-[520px] p-6 mx-auto glass-card animate-scale-in bg-gradient-to-b from-white to-gray-50">
        <div className="flex flex-col items-center justify-between h-full">
          <div className="text-center space-y-4">
            <img 
              src="/lovable-uploads/2befb7fa-f337-4887-9d7b-fac42d1d5b2b.png" 
              alt="Logo" 
              className="w-12 h-12 mx-auto"
            />
            <h2 className="text-xl font-semibold text-gray-800">eCard Generator Pro</h2>
          </div>

          <div className="text-center space-y-2 text-sm text-gray-600">
            <p>* Always Display ID-Card</p>
            <p>* Notify to administrator in case of loss.</p>
            <p>* If lost and found please return to the</p>
            <p>nearest police station.</p>
          </div>

          <div className="w-full space-y-4">
            <div className="border-b border-gray-300 pb-4">
              <Signature className="w-32 h-16 mx-auto text-blue-600" />
              <p className="text-center text-sm text-gray-600">Authorised Signature</p>
            </div>

            <div className="flex justify-center">
              <QrCode className="w-32 h-32" />
            </div>

            <p className="text-center text-sm text-gray-600">
              Property of eCard Generator Pro
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
