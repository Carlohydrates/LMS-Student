/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, Button, Badge } from "flowbite-react";
import React from "react";

interface CourseCardProps {
  code: string;
  title: string;
  description: string;
  isPublished: boolean;
  tier: string;
  price?: number;
}

const CourseCard: React.FC<CourseCardProps> = ({
  code,
  title,
  description,
  isPublished,
  tier,
  price,
}) => {
  if (isPublished) {
    return (
      <div className="flex flex-col bg-[url('/stacked-peaks-haikei.svg')] poppins-regular min-w-full min-h-full p-14 gap-4">
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
        <h2 className="poppins-semibold-italic text-lg">{title}</h2>
        <div className="text-ellipsis overflow-hidden line-clamp-6 text-justify h-30 w-full">
          {description}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora
          voluptatem quibusdam dolorem, vero, eum accusantium earum perspiciatis
          non dolore deserunt nihil? Voluptatibus debitis inventore autem. Cum
          deleniti quod aspernatur maxime!
        </div>
        <Button className="flex w-1/2 mx-auto mt-4">Enroll Now</Button>
      </div>
    );
  }
};

export default CourseCard;
