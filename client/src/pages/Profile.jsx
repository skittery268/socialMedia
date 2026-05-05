// React Tools
import { useState } from "react";

// Components
import UploadPost from "../components/UploadPost";
import ViewPosts from "../components/ViewPosts";
import CreateGroupForm from "../components/CreateGroupForm";
import EditUserInfo from "../components/EditUserInfo";

// Hooks
import { useAuth } from "../hooks/useAuth"

// Profile page
const Profile = () => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isEdited, setIsEdited] = useState(false);

    return (
        <section className="mt-10 w-340 flex items-center flex-col h-screen">
            { isEdited && <EditUserInfo setIsEdited={setIsEdited} /> }
            <div className="w-300 h-50 bg-[#E5E5E5] rounded-2xl"></div>
            <div className="bg-white w-300 h-50 -translate-y-5 rounded-b-2xl relative">
                <div className="absolute left-10 flex justify-center items-center bg-center bg-cover rounded-full w-40 h-40 -top-20">
                    {
                        user.image ? (
                            <div className="w-full h-full rounded-full bg-center bg-cover flex justify-center items-center">
                                <img src={user.image.url} className="w-full h-full rounded-full bg-center bg-cover flex justify-center items-center" alt="user avatar" />
                            </div>
                        ) : (
                            <>
                                <div className="bg-linear-to-r from-blue-400 to-red-400 w-full h-full rounded-full flex justify-center items-center">
                                    <p className="text-[50px] text-white">{user.name[0]}</p>
                                </div>
                            </>
                        )
                    }
                </div>
                <div className="absolute left-60 flex justify-center flex-col">
                    <p className="text-[35px]">{user?.name}</p>
                    <p className="text-gray-500">{user?.email}</p>
                </div>
                <button onClick={() => setIsEdited(true)}>Edit</button>
            </div>

            { !isOpen && <button onClick={() => setIsOpen(true)}>Create Group</button> }

            <CreateGroupForm isOpen={isOpen} setIsOpen={setIsOpen} />

            <UploadPost />
            <ViewPosts mode={"profile"} />
        </section>
    )
}

export default Profile;