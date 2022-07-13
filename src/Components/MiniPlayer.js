import { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import classes from '../styles/Miniplayer.module.css';

export default function MiniPlayer({ id, title }) {
	const buttonRef = useRef();
	const [status, setStatus] = useState(false);
	const videoUrl = `https://www.youtube.com/watch?v=${id}`;

	function toggleMiniplayer() {
		if (!status) {
			buttonRef.current.classList.remove(classes.floatingBtn);
			setStatus(true);
		} else {
			buttonRef.current.classList.add(classes.floatingBtn);
			setStatus(false);
		}
	}

	return (
		<div
			className={`${classes.miniPlayer} ${classes.floatingBtn}`}
			ref={buttonRef}
			onClick={toggleMiniplayer}>
			<span className={`material-icons-outlined ${classes.open}`}>
				play_circle_filled
			</span>
			<span
				className={`material-icons-outlined ${classes.close}`}
				onClick={toggleMiniplayer}>
				close
			</span>
			<ReactPlayer
				url={videoUrl}
				width='300px'
				height='168px'
				playing={status}
			/>
			<p> {title} </p>
		</div>
	);
}
