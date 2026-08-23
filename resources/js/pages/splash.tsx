import { usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
interface Groups {
    id: number;
    group_uuid: string;
    group_name: string;
    pivot?: {
        group_id: number;
        group_name: string;
    }
}

interface Users {
    id: number;
    name: string;
    groups?: Groups[];
}

interface PageProps {
    users: Users[];
}

export default function Splash() {
    const { users } = (usePage().props as unknown) as PageProps;

    return (
        <>
            <div className="min-h-screen max-w-md flex flex-col space-y-6 justify-center items-center m-auto">
                <h3 className="font-semibold">Select group</h3>
                <div className="space-y-4 min-w-full">
                   {users.map((user) => (
                     <div key={user.id}>
                        {user.groups?.map((group) => (
                            <div key={group.id}>
                                <a href={route('dashboard', group.group_uuid)}>
                                    <div className="px-6 py-3 w-full rounded-md border text-center uppercase">{group.group_name}</div>
                                </a>
                            </div>
                        ))}
                    </div>
                   ))}
                    <div className="text-center underline">
                        <a href={route('groupsCreate')} className="text-sm text-blue-600">Create a new group</a>
                    </div>
                </div>
            </div>
        </>
    )
}
