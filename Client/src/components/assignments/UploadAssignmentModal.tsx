import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X, Upload, FileText, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UploadAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; description: string; file: File | null }) => void;
  mode: 'teacher' | 'student';
  assignmentTitle?: string;
}

const UploadAssignmentModal = ({ isOpen, onClose, onSubmit, mode, assignmentTitle }: UploadAssignmentModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async () => {
    setIsUploading(true);
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsUploading(false);
    setIsSuccess(true);
    
    setTimeout(() => {
      onSubmit({ title, description, file });
      setIsSuccess(false);
      setTitle('');
      setDescription('');
      setFile(null);
      onClose();
    }, 1000);
  };

  const isValid = mode === 'teacher' ? (title && description && file) : file;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-card p-6 rounded-2xl max-w-md w-full"
            onClick={e => e.stopPropagation()}
          >
            {isSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="font-display font-bold text-xl mb-2">
                  {mode === 'teacher' ? 'Assignment Uploaded!' : 'Submission Complete!'}
                </h2>
                <p className="text-muted-foreground">
                  {mode === 'teacher' 
                    ? 'Your assignment has been published to students.' 
                    : 'Your answer has been submitted successfully.'}
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display font-bold text-xl">
                    {mode === 'teacher' ? 'Upload Assignment' : `Submit: ${assignmentTitle}`}
                  </h2>
                  <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg transition-colors">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {mode === 'teacher' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-2">Assignment Title</label>
                        <Input
                          placeholder="Enter assignment title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <Textarea
                          placeholder="Describe the assignment..."
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          rows={3}
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {mode === 'teacher' ? 'Assignment PDF' : 'Your Answer (PDF)'}
                    </label>
                    <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
                      {file ? (
                        <div className="flex items-center justify-center gap-2">
                          <FileText className="h-5 w-5 text-primary" />
                          <span className="font-medium">{file.name}</span>
                          <button 
                            onClick={() => setFile(null)}
                            className="p-1 hover:bg-muted rounded"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Drag and drop or click to upload
                          </p>
                          <p className="text-xs text-muted-foreground mb-3">PDF files only</p>
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="hidden"
                            id="pdf-upload"
                          />
                          <label htmlFor="pdf-upload">
                            <Button variant="outline" size="sm" asChild>
                              <span>Browse Files</span>
                            </Button>
                          </label>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button variant="outline" className="flex-1" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      className="flex-1 hero-gradient text-primary-foreground"
                      disabled={!isValid || isUploading}
                      onClick={handleSubmit}
                    >
                      {isUploading ? 'Uploading...' : mode === 'teacher' ? 'Publish' : 'Submit'}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UploadAssignmentModal;
