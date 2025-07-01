import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, RotateCcw, Zap, Timer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CameraCaptureProps {
  onCapture: (file: File) => void;
  onClose: () => void;
  mode: 'photo' | 'video';
}

export const CameraCapture = ({ onCapture, onClose, mode }: CameraCaptureProps) => {
  const [isActive, setIsActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: mode === 'video'
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera access denied",
        description: "Please allow camera access to capture images/videos",
        variant: "destructive"
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    if (context) {
      context.drawImage(videoRef.current, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `photo-${Date.now()}.jpg`, { type: 'image/jpeg' });
          onCapture(file);
          stopCamera();
        }
      }, 'image/jpeg', 0.9);
    }
  };

  const startVideoRecording = () => {
    if (!streamRef.current) return;

    chunksRef.current = [];
    const mediaRecorder = new MediaRecorder(streamRef.current);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/mp4' });
      const file = new File([blob], `video-${Date.now()}.mp4`, { type: 'video/mp4' });
      onCapture(file);
      stopCamera();
    };

    mediaRecorder.start();
    setIsRecording(true);
    setRecordingTime(0);
    
    recordingIntervalRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const stopVideoRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
        recordingIntervalRef.current = null;
      }
    }
  };

  const handleCapture = () => {
    if (mode === 'photo') {
      capturePhoto();
    } else {
      if (isRecording) {
        stopVideoRecording();
      } else {
        startVideoRecording();
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Status Bar Area */}
      <div className="h-12 bg-black flex items-center justify-center">
        {isRecording && (
          <div className="flex items-center space-x-2 text-white">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm font-mono">{formatTime(recordingTime)}</span>
          </div>
        )}
      </div>

      {/* Camera Preview */}
      <div className="flex-1 relative overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        
        {/* Camera Overlay */}
        <div className="absolute inset-0">
          {/* Top Controls */}
          <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent">
            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 border-0"
              >
                <X className="h-5 w-5" />
              </Button>
              
              <div className="flex space-x-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 border-0"
                >
                  <Zap className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 border-0"
                >
                  <Timer className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 border-0"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Center Guide */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 border-2 border-white/30 rounded-2xl relative">
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-green-400 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-green-400 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-green-400 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-green-400 rounded-br-lg" />
            </div>
          </div>

          {/* Mode Indicator */}
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
            <div className="bg-black/40 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="text-white text-sm font-medium">
                {mode === 'photo' ? 'PHOTO' : 'VIDEO'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="h-32 bg-black flex items-center justify-center px-8">
        <div className="flex items-center justify-between w-full max-w-sm">
          {/* Gallery Button */}
          <div className="w-12 h-12 bg-white/10 rounded-xl border border-white/20 flex items-center justify-center">
            <div className="w-8 h-8 bg-white/20 rounded" />
          </div>

          {/* Capture Button */}
          <Button
            onClick={handleCapture}
            disabled={!isActive}
            className={`w-20 h-20 rounded-full border-4 transition-all duration-200 ${
              mode === 'video' && isRecording 
                ? 'bg-red-500 hover:bg-red-600 border-red-300 scale-95' 
                : 'bg-white hover:bg-gray-100 border-white shadow-lg hover:scale-105'
            }`}
          >
            {mode === 'photo' ? (
              <div className="w-4 h-4 bg-black rounded-sm" />
            ) : isRecording ? (
              <div className="w-6 h-6 bg-white rounded-sm" />
            ) : (
              <div className="w-6 h-6 bg-red-500 rounded-full" />
            )}
          </Button>

          {/* Switch Camera Button */}
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20"
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Safe Area Bottom */}
      <div className="h-8 bg-black" />
    </div>
  );
};
