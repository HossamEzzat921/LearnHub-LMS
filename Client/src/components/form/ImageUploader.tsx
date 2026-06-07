import { useState, useEffect } from "react";
import type {
  Path,
  FieldValues,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

type ImageUploaderProps<TFieldValue extends FieldValues> = {
  name: Path<TFieldValue>;
  register: UseFormRegister<TFieldValue>;
  watch: UseFormWatch<TFieldValue>;
  error?: string; // Change string to FieldError
  initialImage?: string;
};
const BASE_URL = "http://localhost:3500/";
const ImageUploader = <TFieldValue extends FieldValues>({
  register,
  name,
  watch,
  error,
  initialImage,
}: ImageUploaderProps<TFieldValue>) => {
  const [preview, setPreview] = useState<string | null>(null);

  // 1. Watch the file input for changes
  const fileList = watch(name);

  useEffect(() => {
    // 1. Prioritize a NEWLY selected file
    if (fileList && fileList.length > 0 && fileList[0] instanceof File) {
      const file = fileList[0];
      if (file.type.startsWith("image/")) {
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
      }
    }

    // 2. If no NEW file is selected, fallback to initialImage
    // We check if the fileList is "empty" (either null, undefined, length 0, or not a File)
    const hasNoNewFile =
      !fileList || fileList.length === 0 || !(fileList[0] instanceof File);

    if (hasNoNewFile && initialImage) {
      const fullPath = initialImage.startsWith("http")
        ? initialImage
        : `${BASE_URL}uploads/${initialImage}`; // Added /uploads/
      setPreview(fullPath);
    }

    // 3. Clear if there's a validation error
    if (error) {
      setPreview(null);
    }
  }, [fileList, error, initialImage]);
 
  return (
    <div className="space-y-2">
      <label className="block text-dark text-sm font-medium">Thumbnail</label>

      <label
        className={`cursor-pointer block w-full p-4 bg-white rounded-xl border-2 border-dashed transition-all ${error ? "border-red-500" : "border-light-gray"}`}
      >
        {preview ? (
          <div className="text-center">
            <img
              src={preview}
              alt="preview"
              className="max-h-40 mx-auto rounded-lg mb-2"
            />
            <p className="text-xs text-teal">Click to change</p>
          </div>
        ) : (
          <div className="w-full px-4 py-10 bg-white rounded-xl border border-light-gray border-dashed flex justify-center items-center">
            <div className="grid gap-4 items-center">
              <div className="flex justify-center">
                <i className="fa-solid fa-upload text-xl"></i>
              </div>

              <p className="text-center text-sm">
                Drag and drop an image, or click to browse
              </p>
              <div className="flex justify-center">
                <span className="flex items-center gap-2 h-10 px-4 py-2 bg-cream border border-light-gray hover:bg-orange hover:text-white transition-all text-dark text-sm leading-5 font-medium rounded-lg">
                  Upload Image{" "}
                </span>
              </div>
            </div>
          </div>
        )}

        <input
          type="file"
          className="hidden"
          accept="image/*"
          {...register(name)}
        />
      </label>

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default ImageUploader;
