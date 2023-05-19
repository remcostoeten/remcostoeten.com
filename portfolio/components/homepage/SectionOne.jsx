import Image from 'next/image';
import styles from './SectionOne.module.css';
import Link from 'next/link';

export default function SectionOne() {
	return (
		<>
			<div className="w-full h-screen bg-white">
				<div className="contain ">
					<div className={styles.ball}></div> {/* Added round ball */}
				</div>
				<div
					className="absolute inset-x-0 bottom-0"
					style={{
						backgroundImage: `url('/sectionoe/mountains.png')`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'contain',
						backgroundPosition: 'center bottom',
						height: '100vh',
					}}
				></div>
			</div>
		</>
	);
}
