import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Select, SelectItem, Input } from "@heroui/react";
import { FaPlus } from "react-icons/fa6";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { MOCK_VERSIONS } from "../data/mockVersions";

interface FlowVersionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenDesign: () => void;
}

export const FlowVersionModal = ({ isOpen, onClose, onOpenDesign }: FlowVersionModalProps) => {
    const [selectedVersionId, setSelectedVersionId] = useState<number | null>(null);

    const inputClasses = {
        inputWrapper: "bg-[#F3F4F6] border-none shadow-none h-[48px] rounded-lg group-data-[focus=true]:bg-[#E5E7EB]",
        input: "text-sm text-[#1E1E1E] font-medium placeholder:text-gray-400",
    };

    const selectClasses = {
        trigger: "bg-[#F3F4F6] border-none shadow-none h-[48px] rounded-lg data-[hover=true]:bg-[#E5E7EB]",
        value: "text-sm text-[#1E1E1E] font-medium",
        popoverContent: "min-w-[200px]"
    };

    const handleOpen = () => {
        if (selectedVersionId) {
            onOpenDesign();
            setTimeout(() => setSelectedVersionId(null), 500);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onClose}
            size="4xl"
            hideCloseButton
            backdrop="blur"
            classNames={{
                wrapper: "flex justify-center items-center h-screen w-screen fixed inset-0 z-[50]",
                backdrop: "bg-[#1E1E1E]/20 backdrop-blur-sm fixed inset-0 z-[40]",
                base: "bg-white rounded-2xl shadow-2xl max-w-4xl w-full",
                header: "border-b border-gray-100 px-8 py-5",
                body: "p-8",
                footer: "px-8 py-5 border-t border-gray-100",
            }}
        >
            <ModalContent>
                {(close) => (
                    <>
                        <ModalHeader className="flex justify-between items-center">
                            <span className="font-bold text-[20px] text-[#1E1E1E]">Flow Version</span>
                            <button onClick={close} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
                        </ModalHeader>

                        <ModalBody className="flex flex-col gap-6">
                            <div className="flex gap-4">
                                <div className="flex-1 flex gap-2">
                                    <Select
                                        aria-label="Select Major Version"
                                        placeholder="Select Major Version"
                                        className="flex-1"
                                        classNames={selectClasses}
                                        selectorIcon={<ChevronDown className="text-gray-500" size={20} />}
                                        disallowEmptySelection
                                    >
                                        <SelectItem key="1">Version 1</SelectItem>
                                        <SelectItem key="2">Version 2</SelectItem>
                                    </Select>
                                    <Button isIconOnly className="bg-[#D1D5DB] min-w-[48px] h-[48px] rounded-lg shadow-sm">
                                        <FaPlus className="text-gray-600" />
                                    </Button>
                                </div>
                                <div className="flex-1 flex gap-2">
                                    <Select
                                        aria-label="Select Minor Version"
                                        placeholder="Select Minor Version"
                                        className="flex-1"
                                        classNames={selectClasses}
                                        selectorIcon={<ChevronDown className="text-gray-500" size={20} />}
                                        disallowEmptySelection
                                    >
                                        <SelectItem key="1">Version 0.1</SelectItem>
                                        <SelectItem key="2">Version 0.2</SelectItem>
                                    </Select>
                                    <Button isIconOnly className="bg-[#D1D5DB] min-w-[48px] h-[48px] rounded-lg shadow-sm">
                                        <FaPlus className="text-gray-600" />
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Input
                                    placeholder="Design Name"
                                    classNames={inputClasses}
                                />
                                <div className="bg-[#F3F4F6] rounded-lg p-3 h-[100px] hover:bg-[#E5E7EB] transition-colors">
                                    <textarea
                                        className="w-full h-full bg-transparent border-none outline-none text-sm text-[#1E1E1E] font-medium placeholder:text-gray-400 resize-none font-inter"
                                        placeholder="Comment"
                                    ></textarea>
                                </div>
                            </div>

                            <Button
                                className="w-full bg-[#2D68A2] text-white font-semibold rounded-lg h-[48px] text-[15px] shadow-md hover:bg-[#245485] transition-all"
                                radius="none"
                            >
                                New Flow
                            </Button>
                            <div className="pt-4">
                                <div className="w-full text-left">
                                    <div className="grid grid-cols-12 gap-4 text-[12px] font-bold text-gray-500 mb-4 px-4 border-b border-transparent">
                                        <div className="col-span-2">Version</div>
                                        <div className="col-span-2">Design Name</div>
                                        <div className="col-span-2">Status</div>
                                        <div className="col-span-4">Comment</div>
                                        <div className="col-span-2 text-right">Last Updated</div>
                                    </div>
                                    <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1 custom-scrollbar">
                                        {MOCK_VERSIONS.map((v) => {
                                            const isSelected = selectedVersionId === v.id;
                                            return (
                                                <div
                                                    key={v.id}
                                                    onClick={() => setSelectedVersionId(v.id)}
                                                    className={`
                                                        grid grid-cols-12 gap-4 items-center px-4 py-4 rounded-lg text-sm transition-colors cursor-pointer border
                                                        ${isSelected
                                                            ? "bg-[#E6E6E6] border-gray-300"
                                                            : "bg-transparent hover:bg-gray-50 border-transparent"
                                                        }
                                                    `}
                                                >
                                                    <div className="col-span-2 text-gray-500">
                                                        Version <span className="font-bold text-[#1E1E1E]">{v.ver}</span>
                                                    </div>

                                                    <div className="col-span-2 text-[#1E1E1E] font-medium">{v.name}</div>
                                                    <div className="col-span-2">
                                                        <span className="px-3 py-1.5 bg-[#E5E7EB] text-[#374151] text-[11px] rounded-full font-bold">
                                                            {v.status}
                                                        </span>
                                                    </div>

                                                    <div className="col-span-4 text-[#1E1E1E] truncate font-medium">{v.comment}</div>

                                                    <div className="col-span-2 text-right text-[#1E1E1E] font-medium">{v.date}</div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </ModalBody>

                        <ModalFooter className="flex justify-end gap-4">
                            <button onClick={close} className="text-[#EF4444] font-semibold text-sm px-4 hover:underline">Close</button>
                            <Button
                                onPress={handleOpen}
                                isDisabled={!selectedVersionId}
                                className={`
                                    font-semibold px-8 rounded-lg h-[40px] shadow-sm transition-colors
                                    ${selectedVersionId
                                        ? "bg-[#2D68A2] text-white hover:bg-[#245485]"
                                        : "bg-[#5C7C9E] text-white opacity-50 cursor-not-allowed"
                                    }
                                `}
                            >
                                Open
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};