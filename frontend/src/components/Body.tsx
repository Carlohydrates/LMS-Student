import React, { useContext } from "react";
import { PageContext } from "./Context";

const Body = () => {
  const pageContext = useContext(PageContext);

  switch (pageContext) {
    case "dashboard": {
      return (
        <div className="flex flex-col h-screen min-w-screen bg-black"></div>
      );
    }
    case "courses": {
      return (
        <div className="flex flex-col h-screen min-w-screen bg-gradient-to-tr from-verdigris-700 to-verdigris-200">
          <div className="flex bg-snow h-8 w-32 justify-center justify-items-center mt-24 ml-24 rounded-md">
            + New course
          </div>
          {/* <div className="flex flex-1 gap-20 mt-14 mx-14 justify-between">
            <div className="flex rounded-lg bg-gradient-to-tl from-verdigris to-black_olive-500 w-1/2 h-3/5 shadow-lg hover:shadow-black"></div>
            <div className="flex rounded-lg bg-gradient-to-br from-verdigris to-black_olive-500 w-1/2 h-3/5 shadow-lg hover:shadow-black "></div>
          </div>
          <div className="flex flex-2 w-1/2 h-3/5 bg-black">
            <div className="flex rounded-lg bg-verdigris-500 "></div>
          </div> */}
        </div>
      );
    }
    case "students": {
      return (
        <div className="flex flex-col h-screen min-w-screen bg-gradient-to-tr from-verdigris-700 to-snow">
          STUDENTS
          <div className="flex flex-1 gap-20 mt-14 mx-14 justify-between">
            <div className="flex rounded-lg bg-gradient-to-tl from-verdigris-600 to-black_olive w-1/2 h-3/5 shadow-lg hover:shadow-black"></div>
            <div className="flex rounded-lg bg-gradient-to-br from-verdigris-600 to-black_olive w-1/2 h-3/5 shadow-lg hover:shadow-black "></div>
          </div>
          <div className="flex flex-2">
            <div className="flex rounded-lg bg-verdigris-500 w-1/2 h-3/5"></div>
          </div>
        </div>
      );
    }
    case "grades": {
      return (
        <div className="flex flex-col h-screen min-w-screen bg-gradient-to-tr from-verdigris-700 to-snow">
          GRADES
          <div className="flex flex-1 gap-20 mt-14 mx-14 justify-between">
            <div className="flex rounded-lg bg-gradient-to-tl from-verdigris to-black_olive w-1/2 h-3/5 shadow-lg hover:shadow-black"></div>
            <div className="flex rounded-lg bg-gradient-to-br from-verdigris to-black_olive w-1/2 h-3/5 shadow-lg hover:shadow-black "></div>
          </div>
          <div className="flex flex-2">
            <div className="flex rounded-lg bg-verdigris-500 w-1/2 h-3/5"></div>
          </div>
        </div>
      );
    }
  }
};

export default Body;
