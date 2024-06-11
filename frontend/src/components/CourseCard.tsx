/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, Button, Badge } from "flowbite-react";
import React from "react";
import { useEnrollUser } from "../hooks/useEnrollUser";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGetCourses } from "../hooks/useGetCourses";

interface CourseCardProps {
  code: string;
  title: string;
  description: string;
  isPublished: boolean;
  publisher: string;
  tier: string;
  price?: number;
  enrolled: string[];
}

const CourseCard: React.FC<CourseCardProps> = ({
  code,
  title,
  description,
  isPublished,
  publisher,
  tier,
  price,
  enrolled,
}) => {
  const { enrollUser } = useEnrollUser();
  const { triggerRefresh } = useGetCourses();
  const { user } = useAuthContext();

  if (isPublished) {
    return (
      <div className="bg-[url('/peaks1.svg')] rounded-xl lg:w-[26rem] lg:h-80 text-black_olive poppins-regular p-7 hover:shadow-black_olive hover:shadow-md">
        <h1 className="w-full h-10 poppins-extrabold justify-between">
          <div className="flex justify-between items-start text-3xl">
            {code}
            <Badge
              className="inline-flex size-fit"
              size={"sm"}
              color={tier === "free" ? "pink" : "indigo"}
            >
              {tier === "free" ? "FREE" : "PREMIUM"}
            </Badge>
          </div>
        </h1>
        <h2 className="poppins-semibold-italic text-lg text-snow">{title}</h2>
        <h3 className="poppins-semibold-italic text-sm text-black_olive mb-2">Publisher: <span className="poppins-regular-italic">{publisher}</span></h3>
        <div className="text-ellipsis overflow-hidden line-clamp-5 text-justify h-30 w-full text-snow">
          {description}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora
          voluptatem quibusdam dolorem, vero, eum accusantium earum perspiciatis
          non dolore deserunt nihil? Voluptatibus debitis inventore autem. Cum
          deleniti quod aspernatur maxime!
        </div>
        <Button
          className="flex lg:w-40 mx-auto mt-4 bg-verdigris text-snow"
          onClick={() => {
            enrollUser(code, user.username);
            triggerRefresh();
          }}
        >
          Enroll Course
        </Button>
      </div>
    );
  }
};

export default CourseCard;
