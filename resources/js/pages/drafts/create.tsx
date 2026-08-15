import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Coaches {
    id: string,
    first_name: string,
    last_name: string
}

interface PageProps {
    coaches: Coaches[]
}
export default function Draft() {
    const { coaches } = (usePage().props as unknown) as PageProps;

    const { setData, data, post, processing } = useForm({
        draft_start: '',
        draft_order: false,
        auto_pick: false
    });

    function submit(e: any) {
        e.preventDefault();
        post("/draft/store");
    }

    return (
        <>
            <Head title="Drafts" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="w-full space-y-3">
                    <h3 className="font-semibold">Create draft</h3>
                    <form onSubmit={submit} className="w-full space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="w-full flex flex-col space-y-2">
                                <label htmlFor="time" className='text-sm'>Draft Start</label>
                                <input type="time" id="time" className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-md focus:ring-brand focus:border-brand px-3 py-2.5 shadow-xs placeholder:text-body" min="00:00" max="24:00" value={data.draft_start} required onChange={(e) => setData("draft_start", e.target.value)} />
                            </div>
                            <div className="w-full flex flex-col space-y-2 col-span-2">
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" checked={data.draft_order} className="sr-only peer" onChange={(e) => setData("draft_order", e.target.checked)} />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Show draft order</span>
                                </label>
                            </div>
                            <div className="w-full flex flex-col space-y-2 col-span-2">
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" checked={data.auto_pick} className="sr-only peer" onChange={(e) => setData("auto_pick", e.target.checked)} />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Auto pick</span>
                                </label>
                            </div>
                        </div>
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
            title: 'Create draft',
            href: '',
        },
    ],
};
