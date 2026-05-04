// Components
import SearchBar from "../components/SearchBar";
import UploadPost from "../components/UploadPost";
import ViewPosts from "../components/ViewPosts";

// Home page
const Home = () => {
    return (
        <>
            <SearchBar mode={"posts"} />
            <UploadPost />
            <ViewPosts mode={"home"} />
        </>
    )
}

export default Home;