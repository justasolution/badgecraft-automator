
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface DataTableProps {
  data: any[];
  onSelectEmployee: (employee: any) => void;
}

export const DataTable = ({ data, onSelectEmployee }: DataTableProps) => {
  if (!data.length) return null;

  const headers = Object.keys(data[0]);

  return (
    <div className="w-full overflow-auto animate-fade-up">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => onSelectEmployee(row)}
            >
              {headers.map((header) => (
                <TableCell key={header}>{row[header]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
