import React, {useEffect, useState} from 'react';
import createDOMPurify from 'dompurify';
import {marked} from 'marked';

const DOMPurify = createDOMPurify(window);

export type MDPreviewProps = {
    value: string | Promise<string>;
};

export const MDPreview: React.FC<MDPreviewProps> = ({value = ''}) => {
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            let resolvedValue = value;
            if (typeof value !== 'string') {
                resolvedValue = await value;
            }
            setContent(DOMPurify.sanitize(await marked(resolvedValue.trim())));
            setLoading(false);
        }

        fetchData();
    }, [value]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div
            className="p-2 w-full prose prose-indigo"
            dangerouslySetInnerHTML={{
                __html: content,
            }}
        />
    );
};