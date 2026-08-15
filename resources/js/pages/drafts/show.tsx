import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { route } from 'ziggy-js';

interface Players {
    id: number,
    first_name: string,
    last_name: string,
    comments: string
}

interface PageProps {
    players: Players[]
}

export default function Draft() {
    const { players } = (usePage().props as unknown) as PageProps;

    return (
        <>
            <Head title="Drafts" />
            <div className="flex h-full flex-1 flex-col gap-2 overflow-x-auto rounded-xl p-4">
                <div className="grid grid-cols-2 gap-6">
                    <div className="p-4 rounded-md bg-orange-400 text-white w-full flex items-center justify-between">
                        <h3 className="text-4xl font-semibold tracking-tight">On the board:</h3>
                        <h2 className='text-xl'>Mike Brown</h2>
                    </div>
                    <div className="p-4 rounded-md bg-blue-400 text-white w-full flex items-center justify-between">
                        <h3 className="text-4xl font-semibold tracking-tight">Last pick:</h3>
                        <h2 className='text-xl'>Luka Doncic <span className="text-sm">(1st Pick made by JJ Reddick)</span></h2>
                    </div>
                </div>
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
                                    Comments
                                </th>
                                <th scope="col" className="px-6 py-3 font-medium">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        {players.length > 0 && (
                            <tbody>
                                {players.map((player) => (
                                    <tr className="bg-neutral-primary border-b border-default" key={player.id}>
                                        <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                            {player.first_name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {player.last_name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {player.comments}
                                        </td>
                                        <td className="px-6 py-4 space-x-2">
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


Draft.layout = {
    breadcrumbs: [
        {
            title: 'Create draft',
            href: '',
        },
    ],
};
