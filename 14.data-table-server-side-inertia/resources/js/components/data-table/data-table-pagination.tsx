import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { PageLinkItem } from '@/pages/users';
import type { RouteDefinition } from '@/wayfinder';

interface DataTablePaginationProps {
    links: PageLinkItem[];
    route: RouteDefinition<'get'>;
    currentPage: string;
}

export default function DataTablePagination({
    links,
    route,
    currentPage = '10',
}: DataTablePaginationProps) {
    const [perPage, setPerPage] = useState(currentPage);

    const onPerPageChange = (value: string) => {
        setPerPage(value);
        router.get(
            route,
            { perPage: value },
            { preserveState: true, preserveScroll: true },
        );
    };

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Label>Per Page</Label>
                <Select value={perPage} onValueChange={onPerPageChange}>
                    <SelectTrigger>
                        <SelectValue placeholder={perPage} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                </Select>
            </div>
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
        </div>
    );
}
