import { Link } from '@inertiajs/react';
import {
    ArrowDownUpIcon,
    ArrowDownWideNarrowIcon,
    ArrowUpWideNarrowIcon,
} from 'lucide-react';
import { cn, cleanFilters } from '@/lib/utils';
import type { Filters } from '@/pages/users';
import type { RouteDefinition } from '@/wayfinder';

interface DataTableSortListProps {
    filters: Filters;
    route: RouteDefinition<'get'>;
    field: string;
    children: React.ReactNode;
}

export default function DataTableSortList({
    filters,
    route,
    field,
    children,
}: DataTableSortListProps) {
    const isActived = filters.sortBy === field;
    const isSortAsc = isActived && (filters.sortOrder || 'desc') === 'asc';

    return (
        <>
            <Link
                className={cn(
                    'flex items-center space-x-2 text-xs font-bold',
                    isActived && 'text-primary',
                )}
                href={route}
                data={cleanFilters({
                    ...filters,
                    sortBy: field,
                    sortOrder: isSortAsc ? 'desc' : 'asc',
                })}
            >
                <div>{children}</div>
                {isActived ? (
                    isSortAsc ? (
                        <ArrowDownWideNarrowIcon className="size-4" />
                    ) : (
                        <ArrowUpWideNarrowIcon className="size-4" />
                    )
                ) : (
                    <ArrowDownUpIcon className="size-4" />
                )}
            </Link>
        </>
    );
}
