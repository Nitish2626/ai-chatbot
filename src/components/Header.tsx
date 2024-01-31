import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";
import NavigationLink from "./NavigationLink";

const Header = () => {
    const auth=useAuth();
    return (
        <>
            <div className="w-full h-10 flex items-center justify-between sticky top-0 px-5 bg-black">
                <Logo />
                <div className="flex gap-4">
                    {auth?.isLoggedIn ? (
                        <>
                            <NavigationLink
                                to="/chat"
                                text="Go to Chat"
                            />
                            <NavigationLink
                                to="/"
                                text="Logout"
                                click={auth.logout}
                            />
                        </>) : (
                        <>
                            <NavigationLink
                                to="/login"
                                text="Login"
                            />
                            <NavigationLink
                                to="/signup"
                                text="Signup"
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Header;