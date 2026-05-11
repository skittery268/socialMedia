// Loading component
const Loading = () => {
    return (
        <div className="flex h-screen flex-col items-center justify-center gap-5 bg-[#F3F2EF]">
            <p className="text-lg font-medium text-gray-600 tracking-wide">
                Loading...
            </p>

            <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-gray-200 border-t-black"></div>
        </div>
    )
}

export default Loading;