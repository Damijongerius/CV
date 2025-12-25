// File: src/components/ContactDetail.tsx
import Image from "next/image";

interface Props {
    icon: string;
    name: string;
    backgroundColor?: string;
}

export default function ContactDetail({ icon, name, backgroundColor }: Props) {
    const bg = backgroundColor ?? "transparent";

    return (
        <div className="contact-detail" role="button" tabIndex={0}>
            <div className="icon-wrap" aria-hidden style={{ backgroundColor: bg }}>
                <Image src={icon} alt={`${name} icon`} width={64} height={64} />
            </div>
            <p className="name">{name}</p>

            <style jsx>{`
                .contact-detail {
                    display: inline-flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    padding: 6px;
                    cursor: pointer;
                    user-select: none;
                    outline: none;
                }

                .contact-detail:focus .icon-wrap,
                .contact-detail:hover .icon-wrap {
                    transform: translateY(-6px) scale(1.05);
                    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
                }

                .icon-wrap {
                    width: 64px;
                    height: 64px;
                    border-radius: 10%;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 220ms cubic-bezier(.2,.8,.2,1), box-shadow 220ms ease;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
                    flex: 0 0 64px;
                }

                .name {
                    margin: 0;
                    font-size: 0.95rem;
                    color: #0f172a;
                    font-weight: 500;
                    text-align: center;
                    line-height: 1;
                }

                /* Ensure good contrast if a dark background is used behind the icon */
                @media (prefers-color-scheme: light) {
                    .name { color: #0f172a; }
                }
                @media (prefers-color-scheme: dark) {
                    .name { color: #e6eef8; }
                }
            `}</style>
        </div>
    );
}
