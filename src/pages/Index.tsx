import { useState } from "react";
import { MediaUpload } from "@/components/MediaUpload";
import { DiseaseReport } from "@/components/DiseaseReport";
import { ArrowLeft, Home, History, Settings, Users, Leaf, Sun, Droplets } from "lucide-react";
const Index = () => {
  const [report, setReport] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  return <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 relative overflow-hidden">
      {/* Decorative Background Elements - Different for mobile/desktop */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-20 sm:w-32 h-20 sm:h-32 bg-green-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-20 sm:top-40 right-8 sm:right-16 w-16 sm:w-24 h-16 sm:h-24 bg-emerald-200/30 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-16 sm:bottom-32 left-10 sm:left-20 w-24 sm:w-40 h-24 sm:h-40 bg-lime-200/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Main Content - Mobile: Compact padding, Desktop: Spacious */}
      <div className="relative px-4 sm:px-6 py-4 sm:py-8 pb-20 sm:pb-32">
        {/* Hero Section - Mobile: Smaller, Desktop: Larger */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          {/* Logo with Animation - Mobile: Smaller, Desktop: Larger */}
          <div className="relative mb-6 sm:mb-8">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto shadow-2xl border border-white/20 hover:scale-105 transition-all duration-300">
              <img src="/lovable-uploads/4d3c17f7-561d-4920-b95d-b6e89e18aaff.png" alt="KISAN-G Logo" className="w-16 sm:w-20 h-auto object-contain" />
            </div>
            {/* Floating Icons - Mobile: Smaller, Desktop: Larger */}
            <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce delay-300">
              <Leaf className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
            <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center animate-bounce delay-700">
              <Droplets className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
          </div>

          {/* Title with Gradient - Mobile: Smaller, Desktop: Larger */}
          
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4 sm:mb-6">
            AI-Powered Disease Detection
          </h2>
          
          {/* Description - Mobile: Compact, Desktop: Spacious */}
          <div className="max-w-sm sm:max-w-md mx-auto mb-6 sm:mb-8">
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 px-2 sm:px-0">
              Upload photos or videos of your crops to get instant AI analysis and expert treatment recommendations
            </p>
            
            {/* Feature Cards - Mobile: Smaller grid, Desktop: Inline */}
            
          </div>
        </div>

        <MediaUpload onAnalysisComplete={setReport} isAnalyzing={isAnalyzing} setIsAnalyzing={setIsAnalyzing} />
        
        {report && <div className="animate-fade-in mt-4 sm:mt-0">
            <DiseaseReport report={report} />
          </div>}
      </div>

      {/* Bottom Navigation - Mobile: Compact, Desktop: Standard */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-green-100 shadow-2xl">
        <div className="px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-around items-center max-w-sm sm:max-w-md mx-auto">
            <div className="flex flex-col items-center py-1 sm:py-2 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-1 shadow-lg group-hover:scale-110 transition-all duration-300">
                <Home className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <span className="text-xs text-green-600 font-semibold">Home</span>
            </div>
            <div className="flex flex-col items-center py-1 sm:py-2 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-50 hover:bg-green-50 rounded-xl sm:rounded-2xl flex items-center justify-center mb-1 transition-all duration-300 group-hover:scale-110">
                <History className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 group-hover:text-green-500" />
              </div>
              <span className="text-xs text-gray-400 group-hover:text-green-500 transition-colors">History</span>
            </div>
            <div className="flex flex-col items-center py-1 sm:py-2 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-50 hover:bg-green-50 rounded-xl sm:rounded-2xl flex items-center justify-center mb-1 transition-all duration-300 group-hover:scale-110">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 group-hover:text-green-500" />
              </div>
              <span className="text-xs text-gray-400 group-hover:text-green-500 transition-colors">Community</span>
            </div>
            <div className="flex flex-col items-center py-1 sm:py-2 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-50 hover:bg-green-50 rounded-xl sm:rounded-2xl flex items-center justify-center mb-1 transition-all duration-300 group-hover:scale-110">
                <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 group-hover:text-green-500" />
              </div>
              <span className="text-xs text-gray-400 group-hover:text-green-500 transition-colors">Settings</span>
            </div>
          </div>
        </div>
        {/* Safe area for phones with home indicators */}
        <div className="h-1 sm:h-2 bg-transparent"></div>
      </div>
    </div>;
};
export default Index;