import { AppNode } from "../types";

interface JsonPreviewProps {
    nodes: AppNode[];
}

export const JsonPreview = ({ nodes }: JsonPreviewProps) => {
    return (
        <div className="bg-[#E5E5E5] rounded-lg p-6 h-full overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar font-mono text-[12px] text-[#1E1E1E] leading-relaxed">
                <p>▼ {'{'}</p>
                <p className="pl-4">MiNiFi Config Version: <span className="text-blue-600">3</span>,</p>
                <p className="pl-4">▼ Remote Process Groups: [</p>
                <p className="pl-4">],</p>
                <p className="pl-4">▼ Processors: [</p>

                {nodes.map((node) => (
                    <div key={node.id} className="pl-8">
                        <p>▼ {'{'}</p>
                        <p className="pl-4">id: <span className="text-[#A31515]">"{node.id}"</span>,</p>
                        <p className="pl-4">max concurrent tasks: <span className="text-blue-600">1</span>,</p>
                        <p className="pl-4">scheduling strategy: <span className="text-[#A31515]">"TIMER_DRIVEN"</span>,</p>
                        <p className="pl-4">scheduling period: <span className="text-[#A31515]">"5000 ms"</span>,</p>
                        <p className="pl-4">penalization period: <span className="text-[#A31515]">"30000 ms"</span>,</p>
                        <p className="pl-4">yield period: <span className="text-[#A31515]">"1000 ms"</span>,</p>
                        <p className="pl-4">run duration nanos: <span className="text-blue-600">0</span>,</p>
                        <p className="pl-4">▼ auto-terminated relationships list: [</p>
                        <p className="pl-4">],</p>
                        <p className="pl-4">▼ Properties: {'{'}</p>
                        <p className="pl-4">{'}'},</p>
                        <p className="pl-4">name: <span className="text-[#A31515]">"{node.data.label}"</span>,</p>
                        <p className="pl-4">class: <span className="text-[#A31515]">"org.apache.nifi.processors.{node.data.label}"</span>,</p>
                        <p className="pl-4">comment: <span className="text-[#A31515]">""</span></p>
                        <p>{'},'}</p>
                    </div>
                ))}

                <p className="pl-4">]</p>
                <p>{'}'}</p>
            </div>
        </div>
    );
};