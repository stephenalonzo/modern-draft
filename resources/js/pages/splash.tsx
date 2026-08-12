export default function Splash() {
    return (
        <>
        <div className="min-h-screen max-w-md flex flex-col space-y-6 justify-center items-center m-auto">
            <h3 className="font-semibold">Select group</h3>
            <div className="space-y-4 min-w-full">
                <div>
                    <a href="/dashboard">
                        <div className="px-6 py-3 w-full rounded-md border text-center uppercase">Group #1</div>
                    </a>
                </div>
                <div>
                    <a href="">
                        <div className="px-6 py-3 w-full rounded-md border text-center uppercase">Group #1</div>
                    </a>
                </div>
                <div>
                    <a href="">
                        <div className="px-6 py-3 w-full rounded-md border text-center uppercase">Group #1</div>
                    </a>
                </div>
                <div className="text-center underline">
                    <a href="" className="text-sm text-blue-600">Create a new group</a>
                </div>
            </div>
        </div>
        </>
    )
}
