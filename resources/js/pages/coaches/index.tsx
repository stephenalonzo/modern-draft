import { Head, usePage, Link, useForm } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import { route } from 'ziggy-js';
import { Button } from '@/components/ui/button';
import { GroupProps } from '@/types';

interface Coaches {
    id: number,
    first_name: string,
    last_name: string,
}

interface PageProps {
    coaches: Coaches[]
}

export default function Dashboard({groupUuid}: GroupProps) {
    const { coaches } = (usePage().props as unknown) as PageProps;

    const {delete: destroy} = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this player?')) {
            destroy(route('playersDelete', id));
        }
    }

    return (
        <>
            <Head title="View Coaches" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                    <table className="w-full text-sm text-left rtl:text-right text-body">
                        <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                            <tr>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    First Name
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Last Name
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        {coaches.length > 0 && (
                            <tbody>
                                {coaches.map((coach) => (
                                    <tr className="bg-neutral-primary border-b border-default" key={coach.id}>
                                        <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                            {coach.first_name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {coach.last_name}
                                        </td>
                                        <td className="px-6 py-4 space-x-2">
                                            <Link href={route('coachesEdit', {coach: coach.id, group: groupUuid})}>
                                                <Button className='px-4 py-2 bg-green-600'><Pencil></Pencil></Button>
                                            </Link>
                                            <Button onClick={() => handleDelete(coach.id)} className='px-4 py-2 bg-red-700'>
                                                <Trash2></Trash2>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'View Coaches',
        },
    ],
};
