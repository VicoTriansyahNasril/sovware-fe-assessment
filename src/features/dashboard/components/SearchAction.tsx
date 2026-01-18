import { Input, Button } from "@heroui/react";
import { Search } from "lucide-react";

interface SearchActionProps {
    onOpenClass: () => void;
    isDisabled: boolean;
}

export const SearchAction = ({ onOpenClass, isDisabled }: SearchActionProps) => {
    return (
        <div className="bg-[#F1F5F9] p-2 rounded-xl flex items-center justify-between h-[64px] mb-8 w-full">

            <div className="pl-2">
                <Input
                    startContent={<Search className="text-gray-400 ml-1" size={18} />}
                    placeholder="search..."
                    radius="lg"
                    classNames={{
                        base: "w-[320px]",
                        inputWrapper: "bg-[#F8FAFC] border border-gray-100 shadow-sm h-[40px] px-3 group-data-[focus=true]:bg-white",
                        input: "text-sm text-[#1E1E1E] font-medium placeholder:text-gray-400",
                    }}
                />
            </div>

            <div className="flex items-center gap-4 pr-2">
                <div className="h-[32px] w-[1px] bg-gray-300" />
                <Button
                    className="bg-[#5C7C9E] text-white font-semibold px-6 h-[40px] rounded-lg shadow-sm text-sm hover:bg-[#4A6583] disabled:opacity-50 disabled:bg-[#9CA3AF]"
                    onPress={onOpenClass}
                    isDisabled={isDisabled}
                >
                    Open Class
                </Button>
            </div>
        </div>
    );
};