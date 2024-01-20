import Image from "next/image";

export default function TempImage({ imagename, width }) {
    return (
        <Image
            src={`/${imagename}.png`}
            width={width}
            height={width}
            alt={imagename}
            priority={false}
            style={{
                transition: 'opacity 0.3s ease',
                opacity : 0.8
            }}
        />
    );
}
