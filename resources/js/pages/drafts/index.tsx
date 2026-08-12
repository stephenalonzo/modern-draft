import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { route } from 'ziggy-js';

export default function Draft() {
    return (
        <>
            <Head title="Drafts" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="space-y-2">
                    <p>No current drafts. Ready to start one?</p>
                    <Link href={route('draftsCreate')}>
                        <Button className='bg-green-600'>Create new draft</Button>
                    </Link>
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


Draft.layout = {
    breadcrumbs: [
        {
            title: 'Create draft',
            href: '',
        },
    ],
};
