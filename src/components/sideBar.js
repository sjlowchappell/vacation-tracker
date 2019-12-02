import React from 'react';
import { Link } from 'react-router-dom';
import sideBar from './sideBar.module.css';
import dashboardIcon from '../assets/dashboard.svg';
import locationIcon from '../assets/maps-and-flags.svg';
import worldWideIcon from '../assets/worldwide.svg';

const SideBar = ({ user, login, logout, stops, totalCost }) => {
	return (
		<div className={sideBar.container}>
			<header>
				<h1>Vacay Tracker!</h1>
				{user ? (
					<div className={sideBar.profile}>
						<div className={sideBar.profileImageContainer}>
							<img src={user.photoURL} alt="" />
						</div>
						<p className={sideBar.userName}>{user.displayName}</p>
						<Link to="/" className={sideBar.logoutLink}>
							<button className={sideBar.logout} onClick={logout}>
								Log Out
							</button>
						</Link>
					</div>
				) : (
					<div>
						<p>Please Log In</p>
						<button onClick={login}>Log In</button>
					</div>
				)}
			</header>
			<nav className={sideBar.nav}>
				<ul className={sideBar.nav}>
					<li>
						<Link to="/" className={sideBar.navItem}>
							<div className={sideBar.icon}>
								<img src={dashboardIcon} alt="" />
							</div>
							Dashboard
						</Link>
					</li>
					<li>
						<Link to="/stops/" className={sideBar.navItem}>
							<div className={sideBar.icon}>
								<img src={worldWideIcon} alt="" />
							</div>
							Stops
						</Link>
					</li>
					<ul className={sideBar.stopsList}>
						{stops.map(stop => {
							// const currentStopCost = stopCost(stop.budgets);
							return (
								<li key={stop.key} className={sideBar.stopItem}>
									<Link to={`/${stop.name}/`} className={sideBar.navItem}>
										<div className={sideBar.icon}>
											<img src={locationIcon} alt="" />
										</div>
										{stop.name}
									</Link>
									{/* <p className={sideBar.stopCost}>Spent: ${currentStopCost}</p> */}
								</li>
							);
						})}
					</ul>
				</ul>
			</nav>
			{stops.length !== 0 ? <h2>Total Trip Cost: ${totalCost}</h2> : null}
		</div>
	);
};

export default SideBar;
