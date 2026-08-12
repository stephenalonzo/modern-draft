import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';
import { Clock, Settings } from 'lucide-react';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden flex flex-col items-center justify-center space-y-4 rounded-xl border border-sidebar-border/70 bg-green-600 text-white dark:border-sidebar-border">
                        <div className="text-center space-y-2">
                            <h3 className="text-3xl font-semibold tracking-tight">Players</h3>
                            <p>You have added 12 players.</p>
                        </div>
                        <a href="" className='px-4 py-2 bg-white text-gray-950 rounded-md flex items-center space-x-1.5'>
                            <Settings className='text-sm'/>
                            <span>Manage Players</span>
                        </a>
                    </div>
                    <div className="relative aspect-video overflow-hidden flex flex-col items-center justify-center space-y-4 rounded-xl border border-sidebar-border/70 bg-blue-600 text-white dark:border-sidebar-border">
                        <div className="text-center space-y-2">
                            <h3 className="text-3xl font-semibold tracking-tight">Coaches</h3>
                            <p>You have added 4 players.</p>
                        </div>
                        <a href="" className='px-4 py-2 bg-white text-gray-950 rounded-md flex items-center space-x-1.5'>
                            <Settings className='text-sm'/>
                            <span>Manage Coaches</span>
                        </a>
                    </div>
                    <div className="relative aspect-video overflow-hidden flex flex-col items-center justify-center space-y-4 rounded-xl border border-sidebar-border/70 bg-yellow-600 text-white dark:border-sidebar-border">
                        <div className="text-center space-y-2">
                            <h3 className="text-3xl font-semibold tracking-tight">Draft</h3>
                            <p>No pending draft.</p>
                        </div>
                        <a href="" className='px-4 py-2 bg-white text-gray-950 rounded-md flex items-center space-x-1.5'>
                            <Clock className='text-sm'/>
                            <span>Past Drafts</span>
                        </a>
                    </div>
                </div>
                <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="px-4 py-2 rounded rounded-b-none bg-blue-100 text-blue-900">
                        <h3 className="font-semibold text-lg">Past Drafts</h3>
                    </div>
                    <div className="px-4 py-2 space-y-3">
                        <h4>Past drafts and some of their data are available for your references and convenience.</h4>
                        <ul className='w-full'>
                            <a href="">
                                <li className='w-full'>
                                    <div className='px-4 py-2 rounded-md border border-gray-200 space-x-1.5 w-full'>
                                        <span className='font-semibold'>Draft 42356 (COMPLETE)</span>
                                        <span className='text-xs text-gray-500'>Last pick made: Jul 21, 2026 6:46:27 AM</span>
                                    </div>
                                </li>
                            </a>
                        </ul>
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
            href: dashboard(),
        },
    ],
};
