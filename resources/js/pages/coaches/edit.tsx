import { Head, usePage } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { useForm } from "@inertiajs/react";
import { route } from 'ziggy-js';
import { GroupProps } from '@/types';

interface Coach {
    id: number,
    first_name: string,
    last_name: string,
}

interface PageProps {
    coach: Coach
}

export default function Dashboard({groupUuid}: GroupProps) {
    const { coach } = (usePage().props as unknown) as PageProps;

    const { data, setData, put, processing } = useForm({
        first_name: coach.first_name,
        last_name: coach.last_name,
    });

    function update(e: any) {
        e.preventDefault();
        put(route('coachesUpdate', {coach: coach.id, group: groupUuid}));
    }

    return (
        <>
            <Head title="Edit a coach" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="w-full space-y-3">
                    <h3 className="font-semibold">Edit a coach</h3>
                    <form onSubmit={update} className="w-full space-y-4">
                        <div className="flex items-center justify-between space-x-2">
                            <div className="w-full flex flex-col space-y-2">
                                <label htmlFor="playerFirstName" className='text-sm'>First Name</label>
                                <input type="text" value={data.first_name} id='playerFirstName' className='px-4 py-2 rounded-md border w-full' onChange={(e) => setData("first_name", e.target.value)} />
                            </div>
                            <div className="w-full flex flex-col space-y-2">
                                <label htmlFor="playerLastName" className='text-sm'>Last Name</label>
                                <input type="text" value={data.last_name} id='playerLastName' className='px-4 py-2 rounded-md border w-full' onChange={(e) => setData("last_name", e.target.value)} />
                            </div>
                        </div>
                        <button type='submit' disabled={processing} className='w-full px-4 py-2 rounded-md bg-green-600 text-white'>Edit</button>
                    </form>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Edit coach',
        },
    ],
};
