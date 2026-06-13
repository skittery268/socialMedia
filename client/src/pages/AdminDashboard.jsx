// React router component
import { Outlet } from "react-router";

// React tools
import { useEffect, useState } from "react";

// Components
import AdminNav from "../components/AdminNav";
import Loading from "../components/Loading";

// Hooks
import { useAdmin } from "../hooks/useAdmin";
import { usePost } from "../hooks/usePost";
import { useComment } from "../hooks/useComment";

// Admin Dashboard
const Admin = () => {
    const [loading, setLoading] = useState(true);
    const { getUsersAdmin, getAnalytic } = useAdmin();
    const { getPosts } = usePost();
    const { getComments } = useComment();

    useEffect(() => {
        getUsersAdmin();
        getAnalytic();
        getPosts();
        getComments();

        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearInterval(timer);
    }, [getAnalytic, getUsersAdmin, getPosts, getComments]);

    if (loading) {
        return <Loading />
    }

    return (
        <section className="min-h-screen bg-canvas">
            <AdminNav />

            <div className="lg:pl-60">
                <Outlet />
            </div>
        </section>
    )
}

export default Admin;