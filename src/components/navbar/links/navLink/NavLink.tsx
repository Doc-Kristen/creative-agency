'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './navLink.module.scss'

interface NavLinkProps {
	title: string
	path: string
}

const NavLink: React.FC<NavLinkProps> = ({ title, path }) => {
	const pathName = usePathname()
	const isActiveLink = path === pathName

	return (
		<Link className={`${styles.container} ${isActiveLink && styles.active}`} href={path}>
			{title}
		</Link>
	)
}

export default NavLink
