import { Modal, ModalContent, ModalBody, ModalFooter, Button } from "@heroui/react";
import { AlertCircle, Check } from "lucide-react";
import { useState } from "react";
import { Edge } from "@xyflow/react";
import { AppNode } from "../types";
import { JsonPreview } from "./JsonPreview";

interface PublishModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPublish: () => void;
    data: {
        nodes: AppNode[];
        edges: Edge[];
    };
}

export const PublishModal = ({ isOpen, onClose, onPublish, data }: PublishModalProps) => {
    const [isValidated, setIsValidated] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const handleValidate = () => {
        setIsValidated(true);
        setIsValid(data.nodes.length > 0);
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onClose}
            size="4xl"
            hideCloseButton
            backdrop="blur"
            classNames={{
                wrapper: "flex justify-center items-center h-screen w-screen fixed inset-0 z-[60]",
                backdrop: "bg-[#1E1E1E]/20 backdrop-blur-sm fixed inset-0 z-[50]",
                base: "bg-white rounded-xl shadow-2xl w-[900px] max-w-[95vw] h-[600px] m-0 p-0 relative flex flex-col",
                header: "px-8 py-5 border-b border-transparent",
                body: "p-0 flex-1 overflow-hidden",
                footer: "px-8 py-5 justify-end gap-4",
            }}
        >
            <ModalContent>
                {(close) => (
                    <>
                        <div className="flex justify-between items-center px-8 pt-6 pb-2 relative">
                            <h2 className="font-bold text-[18px] text-[#1E1E1E]">Publish Design Flow</h2>
                            <button
                                onClick={close}
                                className="absolute top-5 right-6 text-gray-400 hover:text-gray-600 text-2xl leading-none"
                            >
                                &times;
                            </button>
                        </div>

                        <ModalBody className="bg-white px-8 pb-4 pt-2">
                            <div className="border border-gray-200 rounded-lg p-3 mb-4 flex items-center justify-between h-[50px]">
                                <span className="text-[13px] font-bold text-[#2D68A2]">Design Status</span>

                                {isValidated ? (
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${isValid ? "bg-[#D1FAE5] text-[#065F46]" : "bg-[#FEE2E2] text-[#991B1B]"}`}>
                                        {isValid ? <Check size={14} strokeWidth={3} /> : <AlertCircle size={14} />}
                                        {isValid ? "Validated" : "Error"}
                                    </span>
                                ) : (
                                    <span className="px-4 py-1 bg-[#FEF3C7] text-[#92400E] text-[12px] rounded-full font-bold flex items-center gap-1">
                                        <AlertCircle size={14} /> Not Validated
                                    </span>
                                )}
                            </div>

                            {!isValidated ? (
                                <JsonPreview nodes={data.nodes} />
                            ) : isValid ? (
                                <div className="bg-[#D1FAE5] h-[40px] rounded-lg flex items-center px-4 gap-2 text-[#065F46] text-[13px] font-bold">
                                    <Check size={16} strokeWidth={3} />
                                    Design Flow is Valid
                                </div>
                            ) : (
                                <div className="bg-red-50 h-[40px] rounded-lg flex items-center px-4 gap-2 text-red-700 text-[13px] font-bold">
                                    <AlertCircle size={16} /> Validation Failed
                                </div>
                            )}
                        </ModalBody>

                        <ModalFooter className="px-8 pb-6">
                            {!isValidated ? (
                                <>
                                    <button onClick={close} className="text-[#EF4444] font-bold text-[13px] px-4 hover:underline">
                                        Close
                                    </button>
                                    <Button
                                        onPress={handleValidate}
                                        className="bg-[#2D68A2] text-white font-semibold px-6 rounded-lg h-[40px] flex items-center gap-2 hover:bg-[#245485]"
                                    >
                                        <Check size={16} /> Validate
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    onPress={onPublish}
                                    isDisabled={!isValid}
                                    className="w-full bg-[#2D68A2] text-white font-semibold rounded-lg h-[45px] text-[15px] hover:bg-[#245485] shadow-md"
                                >
                                    Publish
                                </Button>
                            )}
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};