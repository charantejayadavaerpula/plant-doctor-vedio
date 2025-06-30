
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DiseaseReportProps {
  report: string;
}

export const DiseaseReport = ({ report }: DiseaseReportProps) => {
  const { toast } = useToast();

  const handleDownload = () => {
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `plant-disease-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Report downloaded",
      description: "Your plant disease report has been saved to your device"
    });
  };

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
    <Card className="mt-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Disease Analysis Report
          </CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
            {report}
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          <p>Report generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
        </div>
      </CardContent>
    </Card>
  );
};
