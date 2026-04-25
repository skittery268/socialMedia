import UploadPost from "../components/UploadPost";
import ViewPosts from "../components/ViewPosts";
import { useAuth } from "../hooks/useAuth"

const Profile = () => {
    const { user } = useAuth();

    return (
        <>
            <p>{user?.name}</p>
            <p>{user?.email}</p>

            <UploadPost />
            <ViewPosts mode={"profile"} />
        </>
    )
}

export default Profile;