import { useEffect } from "react";
import { useAdmin } from "../hooks/useAdmin";

const Analytic = () => {
    const { statystic, getAnalytic } = useAdmin();

    useEffect(() => {
        getAnalytic();
    }, [getAnalytic]);

    return (
        <section className="flex justify-center gap-30 flex-col p-8 min-h-screen bg-[#F3F2EF] text-white m-auto max-w-7xl">
            <h1 className="text-4xl font-bold ml-5 mb-10 text-black">
                Analytic
            </h1>

            <div className="flex justify-center items-center flex-wrap gap-6">
                <div className="w-70 h-50 rounded-3xl bg-linear-to-br from-red-500 to-pink-600 p-6 shadow-2xl hover:scale-105 transition duration-300 border border-white/10">
                    <h1 className="text-2xl font-semibold text-white/80">
                        Users
                    </h1>

                    <p className="text-5xl font-bold mt-6">
                        {statystic.userCount}
                    </p>
                </div>

                <div className="w-70 h-50 rounded-3xl bg-linear-to-br from-blue-500 to-cyan-600 p-6 shadow-2xl hover:scale-105 transition duration-300 border border-white/10">
                    <h1 className="text-2xl font-semibold text-white/80">
                        Posts
                    </h1>

                    <p className="text-5xl font-bold mt-6">
                        {statystic.postCount}
                    </p>
                </div>

                <div className="w-70 h-50 rounded-3xl bg-linear-to-br from-green-500 to-emerald-600 p-6 shadow-2xl hover:scale-105 transition duration-300 border border-white/10">
                    <h1 className="text-2xl font-semibold text-white/80">
                        Messages
                    </h1>

                    <p className="text-5xl font-bold mt-6">
                        {statystic.messageCount}
                    </p>
                </div>

                <div className="w-70 h-50 rounded-3xl bg-linear-to-br from-pink-500 to-rose-600 p-6 shadow-2xl hover:scale-105 transition duration-300 border border-white/10">
                    <h1 className="text-2xl font-semibold text-white/80">
                        Likes
                    </h1>

                    <p className="text-5xl font-bold mt-6">
                        {statystic.likeCount}
                    </p>
                </div>

                <div className="w-70 h-50 rounded-3xl bg-linear-to-br from-orange-500 to-amber-600 p-6 shadow-2xl hover:scale-105 transition duration-300 border border-white/10">
                    <h1 className="text-2xl font-semibold text-white/80">
                        Groups
                    </h1>

                    <p className="text-5xl font-bold mt-6">
                        {statystic.groupCount}
                    </p>
                </div>

                <div className="w-70 h-50 rounded-3xl bg-linear-to-br from-violet-500 to-purple-600 p-6 shadow-2xl hover:scale-105 transition duration-300 border border-white/10">
                    <h1 className="text-2xl font-semibold text-white/80">
                        Friendships
                    </h1>

                    <p className="text-5xl font-bold mt-6">
                        {statystic.friendshipCount}
                    </p>
                </div>

                <div className="w-70 h-50 rounded-3xl bg-linear-to-br from-teal-500 to-cyan-600 p-6 shadow-2xl hover:scale-105 transition duration-300 border border-white/10">
                    <h1 className="text-2xl font-semibold text-white/80">
                        Friend Requests
                    </h1>

                    <p className="text-5xl font-bold mt-6">
                        {statystic.friendRequestCount}
                    </p>
                </div>

                <div className="w-70 h-50 rounded-3xl bg-linear-to-br from-fuchsia-500 to-pink-600 p-6 shadow-2xl hover:scale-105 transition duration-300 border border-white/10">
                    <h1 className="text-2xl font-semibold text-white/80">
                        Comments
                    </h1>

                    <p className="text-5xl font-bold mt-6">
                        {statystic.commentCount}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Analytic;