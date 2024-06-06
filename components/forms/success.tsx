import { FaCheckCircle } from "react-icons/fa";

interface FormSuccessProps {
    message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
    if(!message) return null;

    return (
        <div className="bg-emerald-500/15 p-3 rounded-md flex items-center text-sm text-emerald-500 gap-x-2">
            <FaCheckCircle className="h-4 w-4"/>
            <p>{message}</p>
        </div>
    )
}