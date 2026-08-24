import { Head, Link, usePage, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { route } from 'ziggy-js';
import { GroupProps } from '@/types';

interface Coaches {
    id: number,
    first_name: string,
    last_name: string,
    pivot?: {
        coach_id: number,
        player_id: number
    }
}

interface Players {
    id: number,
    first_name: string,
    last_name: string,
    comments: string,
    coaches: Coaches[]
}

interface Draft {
    id: number,
    draft_id: number,
    draft_status: string
}

interface DraftPick {
    id: number,
    player_first_name: string,
    player_last_name: string,
    coach: string
}

interface PageProps {
    players: Players[]
    draft: Draft,
    coach: string,
    recentPickCoach: string,
    draftPick: DraftPick[],
    coaches: Coaches[]
}

export default function Draft({groupUuid}: GroupProps) {
    const { players, draft, coach, recentPickCoach, draftPick, coaches } = (usePage().props as unknown) as PageProps;

    const { put } = useForm({});

    const { processing, data, setData } = useForm({
        draft_id: draft.draft_id,
        players: players.map((player) => ({
            id: player.id,
            player_first_name: player.first_name,
            player_last_name: player.last_name,
            coaches: player.coaches || []
        })),
    })

    function startDraft(e: any) {
        e.preventDefault();
        put(route('draftStart', {draft: draft.draft_id, group: groupUuid}));
    }

    function endDraft(e: any) {
        e.preventDefault();
        put(route('draftEnd', {draft: draft.draft_id, group: groupUuid}));
    }

    const handleSelectPlayer = (index: any) => {
        const selectedPlayer = data.players[index];

        router.post(route('draftPick', {draft: draft.draft_id, group: groupUuid}), {
            draft_id: data.draft_id,
            player_first_name: selectedPlayer.player_first_name,
            player_last_name: selectedPlayer.player_last_name,
        });
    };

    return (
        <>
            <Head title="Drafts" />
            <div className="flex h-full flex-1 flex-col gap-2 overflow-x-auto rounded-xl p-4">
                <div>
                    {draft.draft_status !== 'completed' && (
                        <div>
                            {draft.draft_status == 'active' ? (
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="p-4 rounded-md bg-orange-400 text-white w-full flex items-center justify-between">
                                        <h3 className="text-4xl font-semibold tracking-tight">On the board:</h3>
                                        <h2 className='text-xl'>{coach}</h2>
                                    </div>
                                    {draftPick.length > 0 && (
                                        (draftPick.map((pick) => (
                                            <div key={pick.id} className="p-4 rounded-md bg-blue-400 text-white w-full flex items-center justify-between">
                                                <h3 className="text-4xl font-semibold tracking-tight">Last pick:</h3>
                                                <h2 className='text-xl'>{pick.player_first_name + ' ' + pick.player_last_name} <span className="text-sm">(Pick made by {pick.coach})</span></h2>
                                            </div>
                                        )))
                                    )}
                                </div>
                            ) : (
                                <form onSubmit={startDraft}>
                                    <Button className='bg-green-600'>Start Draft</Button>
                                </form>
                            )}
                        </div>
                    )}
                </div>
                <form className='space-y-2'>
                    <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-md border border-default">
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
                            {players.length > 0 && (
                                <tbody>
                                    {data.players.map((player, index) => (
                                        <tr className="bg-neutral-primary border-b border-default" key={player.id}>
                                            <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                                <input type="text" value={player.player_first_name} onChange={(e) => setData(`players.${index}.player_first_name`, e.target.value)} />
                                            </th>
                                            <td className="px-6 py-4">
                                                <input type="text" value={player.player_last_name} onChange={(e) => setData(`players.${index}.player_last_name`, e.target.value)} />
                                            </td>
                                            <td className="px-6 py-4 space-x-2">
                                                {player.coaches && player.coaches.length > 0 ? (
                                                    <div>
                                                        {player.coaches.map((coach) => (
                                                            <span key={coach.id}>
                                                                <span>Selected by {coach.first_name + ' ' + coach.last_name}</span>
                                                            </span>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <button type='submit' onClick={() => handleSelectPlayer(index)} disabled={processing} className='px-4 py-2 rounded-md bg-green-600 text-white'>Select</button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            )}
                        </table>
                    </div>
                </form>
                <div>
                    {draft.draft_status == 'active' && (
                        <form onSubmit={endDraft}>
                            <button type='submit' disabled={processing} className='px-4 py-2 rounded-md bg-red-600 text-white'>End Draft</button>
                        </form>
                    )}
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
