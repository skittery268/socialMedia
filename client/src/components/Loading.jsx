// Loading component
const Loading = () => {
    return (
        <div className="flex h-screen flex-col items-center justify-center gap-6 bg-canvas">
            <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                <span className="text-xl font-semibold tracking-tight text-ink">
                    DevLink
                </span>
            </div>

            <div className="h-8 w-8 animate-spin rounded-full border-[2.5px] border-line-strong border-t-primary" />

            <p className="text-sm font-medium tracking-wide text-muted">
                Loading your workspace…
            </p>
        </div>
    );
};

export default Loading;
