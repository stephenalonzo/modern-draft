import { Head, usePage } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { coachesCreate, dashboard } from '@/routes';
import { Clock, Settings } from 'lucide-react';
import { useForm } from "@inertiajs/react";
import { route } from 'ziggy-js';
import { GroupProps } from '@/types';

export default function Dashboard() {
    const { groupUuid } = (usePage().props as unknown) as GroupProps;
    const { data, setData, post, processing } = useForm({
        first_name: '',
        last_name: '',
    });

    function submit(e: any) {
        e.preventDefault();
        post(route('coachesStore', groupUuid));
    }
    return (
        <>
            <Head title="Add a coach" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="w-full space-y-3">
                    <h3 className="font-semibold">Add a coach</h3>
                    <form onSubmit={submit} className="w-full space-y-4">
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
                        <button type='submit' disabled={processing} className='w-full px-4 py-2 rounded-md bg-blue-600 text-white'>Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Add a coach',
        },
    ],
};
