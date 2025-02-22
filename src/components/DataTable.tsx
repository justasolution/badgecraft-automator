
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Printer } from "lucide-react";

interface Employee {
  employeeId: string;
  name: string;
  position: string;
  department: string;
  location: string;
  photo?: string;
}

interface DataTableProps {
  data: Employee[];
  onSelectEmployee: (employee: Employee) => void;
  onPrintBadge: (employee: Employee) => void;
}

export const DataTable = ({ data, onSelectEmployee, onPrintBadge }: DataTableProps) => {
  const columns = [
    { key: "employeeId", label: "Employee ID" },
    { key: "name", label: "Name" },
    { key: "position", label: "Position" },
    { key: "department", label: "Department" },
    { key: "location", label: "Location" },
  ];

  // Sample data for demonstration
  const sampleData: Employee[] = [
    {
      employeeId: "EMP001",
      name: "John Doe",
      position: "Software Engineer",
      department: "Engineering",
      location: "New York",
    },
    {
      employeeId: "EMP002",
      name: "Jane Smith",
      position: "Product Manager",
      department: "Product",
      location: "San Francisco",
    },
    {
      employeeId: "EMP003",
      name: "Mike Johnson",
      position: "UX Designer",
      department: "Design",
      location: "London",
    },
  ];

  const displayData = data.length > 0 ? data : sampleData;

  return (
    <div className="w-full overflow-auto animate-fade-up border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>{column.label}</TableHead>
            ))}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayData.map((row, index) => (
            <TableRow
              key={index}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => onSelectEmployee(row)}
            >
              {columns.map((column) => (
                <TableCell key={column.key}>{row[column.key as keyof Employee]}</TableCell>
              ))}
              <TableCell className="text-right">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPrintBadge(row);
                  }}
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Generate Badge
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
