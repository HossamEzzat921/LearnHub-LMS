import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, Plus, Trash2, Upload, 
  BookOpen, DollarSign, Video, FileText, GripVertical, Save, Youtube, Link2, CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';
import LessonContentModal, { LessonContent } from '@/components/courses/LessonContentModal';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'document' | 'quiz';
  content?: LessonContent | null;
}

interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

const CreateCourse = () => {
  const navigate = useNavigate();
  const [contentModalOpen, setContentModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<{ sectionId: string; lesson: Lesson } | null>(null);
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    level: '',
    price: '',
    thumbnail: null as File | null,
  });
  const [sections, setSections] = useState<Section[]>([
    { id: '1', title: 'Introduction', lessons: [] }
  ]);

  const categories = [
    'Mathematics', 'Science', 'Languages', 'Programming', 
    'Business', 'Arts', 'History', 'Music'
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'];

  const addSection = () => {
    setSections([...sections, { 
      id: Date.now().toString(), 
      title: `Section ${sections.length + 1}`, 
      lessons: [] 
    }]);
  };

  const removeSection = (sectionId: string) => {
    if (sections.length > 1) {
      setSections(sections.filter(s => s.id !== sectionId));
    }
  };

  const updateSectionTitle = (sectionId: string, title: string) => {
    setSections(sections.map(s => 
      s.id === sectionId ? { ...s, title } : s
    ));
  };

  const addLesson = (sectionId: string) => {
    setSections(sections.map(s => 
      s.id === sectionId 
        ? { ...s, lessons: [...s.lessons, { 
            id: Date.now().toString(), 
            title: '', 
            duration: '10:00',
            type: 'video' as const
          }] }
        : s
    ));
  };

  const removeLesson = (sectionId: string, lessonId: string) => {
    setSections(sections.map(s => 
      s.id === sectionId 
        ? { ...s, lessons: s.lessons.filter(l => l.id !== lessonId) }
        : s
    ));
  };

  const updateLesson = (sectionId: string, lessonId: string, field: keyof Lesson, value: string | LessonContent | null) => {
    setSections(sections.map(s => 
      s.id === sectionId 
        ? { ...s, lessons: s.lessons.map(l => 
            l.id === lessonId ? { ...l, [field]: value } : l
          )}
        : s
    ));
  };

  const openContentModal = (sectionId: string, lesson: Lesson) => {
    setSelectedLesson({ sectionId, lesson });
    setContentModalOpen(true);
  };

  const handleSaveContent = (content: LessonContent) => {
    if (selectedLesson) {
      updateLesson(selectedLesson.sectionId, selectedLesson.lesson.id, 'content', content);
    }
  };

  const handlePublish = () => {
    if (!courseData.title || !courseData.description || !courseData.category) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Course published successfully!');
    navigate('/teacher/dashboard');
  };

  const handleSaveDraft = () => {
    toast.success('Course saved as draft');
  };

  const totalLessons = sections.reduce((acc, s) => acc + s.lessons.length, 0);

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate('/teacher/dashboard')}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-display font-bold text-2xl">Create New Course</h1>
                <p className="text-muted-foreground">Fill in the details to create your course</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleSaveDraft} className="gap-2">
                <Save className="h-4 w-4" />
                Save Draft
              </Button>
              <Button onClick={handlePublish} className="hero-gradient text-primary-foreground">
                Publish Course
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Course Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Complete JavaScript Masterclass"
                    value={courseData.title}
                    onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what students will learn..."
                    rows={4}
                    value={courseData.description}
                    onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select 
                      value={courseData.category}
                      onValueChange={(value) => setCourseData({ ...courseData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Level</Label>
                    <Select 
                      value={courseData.level}
                      onValueChange={(value) => setCourseData({ ...courseData, level: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {levels.map(level => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Course Thumbnail</Label>
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                    <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop an image, or click to browse
                    </p>
                    <Button variant="outline" size="sm">
                      Upload Image
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Curriculum */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-primary" />
                  Course Curriculum
                </CardTitle>
                <Button onClick={addSection} variant="outline" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Section
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {sections.map((section, sectionIndex) => (
                  <div 
                    key={section.id} 
                    className="border border-border rounded-lg overflow-hidden"
                  >
                    <div className="bg-muted/50 p-4 flex items-center gap-3">
                      <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                      <Input
                        value={section.title}
                        onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                        className="font-medium bg-transparent border-none p-0 h-auto focus-visible:ring-0"
                        placeholder="Section title"
                      />
                      <div className="ml-auto flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => addLesson(section.id)}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Lesson
                        </Button>
                        {sections.length > 1 && (
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => removeSection(section.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>

                    {section.lessons.length > 0 && (
                      <div className="p-4 space-y-3">
                        {section.lessons.map((lesson, lessonIndex) => (
                          <div 
                            key={lesson.id}
                            className="flex items-center gap-2 sm:gap-3 p-3 bg-background border border-border rounded-lg flex-wrap sm:flex-nowrap"
                          >
                            <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab hidden sm:block" />
                            <span className="text-sm text-muted-foreground w-8">
                              {sectionIndex + 1}.{lessonIndex + 1}
                            </span>
                            <Select
                              value={lesson.type}
                              onValueChange={(value) => updateLesson(section.id, lesson.id, 'type', value)}
                            >
                              <SelectTrigger className="w-24 sm:w-28">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="video">
                                  <div className="flex items-center gap-2">
                                    <Video className="h-3 w-3" />
                                    Video
                                  </div>
                                </SelectItem>
                                <SelectItem value="document">
                                  <div className="flex items-center gap-2">
                                    <FileText className="h-3 w-3" />
                                    Document
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <Input
                              value={lesson.title}
                              onChange={(e) => updateLesson(section.id, lesson.id, 'title', e.target.value)}
                              placeholder="Lesson title"
                              className="flex-1 min-w-[120px]"
                            />
                            <Input
                              value={lesson.duration}
                              onChange={(e) => updateLesson(section.id, lesson.id, 'duration', e.target.value)}
                              placeholder="10:00"
                              className="w-16 sm:w-20 text-center"
                            />
                            {/* Content Button */}
                            <Button 
                              variant={lesson.content ? "default" : "outline"}
                              size="sm"
                              onClick={() => openContentModal(section.id, lesson)}
                              className="gap-1 shrink-0"
                            >
                              {lesson.content ? (
                                <>
                                  {lesson.content.type === 'youtube' && <Youtube className="h-3 w-3" />}
                                  {lesson.content.type === 'video' && <Video className="h-3 w-3" />}
                                  {lesson.content.type === 'document' && <FileText className="h-3 w-3" />}
                                  <CheckCircle2 className="h-3 w-3" />
                                </>
                              ) : (
                                <>
                                  <Link2 className="h-3 w-3" />
                                  <span className="hidden sm:inline">Content</span>
                                </>
                              )}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => removeLesson(section.id, lesson.id)}
                              className="text-destructive hover:text-destructive shrink-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    {section.lessons.length === 0 && (
                      <div className="p-6 text-center text-muted-foreground">
                        <p className="text-sm">No lessons yet. Click "Lesson" to add one.</p>
                      </div>
                    )}
                  </div>
                ))}

                <div className="flex items-center justify-between text-sm text-muted-foreground pt-2">
                  <span>{sections.length} section(s)</span>
                  <span>{totalLessons} lesson(s)</span>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Pricing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="price">Course Price (EGP)</Label>
                  <div className="relative max-w-xs">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      className="pl-10"
                      value={courseData.price}
                      onChange={(e) => setCourseData({ ...courseData, price: e.target.value })}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Set to 0 for a free course
                  </p>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <h4 className="font-medium">Pricing Tips</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Consider your course length and depth</li>
                    <li>• Research similar courses in your category</li>
                    <li>• Start with a lower price to build reviews</li>
                    <li>• You can update pricing anytime</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-border">
            <Button variant="outline" onClick={() => navigate('/teacher/dashboard')}>
              Cancel
            </Button>
            <Button variant="outline" onClick={handleSaveDraft} className="gap-2">
              <Save className="h-4 w-4" />
              Save Draft
            </Button>
            <Button onClick={handlePublish} className="hero-gradient text-primary-foreground">
              Publish Course
            </Button>
          </div>
        </div>
      </div>

      {/* Lesson Content Modal */}
      <LessonContentModal
        open={contentModalOpen}
        onOpenChange={setContentModalOpen}
        lessonTitle={selectedLesson?.lesson.title || ''}
        currentContent={selectedLesson?.lesson.content}
        onSave={handleSaveContent}
      />
    </Layout>
  );
};

export default CreateCourse;
