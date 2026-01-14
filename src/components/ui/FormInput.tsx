import React from "react";
import { Input, InputProps } from "@heroui/react";

type FormInputProps = InputProps;

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
    ({ classNames, isInvalid, ...props }, ref) => {
        return (
            <Input
                ref={ref}
                variant="bordered"
                radius="none"
                size="lg"
                isInvalid={isInvalid}
                classNames={{
                    ...classNames,
                    inputWrapper: [
                        "bg-white",
                        "border-[1.5px]",
                        "h-[45px]",
                        "rounded-r-[25px]",
                        "px-4",
                        "shadow-sm",
                        "transition-colors",
                        isInvalid
                            ? "!border-red-500 hover:!border-red-600 focus-within:!border-red-600"
                            : "border-[#E1E1E1] hover:border-[#2D68A2] focus-within:!border-[#2D68A2]",

                        "!flex !items-center",
                        classNames?.inputWrapper,
                    ].join(" "),

                    input: [
                        "text-[15px]",
                        "text-[#1E1E1E]",
                        "placeholder:text-gray-400",
                        "!bg-transparent",
                        classNames?.input,
                    ].join(" "),

                    errorMessage: "text-red-500 text-xs font-medium ml-1 mt-1",
                    innerWrapper: "flex items-center gap-2",
                }}
                {...props}
            />
        );
    }
);

FormInput.displayName = "FormInput";