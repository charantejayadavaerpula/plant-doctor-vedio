
import { useState } from "react";
import { MediaUpload } from "@/components/MediaUpload";
import { DiseaseReport } from "@/components/DiseaseReport";
import { ArrowLeft, Home, History, Settings, Users, Leaf, Sun, Droplets } from "lucide-react";

const Index = () => {
  const [report, setReport] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-16 w-24 h-24 bg-emerald-200/30 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-20 w-40 h-40 bg-lime-200/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="relative px-6 py-8 pb-32">
        {/* Enhanced Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          {/* Logo with Animation */}
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-white/90 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto shadow-2xl border border-white/20 hover:scale-105 transition-all duration-300">
              <img 
                src="/lovable-uploads/4d3c17f7-561d-4920-b95d-b6e89e18aaff.png" 
                alt="KISAN-G Logo" 
                className="w-20 h-auto object-contain"
              />
            </div>
            {/* Floating Icons */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce delay-300">
              <Leaf className="h-4 w-4 text-white" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-bounce delay-700">
              <Droplets className="h-4 w-4 text-white" />
            </div>
          </div>

          {/* Title with Gradient */}
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-700 via-emerald-600 to-green-800 bg-clip-text text-transparent mb-4 leading-tight">
            Smart Plant Care
          </h1>
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            AI-Powered Disease Detection
          </h2>
          
          {/* Description with Icons */}
          <div className="max-w-md mx-auto mb-8">
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Upload photos or videos of your crops to get instant AI analysis and expert treatment recommendations
            </p>
            
            {/* Feature Cards */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-green-100 hover:bg-white/80 transition-all duration-300 hover:scale-105">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Sun className="h-5 w-5 text-white" />
                </div>
                <p className="text-xs font-medium text-gray-700">Fast Analysis</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-blue-100 hover:bg-white/80 transition-all duration-300 hover:scale-105">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Leaf className="h-5 w-5 text-white" />
                </div>
                <p className="text-xs font-medium text-gray-700">Expert Care</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-emerald-100 hover:bg-white/80 transition-all duration-300 hover:scale-105">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Droplets className="h-5 w-5 text-white" />
                </div>
                <p className="text-xs font-medium text-gray-700">Healthy Crops</p>
              </div>
            </div>
          </div>
        </div>

        <MediaUpload 
          onAnalysisComplete={setReport} 
          isAnalyzing={isAnalyzing} 
          setIsAnalyzing={setIsAnalyzing} 
        />
        
        {report && (
          <div className="animate-fade-in">
            <DiseaseReport report={report} />
          </div>
        )}
      </div>

      {/* Enhanced Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-green-100 shadow-2xl">
        <div className="px-6 py-4">
          <div className="flex justify-around items-center max-w-md mx-auto">
            <div className="flex flex-col items-center py-2 group">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-1 shadow-lg group-hover:scale-110 transition-all duration-300">
                <Home className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs text-green-600 font-semibold">Home</span>
            </div>
            <div className="flex flex-col items-center py-2 group">
              <div className="w-12 h-12 bg-gray-50 hover:bg-green-50 rounded-2xl flex items-center justify-center mb-1 transition-all duration-300 group-hover:scale-110">
                <History className="h-6 w-6 text-gray-400 group-hover:text-green-500" />
              </div>
              <span className="text-xs text-gray-400 group-hover:text-green-500 transition-colors">History</span>
            </div>
            <div className="flex flex-col items-center py-2 group">
              <div className="w-12 h-12 bg-gray-50 hover:bg-green-50 rounded-2xl flex items-center justify-center mb-1 transition-all duration-300 group-hover:scale-110">
                <Users className="h-6 w-6 text-gray-400 group-hover:text-green-500" />
              </div>
              <span className="text-xs text-gray-400 group-hover:text-green-500 transition-colors">Community</span>
            </div>
            <div className="flex flex-col items-center py-2 group">
              <div className="w-12 h-12 bg-gray-50 hover:bg-green-50 rounded-2xl flex items-center justify-center mb-1 transition-all duration-300 group-hover:scale-110">
                <Settings className="h-6 w-6 text-gray-400 group-hover:text-green-500" />
              </div>
              <span className="text-xs text-gray-400 group-hover:text-green-500 transition-colors">Settings</span>
            </div>
          </div>
        </div>
        {/* Safe area for phones with home indicators */}
        <div className="h-2 bg-transparent"></div>
      </div>
    </div>
  );
};

export default Index;
