import { Head, usePage } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { useForm } from "@inertiajs/react";
import { route } from 'ziggy-js';

interface Player {
    id: number,
    first_name: string,
    last_name: string,
    comments: string
}

interface PageProps {
    player: Player,
    groupUuid: string;
}

export default function Dashboard() {
    const { player, groupUuid } = (usePage().props as unknown) as PageProps;

    const { data, setData, put, processing } = useForm({
        first_name: player.first_name,
        last_name: player.last_name,
        comments: player.comments,
    });

    function update(e: any) {
        e.preventDefault();
        put(route('playersUpdate', {player: player.id, group: groupUuid}));
    }

    return (
        <>
            <Head title="Edit a player" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="w-full space-y-3">
                    <h3 className="font-semibold">Edit a player</h3>
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
                            <div className="w-full flex flex-col space-y-2">
                                <label htmlFor="comments" className='text-sm'>Comments</label>
                                <input type="text" value={data.comments} id='comments' className='px-4 py-2 rounded-md border w-full' onChange={(e) => setData("comments", e.target.value)} />
                            </div>
                        </div>
                        <button type='submit' disabled={processing} className='w-full px-4 py-2 rounded-md bg-green-600 text-white'>Update</button>
                    </form>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Edit player',
            href: '',
        },
    ],
};
