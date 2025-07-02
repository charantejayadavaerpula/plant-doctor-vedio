
import { useState } from "react";
import { MediaUpload } from "@/components/MediaUpload";
import { DiseaseReport } from "@/components/DiseaseReport";
import { ArrowLeft, Home, History, Settings, Users } from "lucide-react";
const Index = () => {
  const [report, setReport] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  return <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Mobile Header */}
      

      {/* Main Content */}
      <div className="px-6 py-8 pb-24">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg overflow-hidden">
            <img 
              src="/lovable-uploads/4d3c17f7-561d-4920-b95d-b6e89e18aaff.png" 
              alt="KISAN-G Logo" 
              className="w-16 h-auto object-contain"
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
            AI Plant Disease
            <br />
            Detection
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-sm mx-auto">
            Upload a photo or video of your plant to get instant diagnosis and treatment recommendations
          </p>
        </div>

        <MediaUpload onAnalysisComplete={setReport} isAnalyzing={isAnalyzing} setIsAnalyzing={setIsAnalyzing} />
        
        {report && <DiseaseReport report={report} />}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 px-6 py-3 safe-area-pb">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <div className="flex flex-col items-center py-2">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-1">
              <Home className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-xs text-green-600 font-semibold">Home</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-1">
              <History className="h-6 w-6 text-gray-400" />
            </div>
            <span className="text-xs text-gray-400">History</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-1">
              <Users className="h-6 w-6 text-gray-400" />
            </div>
            <span className="text-xs text-gray-400">Community</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-1">
              <Settings className="h-6 w-6 text-gray-400" />
            </div>
            <span className="text-xs text-gray-400">Settings</span>
          </div>
        </div>
      </div>
    </div>;
};
export default Index;
