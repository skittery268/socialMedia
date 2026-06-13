import ViewPosts from "../components/ViewPosts";

const PostsAdmin = () => {
    return (
        <section className="mx-auto w-full max-w-2xl px-4 py-8">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold tracking-tight">Posts</h1>
                <p className="mt-1 text-sm text-muted">Moderate posts across the platform.</p>
            </div>
            <ViewPosts mode="home" />
        </section>
    );
};

export default PostsAdmin;
