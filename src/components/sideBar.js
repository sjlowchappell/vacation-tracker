import React from 'react';
import { Link } from 'react-router-dom';
import styles from './sideBar.module.css';
import locationIcon from '../assets/maps-and-flags.svg';
import worldWideIcon from '../assets/worldwide.svg';
import Button from './button';

const SideBar = ({ user, logout, stops, totalCost }) => {
	return (
		<section>
			<input type="checkbox" id="hamburger" className={styles.hamburgerInput} />
			<span className={styles.hamburgerLine}></span>
			<span className={styles.hamburgerLine}></span>
			<span className={styles.hamburgerLine}></span>
			<div className={styles.content}>
				<header>
					<Link to="/">
						<h1 className={styles.heading}>Pack-Track!</h1>
					</Link>
					<div className={styles.profile}>
						<div className={styles.profileImageContainer}>
							<img
								className={styles.profileImage}
								src={user.photoURL}
								alt={`Profile pic for ${user.displayName}`}
							/>
						</div>
						<p className={styles.userName}>{user.displayName}</p>
						<Button styleType="yellow" listener={logout}>
							Log Out
						</Button>
					</div>
				</header>
				<nav>
					<ul>
						<li>
							<Link to="/" className={styles.navLink}>
								<div className={styles.icon}>
									<img src={worldWideIcon} alt="" />
								</div>
								Stops
							</Link>
						</li>
						{stops.map(stop => {
							return (
								<li key={stop.key} className={styles.stopItem}>
									<Link to={`/${stop.name}/`} className={styles.navLink}>
										<div className={styles.icon}>
											<img src={locationIcon} alt="" />
										</div>
										{stop.name}
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
				{stops.length !== 0 ? <h2 className={styles.tripCost}>Total Trip Cost: ${totalCost}</h2> : null}
			</div>
		</section>
	);
};

export default SideBar;
