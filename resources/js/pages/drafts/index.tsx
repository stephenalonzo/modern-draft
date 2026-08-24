import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { route } from 'ziggy-js';
import { GroupProps } from '@/types';

interface Drafts {
    id: number
    draft_id: string
    draft_status: string
}

interface CompletedDrafts {
    id: number
    draft_id: string
    draft_status: string
}

interface PageProps {
    drafts: Drafts[],
    completedDrafts: CompletedDrafts[]
}
export default function Draft({groupUuid}: GroupProps) {
    const { drafts, completedDrafts } = (usePage().props as unknown) as PageProps;
    // const { groupUuid } = (usePage().props as unknown) as GroupProps;

    return (
        <>
            <Head title="Drafts" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {drafts.length > 0 ? (
                    <div>
                        {drafts.map((draft) => (
                            <div key={draft.id}>
                                {draft.draft_status == 'pending' || draft.draft_status == 'active' ? (
                                    <div className="p-4 border rounded-md flex flex-col space-y-2">
                                        <span><span className='font-semibold'>Happening now:</span> Draft {draft.draft_id}</span>
                                        <Link href={route('draftsShow', { draft: draft.draft_id, group: groupUuid })}>
                                            <Button>Join Draft</Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="p-4 border rounded-md flex flex-col space-y-2">
                                        <p>No current drafts. Ready to start one?</p>
                                        <Link href={route('draftsCreate', groupUuid)}>
                                            <Button className='bg-green-600'>Create new draft</Button>
                                        </Link>
                                    </div>
                                )
                                }
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-4 border rounded-md flex flex-col space-y-2">
                        <p>No current drafts. Ready to start one?</p>
                        <Link href={route('draftsCreate', groupUuid)}>
                            <Button className='bg-green-600'>Create new draft</Button>
                        </Link>
                    </div>
                )}
                <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="px-4 py-2 rounded rounded-b-none bg-blue-100 text-blue-900">
                        <h3 className="font-semibold text-lg">Past Drafts</h3>
                    </div>
                    <div className="px-4 py-2 space-y-3">
                        <h4>Past drafts and some of their data are available for your references and convenience.</h4>
                        {completedDrafts.map((draft) => (
                            <ul key={draft.id} className='w-full'>
                                {draft.draft_status == 'completed' && (
                                    <li className='w-full'>
                                        <div className='px-4 py-3 rounded-md border border-gray-200 space-x-1.5 w-full flex items-center justify-between'>
                                            <span className='font-semibold'>Draft {draft.draft_id} <span className="uppercase text-green-500">{draft.draft_status}</span></span>
                                            <a href={route('draftsShow', {draft: draft.draft_id, group: groupUuid})} className='bg-black text-white px-4 py-2 rounded-md text-sm'>View Results</a>
                                        </div>
                                    </li>
                                )}
                            </ul>
                        ))}
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
