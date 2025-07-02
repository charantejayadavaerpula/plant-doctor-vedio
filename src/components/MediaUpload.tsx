
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Camera, Image, Video, CheckCircle, Sparkles, Zap } from "lucide-react";
import { analyzeMedia } from "@/lib/geminiService";
import { useToast } from "@/hooks/use-toast";
import { CameraCapture } from "./CameraCapture";

interface MediaUploadProps {
  onAnalysisComplete: (report: string) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;
}

export const MediaUpload = ({ onAnalysisComplete, isAnalyzing, setIsAnalyzing }: MediaUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraMode, setCameraMode] = useState<'photo' | 'video'>('photo');
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
        description: "Your plant disease report is ready",
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

  const handleCameraCapture = (file: File) => {
    setSelectedFile(file);
    setShowCamera(false);
  };

  const openCamera = (mode: 'photo' | 'video') => {
    setCameraMode(mode);
    setShowCamera(true);
  };

  if (showCamera) {
    return (
      <CameraCapture
        mode={cameraMode}
        onCapture={handleCameraCapture}
        onClose={() => setShowCamera(false)}
      />
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Enhanced Camera Options */}
      <div className="flex gap-4 justify-center">
        <Button
          onClick={() => openCamera('photo')}
          disabled={isAnalyzing}
          className="h-14 px-8 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 hover:from-green-600 hover:via-emerald-600 hover:to-green-700 text-white rounded-2xl flex items-center space-x-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0"
        >
          <Camera className="h-5 w-5" />
          <span className="font-semibold">Take Photo</span>
        </Button>
        
        <Button
          onClick={() => openCamera('video')}
          disabled={isAnalyzing}
          className="h-14 px-8 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 hover:from-blue-600 hover:via-indigo-600 hover:to-blue-700 text-white rounded-2xl flex items-center space-x-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0"
        >
          <Video className="h-5 w-5" />
          <span className="font-semibold">Record Video</span>
        </Button>
      </div>

      {/* Enhanced Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-3xl p-8 text-center transition-all duration-500 hover:shadow-xl ${
          dragActive
            ? "border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 scale-[1.02] shadow-lg"
            : "border-green-200 bg-white/70 backdrop-blur-sm hover:border-green-300 hover:bg-gradient-to-br hover:from-green-50/50 hover:to-emerald-50/50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {/* Small Upload Button */}
        <div className="absolute top-4 right-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isAnalyzing}
            className="bg-white/90 backdrop-blur-sm border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 px-3 py-1.5 rounded-lg text-xs font-medium shadow-sm"
          >
            <Upload className="h-3 w-3 mr-1" />
            Upload File
          </Button>
        </div>

        <div className="relative flex flex-col items-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl flex items-center justify-center mb-6 shadow-lg hover:scale-110 transition-transform duration-300">
            <Upload className="h-10 w-10 text-green-600" />
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-3">Upload Plant Media</h3>
          <p className="text-gray-600 mb-6 text-base leading-relaxed max-w-sm">
            Drag and drop your plant photos or videos here, or tap to browse your files
          </p>
          
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isAnalyzing}
            className="border-2 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 px-8 py-3 rounded-2xl font-semibold text-base hover:scale-105 transition-all duration-300"
          >
            <Upload className="h-5 w-5 mr-3" />
            Choose Files
          </Button>
          
          <p className="text-xs text-gray-500 mt-4">
            Supports JPG, PNG, MP4, MOV • Max 50MB
          </p>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*,image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </div>

      {/* Enhanced Selected File Display */}
      {selectedFile && (
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-green-100 shadow-lg animate-scale-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                {selectedFile.type.startsWith('video/') ? (
                  <Video className="h-8 w-8 text-white" />
                ) : (
                  <Image className="h-8 w-8 text-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 text-base truncate">{selectedFile.name}</p>
                <p className="text-sm text-gray-600 mt-1 flex items-center">
                  <span>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                  <span className="mx-2">•</span>
                  <span className="uppercase font-medium">{selectedFile.type.split('/')[1]}</span>
                </p>
              </div>
              <div className="ml-4">
                <CheckCircle className="h-7 w-7 text-green-500" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Analysis Button */}
      <Button
        onClick={handleAnalyze}
        disabled={!selectedFile || isAnalyzing}
        className="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 hover:from-green-700 hover:via-emerald-700 hover:to-green-800 text-white py-6 rounded-3xl text-lg font-bold shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] border-0"
      >
        {isAnalyzing ? (
          <div className="flex items-center">
            <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
            <Sparkles className="h-5 w-5 mr-2 animate-pulse" />
            Analyzing Your Plant...
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Zap className="h-6 w-6 mr-3" />
            Get Instant Plant Diagnosis
            <Sparkles className="h-5 w-5 ml-3" />
          </div>
        )}
      </Button>

      {/* Enhanced Info Section */}
      <div className="bg-gradient-to-r from-blue-50 via-green-50 to-emerald-50 rounded-3xl p-6 border border-blue-100 shadow-lg">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-green-500 to-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2 text-base">AI-Powered Smart Analysis</h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              Our advanced AI technology analyzes your plant images and videos to detect diseases, identify pests, and diagnose nutrient deficiencies with expert-level accuracy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
