import { Modal, ModalContent, ModalBody, ModalFooter, Button } from "@heroui/react";
import { FaTimesCircle } from "react-icons/fa";

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
            classNames={{
                base: "bg-white rounded-3xl shadow-xl border border-gray-100",
            }}
        >
            <ModalContent>
                {(closeModal) => (
                    <>
                        <ModalBody className="flex flex-col items-center text-center pt-10 pb-6 px-8">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-500">
                                <FaTimesCircle className="text-4xl" />
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2">Error</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {message || "You must confirm your email address first before performing this action."}
                            </p>
                        </ModalBody>
                        <ModalFooter className="justify-center pb-8">
                            <Button
                                color="primary"
                                onPress={closeModal}
                                className="px-8 rounded-lg font-semibold bg-blue-600"
                            >
                                Got it
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};