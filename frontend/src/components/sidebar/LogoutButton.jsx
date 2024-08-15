import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
	const { loading, logout } = useLogout();

	return (
		<div className='mt-auto flex '>
			{!loading ? (
				<BiLogOut className='w-9 h-9  text-white cursor-pointer' onClick={logout} />
			) : (
				<span className='loading loading-spinner'></span>
			)}
			<h1 className="text-2xl text-blue-400 ml-2 mb-7">Logout</h1>
		</div>
	);
};
export default LogoutButton;
