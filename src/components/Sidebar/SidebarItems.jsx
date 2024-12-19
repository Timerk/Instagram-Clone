import CreatePost from "./CreatePost";
import Home from "./Home";
import Notifications from "./Notifications";
import ProfileLink from "./ProfileLink";
import Search from "./Search";

export const SidebarItems = ({toogleNotifications}) => {
	return (
		<>
			<Home />
			<Search />
			<CreatePost />
			<Notifications toogleNotifications={toogleNotifications}/>
			<ProfileLink />
		</>
	);
};

