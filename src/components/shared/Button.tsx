import { cn } from "@/lib/utils";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title?: string;
};

export default function CustomButton({
  className,
  title,
  ...restProps
}: ButtonProps) {
  return (
    <button
      className={cn(
        "bg-linear-to-b from-sky-50 to-blue-200 hover:from-sky-100 hover:to-blue-300 dark:from-primary/95 dark:to-primary/40 hover:dark:from-primary hover:dark:to-primary/90 text-sm text-zinc-600 dark:text-zinc-900 hover:text-zinc-800 font-normal border-none active:scale-95 cursor-pointer rounded-md transition-all duration-300 py-1 px-2",
        className
      )}
      {...restProps}
    >
      {title}
    </button>
  );
}
