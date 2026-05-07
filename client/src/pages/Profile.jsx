// React Tools
import { memo, useState } from "react";

// Components
import UploadPost from "../components/UploadPost";
import ViewPosts from "../components/ViewPosts";
import CreateGroupForm from "../components/CreateGroupForm";
import EditUserInfo from "../components/EditUserInfo";
import FriendList from "../components/FriendList";

// Hooks
import { useAuth } from "../hooks/useAuth"

// Profile page
const Profile = memo(() => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isEdited, setIsEdited] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    return (
        <section className="bg-[#F3F2EF] mt-10 w-full flex items-center flex-col min-h-200">
            { isEdited && <EditUserInfo setIsEdited={setIsEdited} /> }
            { isOpen && <CreateGroupForm setIsOpen={setIsOpen} /> }
            { isOpen2 && <UploadPost setIsOpen2={setIsOpen2} /> }
            <div className="w-260 h-50 bg-[#E5E5E5] rounded-2xl"></div>
            <div className="bg-white w-260 h-50 -translate-y-5 rounded-b-2xl relative shadow">
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
                <button onClick={() => setIsEdited(true)} className="absolute bottom-10 right-10 bg-gray-400 border border-gray-500 w-20 h-10 rounded-full text-white cursor-pointer hover:bg-gray-300 transition duration-200">Edit</button>
                <button onClick={() => setIsOpen(true)} className="absolute bottom-10 right-35 bg-gray-400 border border-gray-500 w-30 h-10 rounded-full text-white cursor-pointer hover:bg-gray-300 transition duration-200">Create Group</button>
            </div>

            <div className="flex justify-center gap-10 w-260 min-h-100">
                <div>
                    <FriendList /> 
                </div>
                <div>
                    <div className="flex justify-center items-center gap-3 bg-white w-135 h-15 rounded-2xl shadow">
                        {
                            user.image ? (
                                <img 
                                    src={user.image.url} 
                                    alt="User avatar"
                                    className="ml-1 h-10 rounded-full " 
                                />
                            ) : (
                                <div className="ml-1 bg-linear-to-r from-blue-400 to-red-400 w-10 h-10 rounded-full flex justify-center items-center">
                                    <p className="text-[12px] font-bold text-white">{user.name[0]}</p>
                                </div>
                            )
                        }
                        <div 
                            className="w-115 h-10 bg-gray-300 hover:bg-gray-400 cursor-pointer rounded-[20px] pl-5 flex items-center"
                            onClick={() => setIsOpen2(true)}
                        >
                            <h1 className="text-gray-800">What's new with you {user.name.split(" ")[0]}?</h1>
                        </div>
                    </div>
                    <ViewPosts mode={"profile"} />
                </div>
            </div>
        </section>
    )
})

export default Profile;