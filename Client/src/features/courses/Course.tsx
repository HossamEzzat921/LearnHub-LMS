import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCourse } from "../../api";
import type { Course } from "../../types/Course";
import type { Section } from "../../types/Section";

const CourseView = () => {
  const BASE_URL = "http://localhost:3500/";
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState<Course | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const getEmbedUrl = (url) => {
    if (!url) return null;

    // Handle standard watch links
    if (url.includes("watch?v=")) {
      const videoId = url.split("v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // Handle shortened youtu.be links
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return url; // Return as is if already an embed link
  };
  useEffect(() => {
    const fetchCourse = async () => {
      const data = await getCourse({ courseId });
      setCourseData(data);
      // Set the first lesson's video as default if it exists
      if (data?.courseCurriculum?.[0]?.lessons?.[0]?.videoUrl) {
        setActiveVideo(data.courseCurriculum[0].lessons[0].videoUrl);
      }
    };
    fetchCourse();
  }, [courseId]);

  if (!courseData)
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-teal-500"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* 1. Hero / Header Section */}
      <div className="bg-slate-900 text-white py-12 px-6 mb-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 space-y-4">
            <span className="bg-teal-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {courseData.category} • {courseData.level}
            </span>
            <h1 className="text-4xl font-bold">{courseData.title}</h1>
            <p className="text-slate-300 text-lg max-w-2xl">
              {courseData.description}
            </p>
          </div>

          {/* Thumbnail Image */}
          <div className="w-full md:w-80 h-48 rounded-xl overflow-hidden shadow-2xl border-4 border-white/10">
            <img
              src={`${BASE_URL}uploads/${courseData.thumbnail}`}
              alt={courseData.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 3. Sidebar (Curriculum) */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 sticky top-8">
            <div className="p-5 border-b border-slate-100">
              <h2 className="text-lg font-bold">Course Content</h2>
            </div>

            <div className="max-h-150 overflow-y-auto">
              {courseData.courseCurriculum.map((sec: Section, sIdx: number) => (
                <div
                  key={sec._id}
                  className="border-b border-slate-50 last:border-0"
                >
                  <div className="bg-slate-50/50 px-5 py-3 flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-tight">
                      Section {sIdx + 1}: {sec.title}
                    </span>
                  </div>

                  <div className="py-2">
                    {sec.lessons.map((les, lIdx) => (
                      <button
                        key={les._id}
                        onClick={() => setActiveVideo(les.videoUrl)}
                        className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-teal-50 group ${
                          activeVideo === les.videoUrl
                            ? "bg-teal-50 border-r-4 border-teal-500"
                            : ""
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                            activeVideo === les.videoUrl
                              ? "bg-teal-500 text-white"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {lIdx + 1}
                        </div>
                        <div className="flex-1">
                          <p
                            className={`text-sm font-medium ${
                              activeVideo === les.videoUrl
                                ? "text-teal-700"
                                : "text-slate-700"
                            }`}
                          >
                            {les.title}
                          </p>
                          {les.duration && (
                            <span className="text-xs text-slate-400">
                              {les.duration} mins
                            </span>
                          )}
                        </div>
                        <i
                          className={`fa-solid fa-circle-play ${
                            activeVideo === les.videoUrl
                              ? "text-teal-500"
                              : "text-slate-300 group-hover:text-teal-300"
                          }`}
                        ></i>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* 2. Main Content Area (Video Player) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            {activeVideo ? (
              <iframe
                src={getEmbedUrl(activeVideo)}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Lesson Video"
              ></iframe>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-500 flex-col gap-2">
                <i className="fa-solid fa-play-circle text-5xl"></i>
                <p>Select a lesson to start watching</p>
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold mb-4">About this Course</h3>
            <p className="text-slate-600 leading-relaxed">
              {courseData.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseView;
