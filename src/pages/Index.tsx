
import { useState } from "react";
import { MediaUpload } from "@/components/MediaUpload";
import { DiseaseReport } from "@/components/DiseaseReport";
import { ArrowLeft, Home, History, Settings } from "lucide-react";

const Index = () => {
  const [report, setReport] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <ArrowLeft className="h-6 w-6 text-gray-600" />
        <h1 className="text-lg font-semibold text-gray-900">Plant Diagnosis</h1>
        <div className="w-6" /> {/* Spacer */}
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Upload an image or video of a plant
          </h2>
          <p className="text-gray-600">
            Get a diagnosis for your plant
          </p>
        </div>

        <MediaUpload 
          onAnalysisComplete={setReport}
          isAnalyzing={isAnalyzing}
          setIsAnalyzing={setIsAnalyzing}
        />
        
        {report && (
          <DiseaseReport report={report} />
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around items-center">
          <div className="flex flex-col items-center py-2">
            <Home className="h-6 w-6 text-green-600 mb-1" />
            <span className="text-xs text-green-600 font-medium">Home</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <History className="h-6 w-6 text-gray-400 mb-1" />
            <span className="text-xs text-gray-400">History</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <div className="h-6 w-6 mb-1 flex items-center justify-center">
              <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-400 rounded-full -ml-1"></div>
            </div>
            <span className="text-xs text-gray-400">Community</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <Settings className="h-6 w-6 text-gray-400 mb-1" />
            <span className="text-xs text-gray-400">Settings</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
