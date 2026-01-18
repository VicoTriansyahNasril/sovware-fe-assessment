import { useState, useMemo } from 'react';
import { Modal, ModalContent, Button } from "@heroui/react";
import { PROCESSOR_CATEGORIES, PROCESSORS_LIST } from '../data/processors';

interface ProcessorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (processorId: string) => void;
}

export const ProcessorModal = ({ isOpen, onClose, onAdd }: ProcessorModalProps) => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedProcessor, setSelectedProcessor] = useState<string | null>(null);

    const filteredProcessors = useMemo(() => {
        return PROCESSORS_LIST.filter(p => {
            return selectedCategory === 'all' || p.category === selectedCategory;
        });
    }, [selectedCategory]);

    const handleAdd = () => {
        if (selectedProcessor) {
            onAdd(selectedProcessor);
            onClose();
            setSelectedProcessor(null);
        }
    };

    const onDragStart = (event: React.DragEvent, processorId: string) => {
        event.dataTransfer.setData('application/reactflow/type', 'processorNode');
        event.dataTransfer.setData('application/reactflow/label', processorId);
        event.dataTransfer.effectAllowed = 'move';
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onClose}
            hideCloseButton
            backdrop="blur"
            className="max-w-none w-[880px] h-[520px]"
            classNames={{
                wrapper: "flex justify-center items-center h-screen w-screen fixed inset-0 z-[60]",
                backdrop: "bg-black/40 backdrop-blur-sm fixed inset-0 z-[50]",
                base: "bg-white rounded-2xl overflow-hidden shadow-2xl w-[880px] h-[520px] m-0 p-0 relative flex",
                body: "p-0 h-full flex-1",
            }}
        >
            <ModalContent>
                {() => (
                    <div className="flex w-full h-full">
                        <div className="w-[260px] bg-[#E9ECEF] p-4 flex flex-col gap-2 h-full flex-shrink-0">
                            {PROCESSOR_CATEGORIES.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`flex items-center gap-3 px-5 py-3.5 rounded-xl text-sm font-semibold transition-all text-left ${selectedCategory === cat.id
                                        ? 'bg-[#D1D5DB] text-[#1E1E1E] shadow-sm'
                                        : 'text-gray-600 hover:bg-[#D1D5DB]/50'
                                        }`}
                                >
                                    {cat.icon && <cat.icon size={20} strokeWidth={2.5} />}
                                    {!cat.icon && <span className="w-[20px]" />}
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        <div className="flex-1 bg-[#F8F9FA] p-8 relative flex flex-col h-full overflow-hidden">
                            <div className="grid grid-cols-2 gap-4 overflow-y-auto pr-2 custom-scrollbar content-start h-full pb-20">
                                {filteredProcessors.map((proc) => {
                                    const isSelected = selectedProcessor === proc.id;
                                    return (
                                        <div
                                            key={proc.id}
                                            onClick={() => setSelectedProcessor(proc.id)}
                                            draggable
                                            onDragStart={(event) => onDragStart(event, proc.id)}
                                            className={`
                                                relative flex items-start gap-4 p-4 rounded-xl cursor-grab active:cursor-grabbing transition-all bg-white
                                                ${isSelected
                                                    ? 'border-2 border-[#2D68A2] shadow-md z-10'
                                                    : 'border border-transparent hover:shadow-sm hover:bg-white'} 
                                            `}
                                        >
                                            <div className="mt-1 flex-shrink-0">
                                                <proc.icon size={24} strokeWidth={2.5} className="text-[#1E1E1E]" />
                                            </div>

                                            <div>
                                                <h4 className="font-bold text-[#1E1E1E] text-[14px] mb-0.5">{proc.label}</h4>
                                                <p className="text-[11px] text-gray-400 font-medium leading-relaxed">{proc.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="absolute bottom-6 right-8 z-20">
                                <Button
                                    className="bg-[#6B8AB0] text-white font-semibold px-6 h-[40px] rounded-lg shadow-lg hover:bg-[#2D68A2] disabled:opacity-50 disabled:bg-[#9CA3AF] transition-colors text-sm"
                                    isDisabled={!selectedProcessor}
                                    onPress={handleAdd}
                                >
                                    Add ({selectedProcessor ? 1 : 0})
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </ModalContent>
        </Modal>
    );
};