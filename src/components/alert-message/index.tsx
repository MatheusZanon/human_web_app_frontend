import React from "react";
import { AlertTriangle } from 'lucide-react';

interface AlertMessageProps {
    message: string
}

const AlertMessage:React.FC<AlertMessageProps> = ({message}) => {
    return (
        <h6 className='text-center align-self-center'>
            {message}{' '}
            <p className='mt-2'>
                <AlertTriangle color="#DDA915"/>
            </p>
        </h6>
    )
}

export default AlertMessage;