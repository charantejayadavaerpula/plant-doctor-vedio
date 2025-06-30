
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, Share2 } from "lucide-react";
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

  return (
    <div className="mt-8 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Diagnosis Report</h3>
        <Button variant="outline" size="sm" onClick={handleShare}>
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>

      {/* Report Content */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="whitespace-pre-wrap text-gray-800 leading-relaxed text-sm">
          {report}
        </div>
      </div>

      {/* Report Info */}
      <div className="text-xs text-gray-500 text-center">
        Report generated on {new Date().toLocaleDateString()}
      </div>
    </div>
  );
};
