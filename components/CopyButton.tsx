'use client'

import { useState, useCallback } from 'react'
import { Clipboard, Copy } from 'lucide-react'

interface CopyButtonProps {
    text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }, [text]);

    return (
        <button
            onClick={handleCopy}
            style={{
                position: 'fixed',
                top: '10px',
                right: '10px',
                background: '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                zIndex: 100,
                fontSize: '14px'
            }}
        >
            {copied ? (
                <>
                    <Clipboard size={16} />
                    Copied!
                </>
            ) : (
                <>
                    <Copy size={16} />
                    Copy
                </>
            )}
        </button>
    );
}
