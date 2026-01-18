import { Cpu, Database, Settings } from "lucide-react";

export const PROCESSOR_CATEGORIES = [
    { id: 'all', label: 'All', icon: null, iconName: 'all' },
    { id: 'standart', label: 'Standart', icon: Settings, iconName: 'settings' },
    { id: 'sql', label: 'SQL', icon: Database, iconName: 'database' },
];

export const PROCESSORS_LIST = [
    { id: 'AppendHostInfo', label: 'AppendHostInfo', description: 'Appends host information.', category: 'standart', icon: Cpu },
    { id: 'AttributesToJSON', label: 'AttributesToJSON', description: 'Generates a JSON representation.', category: 'standart', icon: Cpu },
    { id: 'DefragmentText', label: 'DefragmentText', description: 'DefragmentText splits a text.', category: 'standart', icon: Cpu },
    { id: 'ExtractText', label: 'ExtractText', description: 'Extracts the content of a file.', category: 'standart', icon: Cpu },
    { id: 'FetchFile', label: 'FetchFile', description: 'Reads the contents of a file.', category: 'standart', icon: Cpu },
    { id: 'GenerateFlowFile', label: 'GenerateFlowFile', description: 'This processor creates FlowFiles.', category: 'standart', icon: Cpu },
    { id: 'GetFile', label: 'GetFile', description: 'Creates FlowFiles from files.', category: 'standart', icon: Cpu },
    { id: 'GetTCP', label: 'GetTCP', description: 'Establishes a TCP Server.', category: 'standart', icon: Cpu },
    { id: 'HashContent', label: 'HashContent', description: 'HashContent calculates hash.', category: 'standart', icon: Cpu },
    { id: 'ListFile', label: 'ListFile', description: 'Retrieves a listing of files.', category: 'standart', icon: Cpu },
    { id: 'PutSQL', label: 'PutSQL', description: 'Updates a database.', category: 'sql', icon: Database },
];