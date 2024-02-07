'use client'

import React from 'react'
import Links from './links/Links'
import styles from './navbar.module.scss'

const Navbar = () => {
	const [isActive, setIsActive] = React.useState(false)

	const toggleActive = () => {
		setIsActive(!isActive)
	}

	return (
		<>
			<button className={`${styles.burger} ${isActive ? styles.open : ''}`} onClick={toggleActive}>
				<span></span>
			</button>
			<div className={`${styles.wrapper} ${isActive ? styles.active : ''}`} onClick={toggleActive}>
				<div className={styles.content}>
					<Links />
				</div>
			</div>
		</>
	)
}

export default Navbar
