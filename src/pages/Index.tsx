
import { useState } from "react";
import { MediaUpload } from "@/components/MediaUpload";
import { DiseaseReport } from "@/components/DiseaseReport";
import { Camera, Video, Image, Home, History, Users, Settings } from "lucide-react";

const Index = () => {
  const [report, setReport] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Plant Disease Detection
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-32">
        {!report ? (
          <div className="w-full max-w-md mx-auto">
            {/* Large Plant Image Display */}
            <div className="relative mb-8">
              <div className="w-full aspect-square bg-gradient-to-br from-green-400 to-green-600 rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/lovable-uploads/f9c0222d-267e-4cd1-9573-dbd50d79ff00.png" 
                  alt="Plant Disease Detection" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {/* Capture Button */}
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-gray-700 rounded-2xl flex items-center justify-center mb-3 shadow-lg hover:bg-gray-600 transition-colors">
                    <Camera className="h-8 w-8 text-white" />
                  </button>
                  <span className="text-sm font-medium text-gray-700">Capture</span>
                </div>

                {/* Capture Video Button */}
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-gray-700 rounded-2xl flex items-center justify-center mb-3 shadow-lg hover:bg-gray-600 transition-colors">
                    <Video className="h-8 w-8 text-white" />
                  </button>
                  <span className="text-sm font-medium text-gray-700">Capture Video</span>
                </div>

                {/* Upload from Gallery Button */}
                <div className="flex flex-col items-center">
                  <button className="w-16 h-16 bg-gray-700 rounded-2xl flex items-center justify-center mb-3 shadow-lg hover:bg-gray-600 transition-colors">
                    <Image className="h-8 w-8 text-white" />
                  </button>
                  <span className="text-sm font-medium text-gray-700 text-center">Upload from Gallery</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-4xl mx-auto animate-fade-in">
            <DiseaseReport report={report} />
          </div>
        )}

        {/* Hidden MediaUpload component for functionality */}
        <div className="hidden">
          <MediaUpload 
            onAnalysisComplete={setReport} 
            isAnalyzing={isAnalyzing} 
            setIsAnalyzing={setIsAnalyzing} 
          />
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="px-4 py-3">
          <div className="flex justify-around items-center max-w-md mx-auto">
            <div className="flex flex-col items-center py-2 group">
              <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center mb-1 shadow-lg">
                <Home className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs text-green-600 font-semibold">Home</span>
            </div>
            <div className="flex flex-col items-center py-2 group">
              <div className="w-12 h-12 bg-gray-100 hover:bg-green-50 rounded-2xl flex items-center justify-center mb-1 transition-all duration-300">
                <History className="h-6 w-6 text-gray-400 group-hover:text-green-500" />
              </div>
              <span className="text-xs text-gray-400 group-hover:text-green-500 transition-colors">History</span>
            </div>
            <div className="flex flex-col items-center py-2 group">
              <div className="w-12 h-12 bg-gray-100 hover:bg-green-50 rounded-2xl flex items-center justify-center mb-1 transition-all duration-300">
                <Users className="h-6 w-6 text-gray-400 group-hover:text-green-500" />
              </div>
              <span className="text-xs text-gray-400 group-hover:text-green-500 transition-colors">Community</span>
            </div>
            <div className="flex flex-col items-center py-2 group">
              <div className="w-12 h-12 bg-gray-100 hover:bg-green-50 rounded-2xl flex items-center justify-center mb-1 transition-all duration-300">
                <Settings className="h-6 w-6 text-gray-400 group-hover:text-green-500" />
              </div>
              <span className="text-xs text-gray-400 group-hover:text-green-500 transition-colors">Settings</span>
            </div>
          </div>
        </div>
        <div className="h-2 bg-transparent"></div>
      </div>
    </div>
  );
};

export default Index;
