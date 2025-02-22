
import { useState } from "react";
import { Upload } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

export const FileUpload = ({ onUpload }: { onUpload: (data: any[]) => void }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer?.files[0];
    if (file) processFile(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const rows = text.split("\n");
      const headers = rows[0].split(",");
      
      const data = rows.slice(1).map((row) => {
        const values = row.split(",");
        return headers.reduce((obj: any, header, index) => {
          obj[header.trim()] = values[index]?.trim();
          return obj;
        }, {});
      });

      onUpload(data);
    };
    reader.readAsText(file);
  };

  return (
    <Card
      className={`relative h-48 transition-all duration-300 ${
        isDragging ? "border-primary" : "border-dashed"
      } glass-card animate-fade-up`}
      onDragOver={handleDrag}
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <Upload className="w-10 h-10 mb-4 text-gray-400" />
        <p className="mb-2 text-sm text-gray-600">
          Drag and drop your CSV file here, or
        </p>
        <Button
          variant="outline"
          onClick={() => document.getElementById("file-input")?.click()}
        >
          Browse Files
        </Button>
        <input
          id="file-input"
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileInput}
        />
      </div>
    </Card>
  );
};
