import { Head, Link } from '@inertiajs/react';
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
import { cn } from '@/lib/utils';
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

interface PageLinkItem {
    active: boolean;
    label: string;
    url: string;
}

interface PageProps {
    data: User[];
    links: PageLinkItem[];
}

export default function Users({ users }: { users: PageProps }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="w-full max-w-7xl self-center">
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

                    <div className="flex flex-wrap items-center justify-center gap-1 border-t pt-4">
                        {users.links.map((link, index) => (
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
            </div>
        </AppLayout>
    );
}
