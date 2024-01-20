import Image from "next/image";

export default function CCImage({ imagename, width }) {
    return (
        <Image
            src={`/${imagename}.png`}
            width={width}
            height={width}
            alt={imagename}
            priority={false}
        />
    );
}
