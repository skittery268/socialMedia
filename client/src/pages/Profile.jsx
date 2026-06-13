// React Tools
import { memo, useState } from "react";

// Components
import UploadPost from "../components/UploadPost";
import ViewPosts from "../components/ViewPosts";
import CreateGroupForm from "../components/CreateGroupForm";
import EditUserInfo from "../components/EditUserInfo";
import FriendList from "../components/FriendList";
import Avatar from "../components/Avatar";

// Hooks
import { useAuth } from "../hooks/useAuth";

// Icons
import { Pencil, UsersRound, ImagePlus } from "lucide-react";

// Profile page
const Profile = memo(() => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isEdited, setIsEdited] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    return (
        <section className="w-full">
            {isEdited && <EditUserInfo setIsEdited={setIsEdited} />}
            {isOpen && <CreateGroupForm setIsOpen={setIsOpen} />}
            {isOpen2 && <UploadPost setIsOpen2={setIsOpen2} />}

            <div className="mx-auto w-full max-w-5xl px-4 py-6">
                {/* Profile header */}
                <div className="card overflow-hidden">
                    <div className="h-36 bg-linear-to-br from-primary-soft via-surface-muted to-primary-soft sm:h-44" />
                    <div className="px-6 pb-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <div className="flex items-end gap-4">
                                <div className="-mt-14 shrink-0 rounded-full ring-4 ring-surface">
                                    <Avatar src={user.image?.url} name={user.name} size={112} />
                                </div>
                                <div className="pb-1">
                                    <h1 className="text-xl font-semibold tracking-tight">{user?.name}</h1>
                                    <p className="text-sm text-muted">{user?.email}</p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => setIsOpen(true)}
                                    className="btn-ghost h-9 gap-1.5 px-3 text-sm"
                                >
                                    <UsersRound size={16} />
                                    Create group
                                </button>
                                <button
                                    onClick={() => setIsEdited(true)}
                                    className="btn-primary h-9 gap-1.5 px-4 text-sm"
                                >
                                    <Pencil size={15} />
                                    Edit profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
                    <aside className="lg:sticky lg:top-20 lg:self-start">
                        <FriendList />
                    </aside>

                    <div className="flex flex-col gap-4">
                        {/* Composer */}
                        <div className="card flex items-center gap-3 p-3">
                            <Avatar src={user.image?.url} name={user.name} size={40} />
                            <button
                                onClick={() => setIsOpen2(true)}
                                className="h-10 flex-1 cursor-pointer rounded-full bg-surface-muted px-4 text-left text-sm text-muted transition-colors hover:bg-line"
                            >
                                What&apos;s new with you, {user.name.split(" ")[0]}?
                            </button>
                            <button
                                onClick={() => setIsOpen2(true)}
                                className="btn-ghost h-10 gap-1.5 px-3 text-sm"
                            >
                                <ImagePlus size={17} />
                                <span className="hidden sm:inline">Photo</span>
                            </button>
                        </div>

                        <ViewPosts mode={"profile"} />
                    </div>
                </div>
            </div>
        </section>
    );
});

export default Profile;
