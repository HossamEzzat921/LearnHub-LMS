import { useState } from "react";

type TStatus = "idle" | "available" | "checking" | "notAvailable" | "failed";

const useCheckCourseTitleAvailability = () => {
  const [titleAvailabilityStatus, setTitleAvailabilityStatus] =
    useState<TStatus>("idle");

  const [enteredTitle, setEnteredTitle] = useState<null | string>(null);

  const checkCourseTitleAvailability = async (title: string) => {
    setEnteredTitle(title);
    setTitleAvailabilityStatus("checking");

    try {
        // We use a query string: ?title=MyCourseName
        const res = await fetch(`http://localhost:3500/courses/check-title?title=${encodeURIComponent(title)}`);
        const data = await res.json();

        if (data.available) {
            setTitleAvailabilityStatus("available");
        } else {
            setTitleAvailabilityStatus("notAvailable");
        }
    } catch (error) {
        setTitleAvailabilityStatus("failed");
    }
  };

  return {
    titleAvailabilityStatus,
    enteredTitle,
    checkCourseTitleAvailability,
  };
};

export default useCheckCourseTitleAvailability;
