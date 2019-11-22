import React from 'react';
import { Link } from 'react-router-dom';
import sideBar from './sideBar.module.css';

const SideBar = ({ user, login, logout, stops, totalCost }) => {
	return (
		<div className={sideBar.container}>
			<header>
				{user ? (
					<div className={sideBar.profile}>
						<div className={sideBar.profileImageContainer}>
							<img src={user.photoURL} alt="" />
						</div>
						<p className={sideBar.userName}>{user.displayName}</p>
						<Link to="/">
							<button className="removeButton" onClick={logout}>
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
			<nav>
				<ul>
					<li>
						<Link to="/">Dashboard</Link>
					</li>
					<li>
						<Link to="/stops/">Stops</Link>
					</li>
					<ul className={sideBar.stopsList}>
						{stops.map(stop => {
							// const currentStopCost = stopCost(stop.budgets);
							return (
								<li key={stop.key} className={sideBar.stopItem}>
									<Link to={`/${stop.name}/`} className="stopLink">
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
