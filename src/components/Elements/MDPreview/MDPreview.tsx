import createDOMPurify from 'dompurify';
import { marked } from 'marked';

const DOMPurify = createDOMPurify(window);

export type MDPreviewProps = {
    value: string | Promise<string>;
};

export const MDPreview = async ({ value = '' }: MDPreviewProps) => {
    const resolvedValue = typeof value === 'string' ? value : await value;
    return (
        <div
            className="p-2 w-full prose prose-indigo"
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(marked(resolvedValue)),
            }}
        />
    );
};