import Image from 'next/image'
import styles from './page.module.css'
import variables from './styles/variables.module.scss'
export default function Home() {
	return <h1 style={{ color: variables.primaryColor }}>Hello, Next.js!</h1>
}
