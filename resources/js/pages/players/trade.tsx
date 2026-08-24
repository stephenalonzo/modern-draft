import { Head, useForm, usePage, router } from '@inertiajs/react';
import { playersIndex, teamsIndex, tradesIndex } from '@/routes';
import { TradeProps } from '@/types/trade';
import { route } from 'ziggy-js';
import { GroupProps } from '@/types';

export default function trade({ players }: TradeProps) {
    const {groupUuid} = (usePage().props as unknown) as GroupProps;

    const { put, processing, setData, data } = useForm({
        player_one_id: '',
        player_two_id: ''
    });

    function confirmTrade(e: any) {
        e.preventDefault();
        put(route('tradesConfirm', groupUuid));
    }

    return (
        <>
            <Head title="Trade" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h3 className="font-semibold">Make a trade</h3>
                <form onSubmit={confirmTrade} className='grid grid-cols-2 gap-3'>
                    <div className="space-y-6">
                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={''} onChange={(e) => setData('player_one_id', e.target.value)}>
                            <option defaultValue={''}>Choose a player</option>
                            {players.map((player) => (
                                <option key={player.id} value={player.id}>
                                    {player.first_name + ' ' + player.last_name}
                                    {player.coaches.map((coach) => (' (Coach: ' + coach.first_name + ' ' + coach.last_name + ')'))}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-6">
                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={''} onChange={(e) => setData('player_two_id', e.target.value)}>
                            <option defaultValue={''}>Choose a player</option>
                            {players.map((player, index) => (
                                <option key={player.id} value={player.id}>
                                    {player.first_name + ' ' + player.last_name}
                                    {player.coaches.map((coach) => (' (Coach: ' + coach.first_name + ' ' + coach.last_name + ')'))}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-6">
                        <button type='submit' className='px-4 py-2 rounded-md bg-green-600 text-white'>Confirm Trade</button>
                    </div>
                </form>
            </div>
        </>
    );
}

trade.layout = {
    breadcrumbs: [
        {
            title: 'Trade',
        },
    ],
};
