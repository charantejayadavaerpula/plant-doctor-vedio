
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Camera, Image, Video, CheckCircle } from "lucide-react";
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
    <div className="space-y-8">
      {/* Camera Options */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          onClick={() => openCamera('photo')}
          disabled={isAnalyzing}
          className="h-32 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-3xl flex flex-col items-center justify-center space-y-2 shadow-lg"
        >
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <Image className="h-6 w-6" />
          </div>
          <span className="font-semibold">Take Photo</span>
        </Button>
        
        <Button
          onClick={() => openCamera('video')}
          disabled={isAnalyzing}
          className="h-32 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-3xl flex flex-col items-center justify-center space-y-2 shadow-lg"
        >
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <Video className="h-6 w-6" />
          </div>
          <span className="font-semibold">Record Video</span>
        </Button>
      </div>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-3xl p-8 text-center transition-all duration-300 ${
          dragActive
            ? "border-green-400 bg-green-50 scale-[1.02]"
            : "border-gray-200 bg-white/60 backdrop-blur-sm hover:border-green-300 hover:bg-green-50/50"
        }`}
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(false);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(true);
        }}
        onDrop={(e) => {
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
        }}
      >
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
            <Upload className="h-10 w-10 text-gray-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Or Upload File</h3>
          <p className="text-gray-500 mb-6 leading-relaxed">
            Drag and drop or tap to select
            <br />
            <span className="text-sm">Images (JPG, PNG) or Videos (MP4, MOV)</span>
          </p>
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isAnalyzing}
            className="border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 px-8 py-3 rounded-2xl font-semibold"
          >
            <Upload className="h-5 w-5 mr-2" />
            Choose File
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*,image/*"
            onChange={(e) => {
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
            }}
            className="hidden"
          />
        </div>
      </div>

      {/* Selected File Display */}
      {selectedFile && (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mr-4 shadow-sm">
                {selectedFile.type.startsWith('video/') ? (
                  <Video className="h-7 w-7 text-white" />
                ) : (
                  <Image className="h-7 w-7 text-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-base truncate">{selectedFile.name}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {selectedFile.type.split('/')[1].toUpperCase()}
                </p>
              </div>
              <CheckCircle className="h-6 w-6 text-green-500 ml-3" />
            </div>
          </div>
        </div>
      )}

      {/* Analysis Button */}
      <Button
        onClick={handleAnalyze}
        disabled={!selectedFile || isAnalyzing}
        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-6 rounded-3xl text-lg font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        {isAnalyzing ? (
          <div className="flex items-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
            Analyzing Plant...
          </div>
        ) : (
          <>
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
              🔍
            </div>
            Get Plant Diagnosis
          </>
        )}
      </Button>

      {/* Info Section */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-3xl p-6 border border-blue-100">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center flex-shrink-0">
            <div className="text-white text-xl">🤖</div>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">AI-Powered Analysis</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              Our advanced AI analyzes your plant images and videos to detect diseases, pests, and nutrient deficiencies with high accuracy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
