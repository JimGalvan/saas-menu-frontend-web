import React from 'react';

interface QueryErrorProps {
    message: string;
}

const QueryError: React.FC<QueryErrorProps> = ({ message }) => {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <p className="text-2xl font-bold text-red-500">{message}</p>
        </div>
    );
};

export default QueryError;