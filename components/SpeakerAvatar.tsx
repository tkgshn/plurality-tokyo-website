'use client';

import Image from 'next/image';
import { useState } from 'react';

interface SpeakerAvatarProps {
    src: string;
    alt: string;
}

export const SpeakerAvatar = ({ src, alt }: SpeakerAvatarProps) => {
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <div className="relative inline-block w-8 h-8 rounded-full overflow-hidden border border-gray-800">
            <Image
                src={imgSrc}
                alt={alt}
                fill
                className="object-cover"
                onError={() => setImgSrc('/images/speakers/default-avatar.png')}
            />
        </div>
    );
};
