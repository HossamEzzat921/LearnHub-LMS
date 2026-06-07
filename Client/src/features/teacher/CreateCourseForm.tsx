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
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";




type CourseFormProps = {
  onSubmit: SubmitHandler<courseType>;
};

const CreateCourseForm = ({ onSubmit }: CourseFormProps) => {
  const user = useSelector(selectCurrentUser);
 
  const {
  register,
  handleSubmit,
  trigger,
  watch,
  getFieldState,
  formState: { errors },
} = useForm<courseType>({
  defaultValues: {
    teacher: user.id,
    title: "",
    description: "",
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
 
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
      
         
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
                

              

             <div className="space-y-6">
            <Input
              register={register}
              name="title"
              label="course"
              placeholder="eg.,Complete javascript MasterclassName"
              error={errors.title}
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
             
            />
          </div>

                
              </CardContent>
            </Card>
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
            error={errors.price}
            isNumber={true}
          />
          <p className="mt-2 text-sm leading-s">Set to 0 for a free course</p>

          <div className="rounded-xl p-6 shadow-soft bg-cream space-y-4 mt-7 border border-light-gray/30">
            <p className="font-plus text-dark font-medium text-base leading-6">
              Pricing Tips
            </p>
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <h4 className="font-medium">Pricing Tips</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Consider your course length and depth</li>
                    <li>• Research similar courses in your category</li>
                    <li>• Start with a lower price to build reviews</li>
                    <li>• You can update pricing anytime</li>
                  </ul>
                </div>
          </div>
        </div>
          
        </div>
       
    
        {/* Course Curriculum */}

        {/* buttons */}
        <hr className="text-light-gray" />
        <div className="flex justify-end gap-4 my-6">
          <div>
             <Button variant="outline" >
              Cancel
            </Button>
          </div>

          <div>
            <Button
              type="submit"
              className="hero-gradient text-primary-foreground"
            >
              <span>Save Course</span>
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateCourseForm;
