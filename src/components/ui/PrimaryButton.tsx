import { Button, ButtonProps } from "@heroui/react";

type PrimaryButtonProps = ButtonProps;

export const PrimaryButton = ({ children, className, ...props }: PrimaryButtonProps) => {
    return (
        <Button
            radius="none"
            className={`
        w-full 
        font-semibold 
        bg-[#2D68A2] 
        text-white 
        h-[48px] 
        text-[16px] 
        
        rounded-tl-[12px] rounded-bl-[12px]
        rounded-tr-[15px] rounded-br-[15px]
        
        shadow-lg 
        shadow-blue-900/10 
        hover:bg-[#245485] 
        active:scale-[0.98] 
        transition-all
        ${className || ""}
      `}
            {...props}
        >
            {children}
        </Button>
    );
};