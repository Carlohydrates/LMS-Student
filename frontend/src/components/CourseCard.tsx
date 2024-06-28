import { Button, Badge, Spinner } from "flowbite-react";
import React from "react";
import { useEnrollUser } from "../hooks/user/useEnrollUser";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGetCourses } from "../hooks/course/useGetCourses";
import { useNavigate } from "react-router-dom";
import { useGetUserTier } from "../hooks/user/useGetUserTier";

interface CourseCardProps {
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
  code,
  title,
  description,
  isPublished,
  publisher,
  tier,
}) => {
  const { enrollUser } = useEnrollUser();
  const { triggerRefresh } = useGetCourses();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const { tier: userTier } = useGetUserTier(user._id);

  if (userTier === undefined) {
    return <Spinner size={"xl"}></Spinner>;
  }

  if (isPublished) {
    return (
      <div className="bg-verdigris rounded-xl lg:w-[26rem] lg:h-80 text-black_olive poppins-regular p-7 hover:shadow-black hover:shadow-lg transition-all ease-in-out hover:-translate-y-2 duration-200 delay-150">
        <h1 className="w-full h-10 poppins-extrabold justify-between">
          <div className="flex justify-between items-start text-3xl">
            {code}
            <Badge
              className="inline-flex size-fit"
              size={"sm"}
              color={tier === 0 ? "pink" : "indigo"}
            >
              {tier === 0 ? "FREE" : "PREMIUM"}
            </Badge>
          </div>
        </h1>
        <h2 className="poppins-semibold-italic text-lg text-snow">{title}</h2>
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
            className="flex size-fit mx-auto mt-4 bg-snow text-black_olive"
            onClick={() => {
              enrollUser(code, user.username);
              triggerRefresh();
            }}
          >
            Enroll Course
          </Button>
        ) : (
          <Button
            className="flex size-fit mx-auto mt-4 bg-black_olive text-snow"
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
