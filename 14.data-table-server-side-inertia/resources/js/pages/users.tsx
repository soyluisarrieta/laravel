import { Head } from '@inertiajs/react';
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
}

interface UsersProps {
    users: User[];
}

export default function Users({ users }: UsersProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <pre>{JSON.stringify(users, null, 2)}</pre>
            </div>
        </AppLayout>
    );
}
