import UploadPost from "../components/UploadPost";
import ViewPosts from "../components/ViewPosts";

const Home = () => {
    return (
        <>
            <UploadPost />
            <ViewPosts mode={"home"} />
        </>
    )
}

export default Home;