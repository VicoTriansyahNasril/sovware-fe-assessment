import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const ConfirmPublishModal = ({ isOpen, onClose, onConfirm }: ConfirmModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onClose}
            size="sm"
            hideCloseButton
            backdrop="blur"
            classNames={{
                wrapper: "flex justify-center items-center h-screen w-screen fixed inset-0 z-[70]",
                backdrop: "bg-[#1E1E1E]/20 backdrop-blur-sm fixed inset-0 z-[60]",
                base: "bg-white rounded-xl shadow-xl w-[400px] m-0 p-0 relative",
            }}
        >
            <ModalContent>
                {(close) => (
                    <>
                        <ModalHeader className="px-6 pt-6 pb-2 border-none">
                            <h3 className="font-bold text-[16px] text-[#1E1E1E]">
                                Publish Design Confirmation
                            </h3>
                        </ModalHeader>

                        <ModalBody className="px-6 py-2">
                            <p className="text-[13px] text-gray-500 font-normal leading-relaxed">
                                Are you sure you want to publish this design ?
                            </p>
                        </ModalBody>

                        <ModalFooter className="px-6 pb-6 pt-4 flex justify-end gap-2 border-none">
                            <button
                                onClick={close}
                                className="text-[#EF4444] font-medium text-[13px] px-4 hover:underline"
                            >
                                Back
                            </button>
                            <Button
                                onPress={onConfirm}
                                className="bg-[#2D68A2] text-white font-semibold text-[13px] px-6 h-[36px] rounded-lg hover:bg-[#245485]"
                            >
                                Publish
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};