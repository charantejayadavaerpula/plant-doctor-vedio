
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Video, AlertCircle } from "lucide-react";
import { analyzeVideo } from "@/lib/geminiService";
import { useToast } from "@/hooks/use-toast";

interface VideoUploadProps {
  onAnalysisComplete: (report: string) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;
}

export const VideoUpload = ({ onAnalysisComplete, isAnalyzing, setIsAnalyzing }: VideoUploadProps) => {
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
    const videoFile = files.find(file => file.type.startsWith('video/'));
    
    if (videoFile) {
      setSelectedFile(videoFile);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a video file",
        variant: "destructive"
      });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a video file",
        variant: "destructive"
      });
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    try {
      const report = await analyzeVideo(selectedFile);
      onAnalysisComplete(report);
      toast({
        title: "Analysis complete!",
        description: "Your plant disease report is ready"
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your video. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Video className="h-5 w-5 mr-2" />
          Upload Plant Video
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? "border-green-500 bg-green-50"
              : "border-gray-300 hover:border-green-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-700 mb-2">
            Drop your plant video here or click to browse
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Supports MP4, MOV, AVI files up to 50MB
          </p>
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isAnalyzing}
          >
            Choose File
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {selectedFile && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Video className="h-5 w-5 text-green-600 mr-2" />
                <div>
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="bg-green-600 hover:bg-green-700"
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Plant"}
              </Button>
            </div>
          </div>
        )}

        <div className="bg-blue-50 rounded-lg p-4 flex items-start">
          <AlertCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Tips for best results:</p>
            <ul className="space-y-1">
              <li>• Record the affected plant parts clearly</li>
              <li>• Ensure good lighting conditions</li>
              <li>• Keep the video steady and focused</li>
              <li>• Include close-up shots of symptoms</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
