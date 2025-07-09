import { useState } from "react";
import { MediaUpload } from "@/components/MediaUpload";
import { DiseaseReport } from "@/components/DiseaseReport";
import { Camera, Video, Image, Home, History, Users, Settings } from "lucide-react";
const Index = () => {
  const [report, setReport] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  return <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-xl sm:text-4xl font-bold text-gray-900 mb-2">Plant Disease Detector by &lt;charan&gt;</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-32">
        {!report ? <div className="w-full max-w-md mx-auto">
            {/* Large Plant Image Display */}
            <div className="relative mb-8">
              <div className="w-full aspect-square bg-gradient-to-br from-green-400 to-green-600 rounded-3xl overflow-hidden shadow-2xl">
                <img src="/lovable-uploads/f9c0222d-267e-4cd1-9573-dbd50d79ff00.png" alt="Plant Disease Detection" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Show MediaUpload component for functionality */}
            <MediaUpload onAnalysisComplete={setReport} isAnalyzing={isAnalyzing} setIsAnalyzing={setIsAnalyzing} />
          </div> : <div className="w-full max-w-4xl mx-auto animate-fade-in">
            <DiseaseReport report={report} />
          </div>}

      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        
        <div className="h-2 bg-transparent"></div>
      </div>
    </div>;
};
export default Index;