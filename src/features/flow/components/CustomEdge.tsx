import { BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath, useReactFlow } from '@xyflow/react';
import { Settings } from 'lucide-react';

export default function CustomEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
    label,
}: EdgeProps) {
    const { setEdges } = useReactFlow();
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    const onEdgeClick = (evt: React.MouseEvent, id: string) => {
        evt.stopPropagation();
        setEdges((edges) => edges.filter((e) => e.id !== id));
    };

    return (
        <>
            <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
            <EdgeLabelRenderer>
                <div
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        pointerEvents: 'all',
                    }}
                    className="flex items-center gap-1 bg-white border border-[#2D68A2] px-2 py-1 rounded-[6px] shadow-sm z-10"
                >
                    <button
                        className="p-0.5 rounded-full hover:bg-gray-100 text-[#2D68A2]"
                        onClick={(event) => onEdgeClick(event, id)}
                    >
                        <Settings size={12} />
                    </button>
                    {label && (
                        <span className="text-[10px] font-bold text-[#2D68A2] font-inter">
                            {label as string}
                        </span>
                    )}
                </div>
            </EdgeLabelRenderer>
        </>
    );
}