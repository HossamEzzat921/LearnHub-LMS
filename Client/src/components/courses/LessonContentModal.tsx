import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Youtube, Upload, FileText, Link, Check, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

export interface LessonContent {
  type: 'youtube' | 'video' | 'document';
  url?: string;
  fileName?: string;
  youtubeId?: string;
}

interface LessonContentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lessonTitle: string;
  currentContent?: LessonContent | null;
  onSave: (content: LessonContent) => void;
}

const extractYoutubeId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

const LessonContentModal = ({
  open,
  onOpenChange,
  lessonTitle,
  currentContent,
  onSave
}: LessonContentModalProps) => {
  const [activeTab, setActiveTab] = useState<string>(currentContent?.type || 'youtube');
  const [youtubeUrl, setYoutubeUrl] = useState(currentContent?.url || '');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [documentFile, setDocumentFile] = useState<File | null>(null);

  const handleSaveYoutube = () => {
    if (!youtubeUrl.trim()) {
      toast.error('Please enter a YouTube URL');
      return;
    }
    
    const youtubeId = extractYoutubeId(youtubeUrl.trim());
    if (!youtubeId) {
      toast.error('Invalid YouTube URL');
      return;
    }

    onSave({
      type: 'youtube',
      url: youtubeUrl.trim(),
      youtubeId
    });
    toast.success('YouTube video added!');
    onOpenChange(false);
  };

  const handleSaveVideo = () => {
    if (!videoFile) {
      toast.error('Please select a video file');
      return;
    }

    onSave({
      type: 'video',
      fileName: videoFile.name,
      url: URL.createObjectURL(videoFile)
    });
    toast.success('Video uploaded!');
    onOpenChange(false);
  };

  const handleSaveDocument = () => {
    if (!documentFile) {
      toast.error('Please select a document');
      return;
    }

    onSave({
      type: 'document',
      fileName: documentFile.name,
      url: URL.createObjectURL(documentFile)
    });
    toast.success('Document uploaded!');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Content: {lessonTitle || 'Untitled Lesson'}</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="youtube" className="gap-2">
              <Youtube className="h-4 w-4" />
              YouTube
            </TabsTrigger>
            <TabsTrigger value="video" className="gap-2">
              <Upload className="h-4 w-4" />
              Video
            </TabsTrigger>
            <TabsTrigger value="document" className="gap-2">
              <FileText className="h-4 w-4" />
              Document
            </TabsTrigger>
          </TabsList>

          {/* YouTube Tab */}
          <TabsContent value="youtube" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="youtube-url">YouTube URL</Label>
              <div className="relative">
                <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="youtube-url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="pl-10"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Paste a YouTube video URL. The video will be embedded in the lesson.
              </p>
            </div>

            {youtubeUrl && extractYoutubeId(youtubeUrl) && (
              <div className="rounded-lg overflow-hidden border border-border">
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${extractYoutubeId(youtubeUrl)}`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            <Button onClick={handleSaveYoutube} className="w-full gap-2">
              <Check className="h-4 w-4" />
              Save YouTube Video
            </Button>
          </TabsContent>

          {/* Video Upload Tab */}
          <TabsContent value="video" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Upload Video File</Label>
              <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
                {videoFile ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-primary">
                      <Check className="h-5 w-5" />
                      <span className="font-medium">{videoFile.name}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setVideoFile(null)}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop a video file, or click to browse
                    </p>
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      id="video-upload"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setVideoFile(file);
                      }}
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => document.getElementById('video-upload')?.click()}
                    >
                      Select Video
                    </Button>
                  </>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Supported formats: MP4, WebM, MOV. Max size: 500MB
              </p>
            </div>

            <Button 
              onClick={handleSaveVideo} 
              className="w-full gap-2"
              disabled={!videoFile}
            >
              <Check className="h-4 w-4" />
              Save Video
            </Button>
          </TabsContent>

          {/* Document Tab */}
          <TabsContent value="document" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Upload Document</Label>
              <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
                {documentFile ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-primary">
                      <FileText className="h-5 w-5" />
                      <span className="font-medium">{documentFile.name}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {(documentFile.size / 1024).toFixed(2)} KB
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setDocumentFile(null)}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <>
                    <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop a document, or click to browse
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                      className="hidden"
                      id="document-upload"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setDocumentFile(file);
                      }}
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => document.getElementById('document-upload')?.click()}
                    >
                      Select Document
                    </Button>
                  </>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Supported formats: PDF, DOC, DOCX, PPT, PPTX, TXT
              </p>
            </div>

            <Button 
              onClick={handleSaveDocument} 
              className="w-full gap-2"
              disabled={!documentFile}
            >
              <Check className="h-4 w-4" />
              Save Document
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LessonContentModal;
