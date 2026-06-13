// Components
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import ViewPosts from "../components/ViewPosts";
import UploadPost from "../components/UploadPost";
import Avatar from "../components/Avatar";

// Hooks
import { useAuth } from "../hooks/useAuth";

// React Router
import { useNavigate } from "react-router";

// Icons
import { ImagePlus } from "lucide-react";

// Home page
const Home = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <section className="w-full">
            {isOpen && <UploadPost setIsOpen2={setIsOpen} />}

            <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 py-6">
                <SearchBar mode={"posts"} />

                {/* Composer */}
                <div className="card flex items-center gap-3 p-3">
                    <button
                        onClick={() => navigate("/user/profile")}
                        className="shrink-0 cursor-pointer rounded-full transition-opacity hover:opacity-90"
                        aria-label="Go to your profile"
                    >
                        <Avatar src={user.image?.url} name={user.name} size={40} />
                    </button>

                    <button
                        onClick={() => setIsOpen(true)}
                        className="h-10 flex-1 cursor-pointer rounded-full bg-surface-muted px-4 text-left text-sm text-muted transition-colors hover:bg-line"
                    >
                        What&apos;s new with you, {user.name.split(" ")[0]}?
                    </button>

                    <button
                        onClick={() => setIsOpen(true)}
                        className="btn-ghost h-10 gap-1.5 px-3 text-sm"
                    >
                        <ImagePlus size={17} />
                        <span className="hidden sm:inline">Photo</span>
                    </button>
                </div>

                <ViewPosts mode={"home"} />
            </div>
        </section>
    );
};

export default Home;
