interface IconsProps {
    w?: number;
    h?: number;
}

export function UserIcon({ w = 24, h = 24 }: IconsProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={w}
            height={h}
            viewBox="0 0 512 512"
            className="fill-current"
        >
            <circle cx="256" cy="128" r="128"></circle>
            <path d="M256 298.667c-105.99.118-191.882 86.01-192 192C64 502.449 73.551 512 85.333 512h341.333c11.782 0 21.333-9.551 21.333-21.333-.117-105.99-86.009-191.883-191.999-192z"></path>
        </svg>
    )
}

export function CheckIcon({ w = 24, h = 24 }: IconsProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={w}
            height={h}
            viewBox="0 0 512 512"
            className="fill-current"
        >
            <path d="M163.865 436.934a54.228 54.228 0 01-38.4-15.915L9.369 304.966c-12.492-12.496-12.492-32.752 0-45.248 12.496-12.492 32.752-12.492 45.248 0l109.248 109.248L452.889 79.942c12.496-12.492 32.752-12.492 45.248 0 12.492 12.496 12.492 32.752 0 45.248L202.265 421.019a54.228 54.228 0 01-38.4 15.915z"></path>
        </svg>
    )
}

export function BurgerBtn({ w = 24, h = 24 }: IconsProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
    )
}