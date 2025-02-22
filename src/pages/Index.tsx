
import { useState } from "react";
import { IdCard, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/FileUpload";
import { BadgePreview } from "@/components/BadgePreview";
import { DataTable } from "@/components/DataTable";
import { useToast } from "@/hooks/use-toast";

interface Employee {
  employeeId: string;
  name: string;
  position: string;
  department: string;
  location: string;
  photo?: string;
}

const Index = () => {
  const [employeeData, setEmployeeData] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const { toast } = useToast();

  const handleUpload = (data: Employee[]) => {
    setEmployeeData(data);
    toast({
      title: "File uploaded successfully",
      description: `${data.length} employees loaded`,
    });
  };

  const handlePrintBadge = (employee: Employee) => {
    setSelectedEmployee(employee);
    setTimeout(() => {
      window.print();
    }, 100); // Small delay to ensure the preview updates
  };

  return (
    <div className="container py-8 space-y-8">
      <div className="text-center space-y-4 animate-fade-up">
        <div className="inline-flex items-center space-x-2">
          <IdCard className="w-8 h-8" />
          <h1 className="text-3xl font-semibold">Badge Generator</h1>
        </div>
        <p className="text-gray-600">
          Upload your employee data or use the sample data to generate professional badges
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <FileUpload onUpload={handleUpload} />
          <DataTable 
            data={employeeData} 
            onSelectEmployee={setSelectedEmployee}
            onPrintBadge={handlePrintBadge}
          />
        </div>

        <div className="space-y-6">
          <BadgePreview employee={selectedEmployee || {}} />
          <div className="flex justify-center">
            <Button
              onClick={() => selectedEmployee && handlePrintBadge(selectedEmployee)}
              className="animate-scale-in"
              disabled={!selectedEmployee}
            >
              <Printer className="w-4 h-4 mr-2" />
              Print Badge
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
