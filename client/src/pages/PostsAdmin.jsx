import ViewPosts from "../components/ViewPosts";

const PostsAdmin = () => {
    return (
        <section className="bg-[#F3F2EF] w-full flex justify-center items-center pb-10 mt-10 flex-col">
            <div className="flex justify-center flex-col">
                <p className="text-[25px] font-bold">Posts</p>
                <ViewPosts mode="home" />
            </div>
        </section>
    )
}

export default PostsAdmin;