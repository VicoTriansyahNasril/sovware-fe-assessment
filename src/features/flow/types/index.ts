import { Node } from '@xyflow/react';

export interface MyNodeData extends Record<string, unknown> {
    label: string;
    iconType: string;
}

export type AppNode = Node<MyNodeData, 'processorNode'>;

export interface ProcessorType {
    type: string;
    label: string;
    icon: string;
    description: string;
}