import React from "react";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div>
      404 Page Not Found
      <br />
      <Link to="/">Back to Home</Link>
    </div>
  );
};
