import { Head, usePage } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { Settings } from 'lucide-react';
import { route } from 'ziggy-js';

interface Drafts {
    id: number,
    draft_id: number,
    draft_status: string
}
interface PageProps {
    players: number,
    coaches: number,
    drafts: Drafts[],
    groupUuid: string;
}
export default function Dashboard() {
    const { players, coaches, drafts, groupUuid } = (usePage().props as unknown) as PageProps;

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden flex flex-col items-center justify-center space-y-4 rounded-xl border border-sidebar-border/70 bg-green-600 text-white dark:border-sidebar-border">
                        <div className="text-center space-y-2">
                            <h3 className="text-3xl font-semibold tracking-tight">Players</h3>
                            <p>You have added {players} players.</p>
                        </div>
                        <a href={route('playersIndex')} className='px-4 py-2 bg-white text-gray-950 rounded-md flex items-center space-x-1.5'>
                            <Settings className='text-sm' />
                            <span>Manage Players</span>
                        </a>
                    </div>
                    <div className="relative aspect-video overflow-hidden flex flex-col items-center justify-center space-y-4 rounded-xl border border-sidebar-border/70 bg-blue-600 text-white dark:border-sidebar-border">
                        <div className="text-center space-y-2">
                            <h3 className="text-3xl font-semibold tracking-tight">Coaches</h3>
                            <p>You have added {coaches} coaches.</p>
                        </div>
                        <a href={route('coachesIndex')} className='px-4 py-2 bg-white text-gray-950 rounded-md flex items-center space-x-1.5'>
                            <Settings className='text-sm' />
                            <span>Manage Coaches</span>
                        </a>
                    </div>
                    <div className="relative aspect-video overflow-hidden flex flex-col items-center justify-center space-y-4 rounded-xl border border-sidebar-border/70 bg-yellow-600 text-white dark:border-sidebar-border">
                        <div className="text-center space-y-2">
                            <h3 className="text-3xl font-semibold tracking-tight">Draft</h3>
                            <p>No pending draft.</p>
                        </div>
                        <a href={route('draftsIndex')} className='px-4 py-2 bg-white text-gray-950 rounded-md flex items-center space-x-1.5'>
                            <Settings className='text-sm' />
                            <span>Manage Drafts</span>
                        </a>
                    </div>
                </div>
                <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="px-4 py-2 rounded rounded-b-none bg-blue-100 text-blue-900">
                        <h3 className="font-semibold text-lg">Past Drafts</h3>
                    </div>
                    <div className="px-4 py-2 space-y-3">
                        <h4>Past drafts and some of their data are available for your references and convenience.</h4>
                        {drafts.map((draft) => (
                            <ul className='w-full'>
                                <li className='w-full'>
                                    <div className='px-4 py-3 rounded-md border border-gray-200 space-x-1.5 w-full flex items-center justify-between'>
                                        <span className='font-semibold'>Draft {draft.draft_id} <span className="uppercase text-green-500">{draft.draft_status}</span></span>
                                        <a href={route('draftsShow', draft.draft_id)} className='bg-black text-white px-4 py-2 rounded-md text-sm'>View Results</a>
                                    </div>
                                </li>
                            </ul>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            // href: dashboard(),
        },
    ],
};
