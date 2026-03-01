import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Filters } from '@/pages/users';
import type { RouteDefinition } from '@/wayfinder';

interface DataTableInputSearchProps {
    value: string;
    onValueChange: (value: string) => void;
    route: RouteDefinition<'get'>;
    filters: Filters;
    placeholder?: string;
}

export default function DataTableInputSearch({
    value,
    onValueChange,
    route,
    filters,
    placeholder = 'Search...',
}: DataTableInputSearchProps) {
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
        null,
    );

    // Handle search input change
    const onChangeSearch = (e?: React.ChangeEvent<HTMLInputElement>) => {
        const inputSearch = e?.target.value ?? '';
        onValueChange(inputSearch);

        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        const newSearchTimeout = setTimeout(() => {
            const queryString = { ...filters, search: inputSearch };
            router.get(route, queryString, {
                preserveState: true,
                preserveScroll: true,
            });
        }, 300);

        setSearchTimeout(newSearchTimeout);
    };

    // Clear timeout on unmount
    useEffect(() => {
        return () => {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        };
    }, [searchTimeout]);

    return (
        <div className="flex w-full max-w-sm items-center space-x-2">
            <div className="grid gap-2">
                <Label htmlFor="search">Search</Label>
                <div className="flex items-center gap-2">
                    <Input
                        id="search"
                        type="text"
                        name="search"
                        placeholder={placeholder}
                        value={value}
                        onChange={onChangeSearch}
                    />
                    {value && (
                        <Button
                            className="px-0 text-xs text-muted-foreground"
                            variant="link"
                            size="sm"
                            onClick={() => onChangeSearch()}
                        >
                            Clear
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
