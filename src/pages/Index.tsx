
import { useState } from "react";
import { IdCard } from "lucide-react";
import { FileUpload } from "@/components/FileUpload";
import { CardDesigner } from "@/components/CardDesigner";
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
  const { toast } = useToast();

  const handleUpload = (data: Employee[]) => {
    setEmployeeData(data);
    toast({
      title: "File uploaded successfully",
      description: `${data.length} employees loaded`,
    });
  };

  return (
    <div className="container py-8 space-y-8">
      <div className="text-center space-y-4 animate-fade-up">
        <div className="inline-flex items-center space-x-2">
          <IdCard className="w-8 h-8" />
          <h1 className="text-3xl font-semibold">ID Card Designer</h1>
        </div>
        <p className="text-gray-600">
          Design professional ID cards with our drag-and-drop editor
        </p>
      </div>

      <CardDesigner />
    </div>
  );
};

export default Index;
