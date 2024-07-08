import type { CustomFlowbiteTheme } from "flowbite-react";

export const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      primary: "bg-snow text-black_olive hover:bg-verdigris",
      secondary: "hover:bg-black_olive hover:text-snow border-solid border-2 border-black_olive bg-snow text-black_olive",
      tertiary: "bg-snow text-black_olive hover:bg-green-600 hover:text-snow"
    },
  },
  tabs: {
    base: "flex flex-col gap-2",
    tablist: {
      base: "flex text-center",
      styles: {
        default: "",
        fullWidth: "",
        pills: "",
        underline:
          "-mb-px flex-wrap border-b border-gray-200 dark:border-gray-700",
      },
      tabitem: {
        base: "flex items-center justify-center rounded-t-lg p-4 px-8 text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500",
        styles: {
          underline: {
            base: "rounded-t-lg",
            active: {
              on: "active poppins-semibold rounded-t-lg border-b-2 border-verdigris text-snow dark:border-cyan-500 dark:text-cyan-500 hover:text-verdigris",
              off: " poppins-semibold border-b-2 border-transparent text-snow hover:border-gray-300 hover:text-verdigris dark:text-gray-400 dark:hover:text-gray-300",
            },
          },
        },
        icon: "",
      },
    },
  }
};

  // const customTabTheme: CustomFlowbiteTheme["tabs"] = {
  //   base: "flex flex-col gap-2",
  //   tablist: {
  //     base: "flex text-center",
  //     styles: {
  //       default: "",
  //       fullWidth: "",
  //       pills: "",
  //       underline:
  //         "-mb-px flex-wrap border-b border-gray-200 dark:border-gray-700",
  //     },
  //     tabitem: {
  //       base: "flex items-center justify-center rounded-t-lg p-4 px-8 text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500",
  //       styles: {
  //         underline: {
  //           base: "rounded-t-lg",
  //           active: {
  //             on: "active poppins-semibold rounded-t-lg border-b-2 border-verdigris text-snow dark:border-cyan-500 dark:text-cyan-500 hover:text-verdigris",
  //             off: " poppins-semibold border-b-2 border-transparent text-snow hover:border-gray-300 hover:text-verdigris dark:text-gray-400 dark:hover:text-gray-300",
  //           },
  //         },
  //       },
  //       icon: "",
  //     },
  //   },
  // };
 