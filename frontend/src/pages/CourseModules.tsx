import { Accordion } from "flowbite-react";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useGetModules } from "../hooks/module/useGetModules";
import { Module } from "../models/module";

interface CourseModulesProps {
  courseCode: string;
}

const CourseModules: React.FC<CourseModulesProps> = ({ courseCode }) => {
  let moduleCount = 0;

  const {
    modules,
    loading: modulesLoading,
    error,
    getModules,
  } = useGetModules();

  useEffect(() => {
    getModules(courseCode);
  }, [courseCode]);

  if (modulesLoading) {
    return <p className="text-snow">Loading modules...</p>;
  }

  if (error) {
    toast.error(`Error: ${error}`);
  }

  const renderContent = (url: string) => {
    const fileType = url.split(".").pop();
    if (fileType === "mp4") {
      return (
        <video controls className="w-full">
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    } else if (fileType === "pdf") {
      return <embed src={url} width={800} height={900}></embed>;
    } else {
      return (
        <a href={url} className="text-blue-500 underline">
          {url}
        </a>
      );
    }
  };

  return (
    <div className="flex flex-col border-snow lg:w-full mx-auto min-h-fit p-4 pb-12 rounded-lg my-10 poppins-regular gap-4">
      {modules.length > 0 ? (
        <Accordion collapseAll>
          {modules.map((module: Module) => (
            <Accordion.Panel key={module._id}>
              <Accordion.Title className="hover:bg-black_olive-600 text-snow enabled:bg-black_olive enabled:ring-0">
                <div>{`Module ${++moduleCount}: ${module.title}`}</div>
              </Accordion.Title>
              <Accordion.Content className="text-sm">
                <div className="text-snow">{module.description}</div>
                {module.contentUrls.length > 0 ? (
                  module.contentUrls.map((contentUrl) => (
                    <div className="flex flex-col justify-center p-8 gap-4">
                      {renderContent(contentUrl)}
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </Accordion.Content>
            </Accordion.Panel>
          ))}
        </Accordion>
      ) : (
          <h1 className="flex text-snow poppins-semibold text-xl">
            No Modules Available
          </h1>
      )}
    </div>
  );
};

export default CourseModules;
