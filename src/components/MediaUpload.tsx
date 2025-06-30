
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Camera } from "lucide-react";
import { analyzeMedia } from "@/lib/geminiService";
import { useToast } from "@/hooks/use-toast";

interface MediaUploadProps {
  onAnalysisComplete: (report: string) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;
}

export const MediaUpload = ({ onAnalysisComplete, isAnalyzing, setIsAnalyzing }: MediaUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    const mediaFile = files.find(file => 
      file.type.startsWith('video/') || file.type.startsWith('image/')
    );
    
    if (mediaFile) {
      setSelectedFile(mediaFile);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a video or image file",
        variant: "destructive"
      });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type.startsWith('video/') || file.type.startsWith('image/'))) {
      setSelectedFile(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a video or image file",
        variant: "destructive"
      });
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    try {
      const report = await analyzeMedia(selectedFile);
      onAnalysisComplete(report);
      toast({
        title: "Analysis complete!",
        description: "Your plant disease report is ready"
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your file. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${
          dragActive
            ? "border-green-500 bg-green-50"
            : "border-gray-300 bg-white"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
            <Camera className="h-8 w-8 text-gray-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload</h3>
          <p className="text-sm text-gray-500 mb-4">
            Tap to select image or video
          </p>
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isAnalyzing}
            className="border-gray-300"
          >
            Choose File
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*,image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </div>

      {/* Selected File Display */}
      {selectedFile && (
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                {selectedFile.type.startsWith('video/') ? (
                  <div className="w-4 h-4 bg-green-600 rounded-sm"></div>
                ) : (
                  <div className="w-4 h-4 bg-green-600 rounded"></div>
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">{selectedFile.name}</p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Get Diagnosis Button */}
      <Button
        onClick={handleAnalyze}
        disabled={!selectedFile || isAnalyzing}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl text-lg font-semibold"
      >
        {isAnalyzing ? "Analyzing..." : "Get Diagnosis"}
      </Button>

      {/* Description */}
      <div className="flex items-start space-x-3 px-2">
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
          <div className="w-3 h-3 border-2 border-green-600 rounded-full"></div>
          <div className="w-2 h-1 bg-green-600 rounded-full -ml-1 mt-1"></div>
        </div>
        <div>
          <p className="text-gray-900 font-medium">
            Get a plant disease diagnosis for gardeners and farmers
          </p>
        </div>
      </div>
    </div>
  );
};
