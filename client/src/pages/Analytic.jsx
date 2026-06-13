import { useEffect } from "react";
import { useAdmin } from "../hooks/useAdmin";
import {
    Users,
    FileText,
    MessageSquare,
    Heart,
    UsersRound,
    UserCheck,
    UserPlus,
    MessageCircle,
} from "lucide-react";

const Analytic = () => {
    const { statystic, getAnalytic } = useAdmin();

    useEffect(() => {
        getAnalytic();
    }, [getAnalytic]);

    const stats = [
        { label: "Users", value: statystic.userCount, icon: Users },
        { label: "Posts", value: statystic.postCount, icon: FileText },
        { label: "Messages", value: statystic.messageCount, icon: MessageSquare },
        { label: "Likes", value: statystic.likeCount, icon: Heart },
        { label: "Groups", value: statystic.groupCount, icon: UsersRound },
        { label: "Friendships", value: statystic.friendshipCount, icon: UserCheck },
        { label: "Friend Requests", value: statystic.friendRequestCount, icon: UserPlus },
        { label: "Comments", value: statystic.commentCount, icon: MessageCircle },
    ];

    return (
        <section className="mx-auto w-full max-w-6xl px-6 py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
                <p className="mt-1 text-sm text-muted">An overview of activity across DevLink.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map(({ label, value, icon: Icon }) => (
                    <div key={label} className="card p-5 transition-shadow hover:shadow-md">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                            <Icon size={18} />
                        </span>
                        <p className="mt-4 text-3xl font-semibold tracking-tight text-ink">
                            {value ?? 0}
                        </p>
                        <p className="mt-1 text-sm text-muted">{label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Analytic;
