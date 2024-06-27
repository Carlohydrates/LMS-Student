import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="flex bg-black_olive w-screen h-screen text-snow">
      <div className="m-auto text-justify">
        <h1 className="text-3xl poppins-semibold">PAGE NOT FOUND</h1>
        <Link to="/" className="text-xl poppins-regular hover:text-black_olive-800 underline">Go Back</Link>
      </div>
    </div>
  );
};
