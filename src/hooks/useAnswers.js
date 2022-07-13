import { get, getDatabase, orderByKey, query, ref } from 'firebase/database';
import { useEffect, useState } from 'react';

export default function useAnswers(videoID) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [answers, setAnswers] = useState([]);

	useEffect(() => {
		async function fatchAnswers() {
			//database
			const db = getDatabase();
			const answerRef = ref(db, 'answers/' + videoID + '/questions');
			const answerQuery = query(answerRef, orderByKey());

			try {
				setError(false);
				setLoading(true);
				//req firebase data
				const snapshot = await get(answerQuery);
				setLoading(false);

				if (snapshot.exists()) {
					setAnswers((prevAnswers) => {
						return [...prevAnswers, ...Object.values(snapshot.val())];
					});
				}
			} catch (error) {
				console.log('error', error);
				setLoading(false);
				setError(true);
			}
		}

		fatchAnswers();
	}, [videoID]);

	return {
		loading,
		error,
		answers,
	};
}
