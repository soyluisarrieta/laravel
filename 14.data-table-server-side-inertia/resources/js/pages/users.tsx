import { Head, useForm } from '@inertiajs/react';
import InputSearch from '@/components/data-table/data-table-input-search';
import Pagination from '@/components/data-table/data-table-pagination';
import DataTableSortList from '@/components/data-table/data-table-sort-list';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { formatDate } from '@/lib/utils';
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

export interface Filters {
    search: string;
    perPage: number;
    sortBy: string;
    sortOrder: string;
}

interface PageProps {
    users: UsersPaginated;
    filters: Filters;
}

export default function Users({ users, filters }: PageProps) {
    const { data, setData } = useForm({
        search: filters.search || '',
        perPage: filters.perPage,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="w-full max-w-7xl space-y-2 self-center">
                    <InputSearch
                        filters={filters}
                        route={usersRoute()}
                        value={data.search}
                        onValueChange={(value) => setData('search', value)}
                        placeholder="Search users..."
                    />

                    <Table>
                        <TableHeader>
                            <TableRow className="border-0! [&>th]:bg-muted [&>th]:text-muted-foreground [&>th]:first:rounded-l-xl [&>th]:last:rounded-r-xl">
                                <TableHead
                                    className="pl-5"
                                    style={{ width: 100 }}
                                >
                                    <DataTableSortList
                                        filters={filters}
                                        route={usersRoute()}
                                        field="name"
                                    >
                                        Name
                                    </DataTableSortList>
                                </TableHead>
                                <TableHead>
                                    <DataTableSortList
                                        filters={filters}
                                        route={usersRoute()}
                                        field="email"
                                    >
                                        Email
                                    </DataTableSortList>
                                </TableHead>
                                <TableHead>
                                    <DataTableSortList
                                        filters={filters}
                                        route={usersRoute()}
                                        field="created_at"
                                    >
                                        Created At
                                    </DataTableSortList>
                                </TableHead>
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
                                        <TableCell>
                                            {formatDate(user.created_at)}
                                        </TableCell>
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

                    <Pagination
                        filters={filters}
                        route={usersRoute()}
                        links={users.links}
                        currentPage={data.perPage.toString()}
                        onCurrentPageChange={(value) =>
                            setData('perPage', Number(value))
                        }
                    />
                </div>
            </div>
        </AppLayout>
    );
}
