import { Badge, Button } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEnrollUser } from "../hooks/user/useEnrollUser";

interface CourseCardProps {
  userTier: number;
  code: string;
  title: string;
  description: string;
  isPublished: boolean;
  publisher: string;
  tier: number;
  price?: number;
  enrolled: string[];
}

const CourseCard: React.FC<CourseCardProps> = ({
  userTier,
  code,
  title,
  description,
  isPublished,
  publisher,
  tier,
}) => {
  const { enrollUser } = useEnrollUser();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  if (isPublished) {
    return (
      <div className="bg-verdigris rounded-xl lg:w-[26rem] lg:h-80 text-black_olive poppins-regular p-7 hover:shadow-black hover:shadow-lg hover:cursor-pointer transition-all ease-in-out hover:-translate-y-2 duration-200 delay-150">
        <h1 className="w-full h-10 poppins-extrabold justify-between">
          <div className="flex justify-between items-start text-3xl">
            {code}
            <Badge
              className="inline-flex size-fit"
              size={"sm"}
              color={tier === 0 ? "pink" : tier === 1 ? "yellow" : "indigo"}
            >
              {tier === 0 ? "FREE" : tier === 1 ? "BASIC" : "PREMIUM"}
            </Badge>
          </div>
        </h1>
        <h2 className="poppins-semibold-italic text-lg text-black_olive">
          {title}
        </h2>
        <h3 className="poppins-semibold-italic text-sm text-black_olive mb-2">
          Publisher: <span className="poppins-regular-italic">{publisher}</span>
        </h3>
        <div className="text-ellipsis overflow-hidden line-clamp-5 text-justify h-30 w-full text-black_olive">
          {description}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora
          voluptatem quibusdam dolorem, vero, eum accusantium earum perspiciatis
          non dolore deserunt nihil? Voluptatibus debitis inventore autem. Cum
          deleniti quod aspernatur maxime!
        </div>

        {userTier! >= tier ? (
          <Button
            className="flex size-fit mx-auto mt-4"
            color={"secondary"}
            onClick={async () => {
              await enrollUser(code, user.username);
              navigate("/mycourses");
            }}
            data-testid={`enroll-course-${code}`}
          >
            Enroll Course
          </Button>
        ) : (
          <Button
            className="flex size-fit mx-auto mt-4"
            color={"secondary"}
            onClick={() => {
              navigate("/pricing");
            }}
          >
            Upgrade now
          </Button>
        )}
      </div>
    );
  }
};

export default CourseCard;
