import { useEffect, useRef, useState } from "react";
import { Canvas, Image as FabricImage, Rect, Text, IEvent } from "fabric";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { 
  Image, 
  Type, 
  LayoutGrid, 
  Download,
  Plus,
  Minus,
  Move
} from "lucide-react";

const CARD_WIDTH = 340;
const CARD_HEIGHT = 520;

export const CardDesigner = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [zoom, setZoom] = useState(100);
  
  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new Canvas(canvasRef.current, {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      backgroundColor: '#6366f1',
    });

    // Enable object controls
    fabricCanvas.on('object:moving', (e: IEvent) => {
      const obj = e.target;
      if (!obj) return;
      
      // Keep objects within bounds
      const bound = obj.getBoundingRect();
      if (bound.top < 0) obj.set('top', 0);
      if (bound.left < 0) obj.set('left', 0);
      if (bound.top + bound.height > CARD_HEIGHT) {
        obj.set('top', CARD_HEIGHT - bound.height);
      }
      if (bound.left + bound.width > CARD_WIDTH) {
        obj.set('left', CARD_WIDTH - bound.width);
      }
    });

    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  const addText = () => {
    if (!canvas) return;
    const text = new Text('Double click to edit', {
      left: 50,
      top: 50,
      fontSize: 16,
      fill: '#ffffff'
    });
    text.on('dblclick', () => {
      // Make text editable on double click
      text.enterEditing();
    });
    canvas.add(text);
    canvas.renderAll();
  };

  const addShape = () => {
    if (!canvas) return;
    const rect = new Rect({
      left: 50,
      top: 50,
      fill: '#ffffff',
      width: 100,
      height: 100,
      opacity: 0.7
    });
    canvas.add(rect);
    canvas.renderAll();
  };

  const handleZoom = (delta: number) => {
    const newZoom = Math.min(Math.max(zoom + delta, 50), 150);
    setZoom(newZoom);
    if (!canvas) return;
    
    canvas.setZoom(newZoom / 100);
    canvas.renderAll();
  };

  const downloadDesign = () => {
    if (!canvas) return;
    const dataUrl = canvas.toDataURL({
      format: 'png',
      quality: 1
    });
    const link = document.createElement('a');
    link.download = 'id-card-design.png';
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="flex gap-4">
      {/* Tools Panel */}
      <Card className="p-4 w-48 space-y-4">
        <h3 className="font-semibold">Tools</h3>
        
        <div className="space-y-2">
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            onClick={addText}
          >
            <Type className="w-4 h-4 mr-2" />
            Add Text
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={addShape}
          >
            <LayoutGrid className="w-4 h-4 mr-2" />
            Add Shape
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-start"
          >
            <Image className="w-4 h-4 mr-2" />
            Add Image
          </Button>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Zoom</h4>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleZoom(-10)}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="text-sm">{zoom}%</span>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleZoom(10)}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Button 
          className="w-full"
          onClick={downloadDesign}
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </Card>

      {/* Canvas Area */}
      <Card className="p-4 flex-1 overflow-auto bg-gray-50">
        <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
          <Move className="w-4 h-4" />
          Drag elements to position them
        </div>
        <div className="inline-block border border-gray-200 shadow-lg">
          <canvas ref={canvasRef} />
        </div>
      </Card>
    </div>
  );
};
