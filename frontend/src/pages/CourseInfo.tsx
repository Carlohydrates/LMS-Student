import { useParams } from "react-router-dom";

const CourseInfo = () => {
  const params = useParams();
  return (
    <div>
      <h1>Course {params.id}</h1>
      <h2>Course Info</h2>
    </div>
  );
};

export default CourseInfo;
