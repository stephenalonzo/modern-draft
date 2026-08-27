import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { GroupProps } from '@/types';

interface Coaches {
    id: number,
    first_name: string,
    last_name: string
}

interface Drafts {
    id: number,
    draft_id: number
}

interface PageProps {
    coaches: Coaches[],
    drafts: Drafts[]
}
export default function Draft({groupUuid}: GroupProps) {
    const { coaches, drafts } = (usePage().props as unknown) as PageProps;

    const { setData, data, post, processing } = useForm({
        coaches: coaches.map((coach) => ({
            id: coach.id,
            coach: coach.first_name + ' ' + coach.last_name
        })),
        draft_id: ''
    });

    function submit(e: any) {
        e.preventDefault();
        post(route('draftOrderStore', {group: groupUuid}));
    }

    return (
        <>
            <Head title="Draft Order" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="w-full space-y-3">
                    <h3 className="font-semibold">Create draft order</h3>
                    <form onSubmit={submit} className="w-full space-y-4">
                        <select value={data.draft_id} onChange={(e) => setData("draft_id", e.target.value)} id="countries" className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body">
                            <option defaultValue={''}>Select draft</option>
                            {(drafts.map((draft) => (
                            <option key={draft.id} value={draft.draft_id}>{draft.draft_id}</option>
                            )))}
                        </select>
                        {(data.coaches.map((coach, index) => (
                            <div key={coach.id}>
                                <input type="text" value={data.coaches[index].coach} className='block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-md focus:ring-brand focus:border-brand px-3 py-2.5 shadow-xs placeholder:text-body' onChange={(e) => setData(`coaches.${index}.coach`, e.target.value)} />
                            </div>
                        )))}
                        <button type='submit' disabled={processing} className='w-full px-4 py-2 rounded-md bg-blue-600 text-white'>Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}


Draft.layout = {
    breadcrumbs: [
        {
            title: 'Create draft order',
            href: '',
        },
    ],
};
