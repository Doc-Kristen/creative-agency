import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/style.scss'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: "Home | Creative agency",
    template: "%s | Creative agency",
  },
  description: "Creative agency description",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<div className='wrapper'>
					<Header />
					<main>
						<div className='container'>{children}</div>
					</main>
					<Footer />
				</div>
			</body>
		</html>
	)
}
