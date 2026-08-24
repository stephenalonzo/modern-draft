import { Head, usePage} from '@inertiajs/react';
import { teamsIndex } from '@/routes';

interface Players {
    id: number,
    first_name: string,
    last_name: string,
    pivot?: {
        coach_id: number,
        player_id: number
    }
}

interface Coaches {
    id: number,
    first_name: string,
    last_name: string,
    players: Players[]
}

interface PageProps {
    coaches: Coaches[]
}

export default function teamView() {
    const { coaches } = (usePage().props as unknown) as PageProps;

    function getInitials(name: string, maxInitials?: number): string {
        if (!name || typeof name !== "string") return '';

        const initials = name
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .map((part) => part.charAt(0).toUpperCase());

        const selectedInitials = maxInitials ? initials.slice(0, maxInitials) : initials;

        return selectedInitials.join('');
    }

    return (
        <>
            <Head title="Team View" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid grid-cols-3 gap-3">
                    {coaches.map((coach) => (
                        <div key={coach.id} className="flex flex-col items-center justify-center space-y-5">
                            <span className="p-6 rounded-full bg-gray-100 size-20 flex flex-col items-center justify-center">
                                <h4 className="text-center text-xs">Coach</h4>
                                <h3 className='text-center text-2xl'>{getInitials(coach.first_name + ' ' + coach.last_name)}</h3>
                            </span>
                            <ul className='space-y-3'>
                            {coach.players.map((player) => (
                                    <li key={player.id} className='px-4 py-2 rounded-md border'>{player.first_name + ' ' + player.last_name}</li>
                            ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

teamView.layout = {
    breadcrumbs: [
        {
            title: 'Team View',
        },
    ],
};
