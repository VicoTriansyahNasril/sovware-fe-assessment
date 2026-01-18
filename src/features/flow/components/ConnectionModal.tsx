import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";
import { useState } from "react";

interface ConnectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (label: string) => void;
}

export const ConnectionModal = ({ isOpen, onClose, onConfirm }: ConnectionModalProps) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleAdd = () => {
        onConfirm("success");
        onClose();
        setIsSelected(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onClose}
            size="md"
            hideCloseButton
            backdrop="blur"
            classNames={{
                wrapper: "flex justify-center items-center h-screen w-screen fixed inset-0 z-[60]",
                backdrop: "bg-[#1E1E1E]/20 backdrop-blur-sm fixed inset-0 z-[50]",
                base: "bg-white rounded-xl shadow-xl w-[500px] m-0 p-0 relative",
                header: "border-b border-transparent px-6 pt-6 pb-2",
                body: "px-6 py-2",
                footer: "px-6 pb-6 pt-4 justify-end gap-3",
            }}
        >
            <ModalContent>
                {(close) => (
                    <>
                        <div className="absolute top-4 right-4">
                            <button onClick={close} className="text-gray-400 hover:text-gray-600 font-bold text-xl">&times;</button>
                        </div>

                        <ModalHeader className="font-bold text-[18px] text-[#1E1E1E]">
                            Create Connection
                        </ModalHeader>

                        <ModalBody>
                            <p className="text-[13px] font-bold text-[#1E1E1E] mb-2">Source Relationship</p>
                            <div className="bg-[#F9FAFB] p-4 rounded-lg border border-gray-100 flex items-start gap-3">
                                <div className="relative flex items-center mt-0.5">
                                    <input
                                        type="checkbox"
                                        className="peer sr-only"
                                        checked={isSelected}
                                        onChange={(e) => setIsSelected(e.target.checked)}
                                    />
                                    <div className="w-[18px] h-[18px] border-2 border-gray-300 rounded-[4px] bg-white peer-checked:bg-[#2D68A2] peer-checked:border-[#2D68A2] transition-all cursor-pointer"></div>
                                    <svg
                                        className="absolute top-[3px] left-[3px] w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>

                                <div className="flex flex-col cursor-pointer" onClick={() => setIsSelected(!isSelected)}>
                                    <span className="text-[14px] font-bold text-[#2D68A2] leading-none">success</span>
                                    <span className="text-[12px] text-gray-400 mt-1">Database is successfully updated.</span>
                                </div>
                            </div>
                        </ModalBody>

                        <ModalFooter>
                            <button
                                onClick={close}
                                className="text-[#EF4444] font-semibold text-[14px] px-4 hover:underline"
                            >
                                Close
                            </button>
                            <Button
                                onPress={handleAdd}
                                className={`font-semibold px-6 rounded-lg h-[40px] text-white transition-colors ${isSelected ? "bg-[#2D68A2] hover:bg-[#245485]" : "bg-[#93ADD0]"}`}
                            >
                                Add
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};