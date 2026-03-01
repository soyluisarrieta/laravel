import { Link } from "@inertiajs/react";
import { cn } from "@/lib/utils";
import { PageLinkItem } from "@/pages/users";

interface PaginationProps {
    links: PageLinkItem[];
}

export default function Pagination({ links }: PaginationProps) {
    return (
        <div className="flex items-center justify-center gap-0.5">
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={link.url ?? '#'}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={cn(
                        'rounded border px-3 py-1 text-sm',
                        link.active
                            ? 'bg-foreground text-background'
                            : 'bg-background text-foreground',
                        !link.url
                            ? 'pointer-events-none opacity-50'
                            : 'hover:bg-foreground/10',
                    )}
                />
            ))}
        </div>
    )
}
