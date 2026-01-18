import { Modal, ModalContent, ModalBody, Button } from "@heroui/react";
import { FaTimes } from "react-icons/fa";

interface ErrorModalProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
}

export const ErrorModal = ({ isOpen, onClose, message }: ErrorModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onClose}
            placement="center"
            backdrop="blur"
            hideCloseButton
            isDismissable={false}
            classNames={{
                wrapper: "flex justify-center items-center h-screen w-screen fixed inset-0 z-[50]",
                backdrop: "bg-[#1E1E1E]/80 backdrop-blur-sm fixed inset-0 z-[40]",
                base: "bg-white rounded-[40px] shadow-2xl w-[394px] max-w-[90vw] m-0 p-0 relative z-[51]",
            }}
        >
            <ModalContent>
                {(closeModal) => (
                    <ModalBody className="flex flex-col items-center text-center pt-[40px] pb-[32px] px-[24px] gap-0">

                        <div className="w-[48px] h-[48px] bg-[#EF4444] rounded-full flex items-center justify-center mb-[16px] shadow-sm flex-shrink-0">
                            <FaTimes className="text-white text-lg" />
                        </div>

                        <h3 className="font-inter font-extrabold text-[24px] text-[#1E1E1E] leading-tight mb-2">
                            Error
                        </h3>

                        <p className="font-inter font-normal text-[16px] text-[#4B5563] leading-[1.5] mb-6 max-w-[260px]">
                            {message || "You must confirm your email address first before performing this action."}
                        </p>

                        <Button
                            onPress={closeModal}
                            radius="none"
                            className="bg-[#006FEE] text-white font-inter font-medium text-[14px] h-[36px] px-6 rounded-[8px] min-w-[90px] hover:bg-[#005bc4] transition-colors shadow-sm"
                        >
                            Got it
                        </Button>
                    </ModalBody>
                )}
            </ModalContent>
        </Modal>
    );
};