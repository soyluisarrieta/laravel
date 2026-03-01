import { Head, router, useForm } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Pagination from '@/components/ui/pagination';
import { Separator } from '@/components/ui/separator';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { users as usersRoute } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: usersRoute(),
    },
];

interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    email_verified_at: string | null;
}

export interface PageLinkItem {
    active: boolean;
    label: string;
    url: string;
}

interface UsersPaginated {
    data: User[];
    links: PageLinkItem[];
}

interface Filters {
    search: string;
}

interface PageProps {
    users: UsersPaginated;
    filters: Filters;
}

export default function Users({ users, filters }: PageProps) {
    const { data, setData } = useForm({
        search: filters.search || '',
    });

    const onChangeSearch = (e?: React.ChangeEvent<HTMLInputElement>) => {
        const inputSearch = e?.target.value ?? '';
        setData('search', inputSearch);

        const queryString = inputSearch ? { search: inputSearch } : {};

        router.get(usersRoute(), queryString, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="w-full max-w-7xl self-center">
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <div className="grid gap-2">
                            <Label htmlFor="search">Search</Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="search"
                                    type="text"
                                    name="search"
                                    value={data.search}
                                    onChange={onChangeSearch}
                                />
                                {data.search && (
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
                    <Table>
                        <TableHeader>
                            <TableRow className="border-0! [&>th]:bg-muted [&>th]:text-muted-foreground [&>th]:first:rounded-l-xl [&>th]:last:rounded-r-xl">
                                <TableHead
                                    className="pl-5"
                                    style={{ width: 100 }}
                                >
                                    Name
                                </TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead>Verified</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.data.length > 0 ? (
                                users.data.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="py-3 pl-5 font-medium">
                                            {user.name}
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.created_at}</TableCell>
                                        <TableCell>
                                            {user.email_verified_at ? (
                                                <Badge variant="secondary">
                                                    Verified
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline">
                                                    Not Verified
                                                </Badge>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="h-24 text-center"
                                    >
                                        No users found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <Separator className="mb-2" />
                    <Pagination links={users.links} />
                </div>
            </div>
        </AppLayout>
    );
}
