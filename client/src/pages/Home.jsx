// Components
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import ViewPosts from "../components/ViewPosts";
import { useAuth } from "../hooks/useAuth";
import UploadPost from "../components/UploadPost";
import { useNavigate } from "react-router";

// Home page
const Home = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <section className="flex justify-center w-full bg-[#F3F2EF] items-center flex-col pb-15">
            { isOpen && <UploadPost setIsOpen2={setIsOpen} /> }
            <SearchBar mode={"posts"} />
            <div className="flex justify-center items-center gap-3 bg-white w-190 h-15 rounded-2xl shadow">
                {
                    user.image ? (
                        <div className="rounded-full ml-1 hover:bg-black">
                            <img 
                                src={user.image.url} 
                                alt="User avatar"
                                className="h-10 rounded-full hover:opacity-90 cursor-pointer"
                                onClick={() => navigate("/profile")}
                            />
                        </div>
                    ) : (
                        <div className="ml-1 bg-linear-to-r from-blue-400 to-red-400 w-10 h-10 rounded-full flex justify-center items-center">
                            <p className="text-[12px] font-bold text-white">{user.name[0]}</p>
                        </div>
                    )
                }
                <div 
                    className="w-170 h-10 bg-gray-200 hover:bg-gray-300 transition duration-200 cursor-pointer rounded-[20px] pl-5 flex items-center"
                    onClick={() => setIsOpen(true)}
                >
                    <h1 className="text-gray-800">What's new with you {user.name.split(" ")[0]}?</h1>
                </div>
            </div>
            <ViewPosts mode={"home"} />
        </section>
    )
}

export default Home;