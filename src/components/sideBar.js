import React from 'react';
import { Link } from 'react-router-dom';
import sideBar from './sideBar.module.css';
import locationIcon from '../assets/maps-and-flags.svg';
import worldWideIcon from '../assets/worldwide.svg';
import Button from './button';

const SideBar = ({ user, logout, stops, totalCost }) => {
	return (
		<div className={sideBar.container}>
			<input type="checkbox" id="hamburger" className={sideBar.hamburger} />
			<span></span>
			<span></span>
			<span></span>
			<div className={sideBar.content}>
				<header>
					<Link to="/">
						<h1>Vacay Tracker!</h1>
					</Link>
					<div className={sideBar.profile}>
						<div className={sideBar.profileImageContainer}>
							<img src={user.photoURL} alt={`Profile pic for ${user.displayName}`} />
						</div>
						<p className={sideBar.userName}>{user.displayName}</p>
						<Button styleType="yellow" listener={logout}>
							Log Out
						</Button>
					</div>
				</header>
				<nav>
					<ul>
						<li>
							<Link to="/" className={sideBar.navLink}>
								<div className={sideBar.icon}>
									<img src={worldWideIcon} alt="" />
								</div>
								Stops
							</Link>
						</li>
						{stops.map(stop => {
							return (
								<li key={stop.key} className={sideBar.stopItem}>
									<Link to={`/${stop.name}/`} className={sideBar.navLink}>
										<div className={sideBar.icon}>
											<img src={locationIcon} alt="" />
										</div>
										{stop.name}
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
				{stops.length !== 0 ? <h2>Total Trip Cost: ${totalCost}</h2> : null}
			</div>
		</div>
	);
};

export default SideBar;
