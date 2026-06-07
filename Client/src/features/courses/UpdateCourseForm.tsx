import { useForm, type SubmitHandler } from "react-hook-form";
import {
  ImageUploader,
  Input,
  Select,
  Textarea,
} from "../../components/form";
import {
  courseSchema,
  type courseType,
} from "../../validations/coureseSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";
import useCheckCourseTitleAvailability from "../../hooks/useCheckCourseTitleAvailability";

import { useEffect } from "react";
import { useCourseContext } from "./useCourseContext";

type CourseFormProps = {
  onSubmit: SubmitHandler<courseType>;
};

const UpdateCourseForm = ({ onSubmit }: CourseFormProps) => {
  
  const { courseData: course } = useCourseContext();
 const {
  register,
  handleSubmit,
  trigger,
  watch,
  getFieldState,
  reset,
  formState: { errors },
} = useForm<courseType>({
  defaultValues: {
    teacher: "",
    title: "",
    description: "",
    level: undefined,
    category: undefined,
    price: 0,
  },
  mode: "onChange",
  resolver: zodResolver(courseSchema),
});
  // ... rest of your code
  const {
    titleAvailabilityStatus,
    enteredTitle,
    checkCourseTitleAvailability,
  } = useCheckCourseTitleAvailability();

  const titleOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger("title");
    const value = e.target.value;
    const { isDirty, invalid } = getFieldState("title");
    if (isDirty && !invalid && enteredTitle !== value) {
      checkCourseTitleAvailability(value);
    }
  };
 useEffect(() => {
  if (course) {
    reset(course);
  }
}, [course, reset]);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-xl p-6 shadow-soft space-y-4 border border-light-gray mb-8">
          <div className="flex items-center gap-2 mb-10">
            <i className="fa-solid fa-book-open text-teal text-lg"></i>

            <h2 className="font-plus font-semibold text-2xl leading-6 text-dark">
              Basic Information
            </h2>
          </div>

          {/* basic */}
          <div className="space-y-6">
            <Input
              register={register}
              name="title"
              label="course"
              placeholder="eg.,Complete javascript MasterclassName"
              error={errors.title?.message}
              onBlur={titleOnBlurHandler}
              titleAvailabilityStatus={titleAvailabilityStatus}
            />
            <Textarea
              register={register}
              name="description"
              label="Description *"
              placeholder="Describe what students will learn ..."
              error={errors.description?.message}
            />

            <div className="grid md:grid-cols-2 gap-6 md:gap-3">
              <Select
                label="Category *"
                name="category"
                register={register}
                options={[
                  { value: "science", label: "UX/UI" },
                  { value: "math", label: "Docker" },
                ]}
                error={errors.category?.message}
              />
              <Select
                label=" Level *"
                name="level"
                register={register}
                options={[
                  { value: "beginner", label: "Beginner" },
                  { value: "advanced", label: "Advanced" },
                ]}
                error={errors.category?.message}
              />
            </div>
            <ImageUploader
              register={register}
              name="thumbnail"
              watch={watch}
              error={errors.thumbnail?.message as string} // Force it to a string
              initialImage={course?.thumbnail}
            />
          </div>
        </div>
        {/* pricing */}
        <div className="bg-white rounded-xl p-6 shadow-soft space-y-4 border border-light-gray mb-8">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-teal font-semibold text-xl">$</span>

            <h2 className="font-plus font-semibold text-2xl leading-6 text-dark">
              Pricing
            </h2>
          </div>

          <Input
            label=" Course Price (EGP)"
            name="price"
            type="number"
            placeholder="$ 0.00"
            register={register}
            error={errors.price?.message}
            isNumber={true}
          />
          <p className="mt-2 text-sm leading-s">Set to 0 for a free course</p>

          <div className="rounded-xl p-6 shadow-soft bg-cream space-y-4 mt-7 border border-light-gray/30">
            <p className="font-plus text-dark font-medium text-base leading-6">
              Pricing Tips
            </p>
            <div className="space-y-2">
              <div className="flex gap-1.5 items-center">
                <span className=" block bg-gray/70 w-1.5 h-1.5 rounded-full"></span>
                <p className="font-normal text-sm leading-5">
                  Consider your course length and depth
                </p>
              </div>
              <div className="flex gap-1.5 items-center">
                <span className=" block bg-gray/70 w-1.5 h-1.5 rounded-full"></span>
                <p className="font-normal text-sm leading-5">
                  Research similar courses in your category
                </p>
              </div>
              <div className="flex gap-1.5 items-center">
                <span className=" block bg-gray/70 w-1.5 h-1.5 rounded-full"></span>
                <p className="font-normal text-sm leading-5">
                  Start with a lower price to build reviews
                </p>
              </div>
              <div className="flex gap-1.5 items-center">
                <span className=" block bg-gray/70 w-1.5 h-1.5 rounded-full"></span>
                <p className="font-normal text-sm leading-5">
                  You can update pricing anytime
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Course Curriculum */}

        {/* buttons */}
        <hr className="text-light-gray" />
        <div className="flex justify-end gap-4 my-6">
          <div>
            <button className="flex items-center gap-2 h-10 px-4 py-2 bg-cream border border-light-gray hover:bg-orange hover:text-white transition-all text-dark text-sm leading-5 font-medium rounded-lg">
              <span>Cancel</span>
            </button>
          </div>

          <div>
            <button
              type="submit"
              className="flex items-center gap-2 h-10 px-4 py-2 bg-linear-to-r from-teal to-dark-teal text-white text-sm leading-5 font-medium rounded-lg"
            >
              <span>Save Course</span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdateCourseForm;
