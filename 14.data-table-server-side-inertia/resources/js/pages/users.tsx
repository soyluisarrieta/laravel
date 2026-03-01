import { Head } from '@inertiajs/react';
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
import { users } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: users(),
    },
];

interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    email_verified_at: string | null;
}

interface UsersProps {
    users: User[];
}

export default function Users({ users }: UsersProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="w-full max-w-7xl self-center">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-0! [&>th]:bg-muted [&>th]:text-muted-foreground [&>th]:first:rounded-l-xl [&>th]:last:rounded-r-xl">
                                <TableHead
                                    className="py-3 pl-5"
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
                            {users.length > 0 ? (
                                users.map((user) => (
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
                </div>
            </div>
        </AppLayout>
    );
}
