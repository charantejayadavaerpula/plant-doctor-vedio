
import { useState } from "react";
import { VideoUpload } from "@/components/VideoUpload";
import { DiseaseReport } from "@/components/DiseaseReport";
import { Leaf } from "lucide-react";

const Index = () => {
  const [report, setReport] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="h-12 w-12 text-green-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Plant Vision AI</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload a video of your plant to get an AI-powered disease analysis and treatment recommendations
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <VideoUpload 
            onAnalysisComplete={setReport}
            isAnalyzing={isAnalyzing}
            setIsAnalyzing={setIsAnalyzing}
          />
          
          {report && (
            <DiseaseReport report={report} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
