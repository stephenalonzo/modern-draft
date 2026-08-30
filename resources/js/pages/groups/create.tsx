import { Head, useForm } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function createGroup() {
    const { data, post, processing, setData } = useForm({
        group_name: ''
    });

    function groupCreate(e: any) {
        e.preventDefault();
        post(route('groupsStore'));
    }

    return (
        <>
        <Head title="Create group" />
            <div className="flex min-h-screen max-w-xl flex-1 flex-col items-center justify-center gap-4 overflow-x-auto m-auto rounded-xl p-4">
                <form onSubmit={groupCreate} className="border rounded-md p-4 w-full h-full space-y-4">
                    <h3 className="font-semibold text-lg">Create a group</h3>
                    <hr />
                    <div className="flex flex-col space-y-3">
                        <label htmlFor="groupName" className="font-semibold text-sm">Group Name</label>
                        <input id="groupName" type="text" className="px-3 py-2.5 rounded-md border bg-gray-50/50" placeholder="Example: My Cool Group" value={data.group_name} onChange={(e) => setData('group_name', e.target.value)}/>
                    </div>
                    <button type="submit" disabled={processing} className="px-4 py-2 rounded-md bg-green-600 text-white">Create</button>
                </form>
            </div>
        </>
    )
}
