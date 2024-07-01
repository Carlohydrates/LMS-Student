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
    base: "none"
  }
};