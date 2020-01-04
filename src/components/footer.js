import React from 'react';
import styles from './footer.module.css';

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div>
				<p>
					© {new Date().getFullYear()} designed and built by{' '}
					<a href="https://samlow-chappell.com" className={styles.portfolioLink}>
						Sam Low-Chappell
					</a>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
