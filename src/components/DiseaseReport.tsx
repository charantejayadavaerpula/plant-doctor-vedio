
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Download, AlertTriangle, Lightbulb, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DiseaseReportProps {
  report: string;
}

export const DiseaseReport = ({ report }: DiseaseReportProps) => {
  const { toast } = useToast();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Plant Disease Analysis Report',
          text: report,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(report);
      toast({
        title: "Report copied",
        description: "The report has been copied to your clipboard"
      });
    }
  };

  // Parse the report to organize content
  const parseReport = (reportText: string) => {
    const sections = {
      diagnosis: '',
      symptoms: '',
      treatment: '',
      prevention: ''
    };

    // Simple parsing logic - you can enhance this based on your AI response format
    const lines = reportText.split('\n').filter(line => line.trim());
    let currentSection = 'diagnosis';
    
    lines.forEach(line => {
      const lowerLine = line.toLowerCase();
      if (lowerLine.includes('symptom') || lowerLine.includes('sign')) {
        currentSection = 'symptoms';
      } else if (lowerLine.includes('treatment') || lowerLine.includes('cure') || lowerLine.includes('remedy')) {
        currentSection = 'treatment';
      } else if (lowerLine.includes('prevention') || lowerLine.includes('prevent')) {
        currentSection = 'prevention';
      }
      
      sections[currentSection as keyof typeof sections] += line + '\n';
    });

    return sections;
  };

  const sections = parseReport(report);

  return (
    <div className="mt-12 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Analysis Report</h3>
          <p className="text-gray-500 text-sm mt-1">Generated on {new Date().toLocaleDateString()}</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm" onClick={handleShare} className="rounded-2xl">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm" className="rounded-2xl">
            <Download className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      {/* Report Cards */}
      <div className="space-y-4">
        {/* Main Diagnosis */}
        <Card className="border-red-100 bg-gradient-to-r from-red-50 to-orange-50 rounded-3xl overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900">Diagnosis</h4>
                <p className="text-red-600 text-sm font-medium">Plant Health Assessment</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                {sections.diagnosis || report.split('\n').slice(0, 3).join('\n')}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Symptoms */}
        {sections.symptoms && (
          <Card className="border-yellow-100 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-3xl overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center">
                  <div className="text-white text-xl">🔍</div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">Symptoms Identified</h4>
                  <p className="text-yellow-600 text-sm font-medium">Observable Signs</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{sections.symptoms}</p>
            </CardContent>
          </Card>
        )}

        {/* Treatment */}
        {sections.treatment && (
          <Card className="border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">Treatment Recommendations</h4>
                  <p className="text-green-600 text-sm font-medium">Suggested Actions</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{sections.treatment}</p>
            </CardContent>
          </Card>
        )}

        {/* Prevention */}
        {sections.prevention && (
          <Card className="border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">Prevention Tips</h4>
                  <p className="text-blue-600 text-sm font-medium">Future Care</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{sections.prevention}</p>
            </CardContent>
          </Card>
        )}

        {/* Full Report Fallback */}
        {!sections.symptoms && !sections.treatment && !sections.prevention && (
          <Card className="border-gray-100 bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-500 rounded-2xl flex items-center justify-center">
                  <div className="text-white text-xl">📋</div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">Detailed Analysis</h4>
                  <p className="text-gray-600 text-sm font-medium">Complete Report</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{report}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Disclaimer */}
      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          <strong>Disclaimer:</strong> This AI analysis is for informational purposes only. 
          For severe plant issues, consult with a professional horticulturist or plant pathologist.
        </p>
      </div>
    </div>
  );
};
