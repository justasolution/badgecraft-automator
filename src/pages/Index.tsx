
import { useState } from "react";
import { IdCard, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/FileUpload";
import { BadgePreview } from "@/components/BadgePreview";
import { DataTable } from "@/components/DataTable";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [employeeData, setEmployeeData] = useState<any[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const { toast } = useToast();

  const handleUpload = (data: any[]) => {
    setEmployeeData(data);
    toast({
      title: "File uploaded successfully",
      description: `${data.length} employees loaded`,
    });
  };

  const handlePrint = () => {
    if (!selectedEmployee) {
      toast({
        title: "No employee selected",
        description: "Please select an employee to print their badge",
        variant: "destructive",
      });
      return;
    }

    window.print();
  };

  return (
    <div className="container py-8 space-y-8">
      <div className="text-center space-y-4 animate-fade-up">
        <div className="inline-flex items-center space-x-2">
          <IdCard className="w-8 h-8" />
          <h1 className="text-3xl font-semibold">Badge Generator</h1>
        </div>
        <p className="text-gray-600">
          Upload your employee data and generate professional badges
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <FileUpload onUpload={handleUpload} />
          {employeeData.length > 0 && (
            <DataTable data={employeeData} onSelectEmployee={setSelectedEmployee} />
          )}
        </div>

        <div className="space-y-6">
          <BadgePreview employee={selectedEmployee || {}} />
          <div className="flex justify-center">
            <Button
              onClick={handlePrint}
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
