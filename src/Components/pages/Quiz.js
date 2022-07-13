import { getDatabase, ref, set } from 'firebase/database';
import _ from 'lodash';
import { useEffect, useReducer, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import useQuestions from '../../hooks/useQuestions';
import Answers from '../Answers';
import MiniPlayer from '../MiniPlayer';
import ProgressBar from '../ProgressBar';

const initialState = null;

const reducer = (state, action) => {
	switch (action.type) {
		case 'questions':
			action.value.forEach((question) => {
				question.options.forEach((option) => {
					option.checked = false;
				});
			});
			return action.value;
		case 'answer':
			const questions = _.cloneDeep(state);
			questions[action.questionID].options[action.optionIndex].checked =
				action.value;
			return questions;
		default:
			return state;
	}
};

export default function Quiz() {
	const { id } = useParams();
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const { loading, error, questions } = useQuestions(id);

	const [qna, dispatch] = useReducer(reducer, initialState);
	const { currentUser } = useAuth();
	const history = useHistory();
	const { location } = history;
	const { state } = location;
	const { videoTitle } = state;

	useEffect(() => {
		dispatch({
			type: 'questions',
			value: questions,
		});
	}, [questions]);

	function handleAnswerChange(e, index) {
		dispatch({
			type: 'answer',
			questionID: currentQuestion,
			optionIndex: index,
			value: e.target.checked,
		});
	}

	function nextQuestions() {
		if (currentQuestion + 1 < questions.length) {
			setCurrentQuestion((prevCurrentQuestion) => prevCurrentQuestion + 1);
		}
	}
	function prevQuestions() {
		if (currentQuestion >= 1 && currentQuestion <= questions.length) {
			setCurrentQuestion((prevCurrentQuestion) => prevCurrentQuestion - 1);
		}
	}

	async function submit() {
		const { uid } = currentUser;
		const db = getDatabase();
		const resultRef = ref(db, `result/${uid}`);
		await set(resultRef, {
			[id]: qna,
		});
		history.push({
			pathname: `/result/${id}`,
			state: {
				qna,
			},
		});
	}

	const percentage =
		questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

	return (
		<>
			{loading && <div>loading...</div>}
			{error && <div>There is a error</div>}
			{!loading && !error && qna && qna.length > 0 && (
				<>
					<h1> {qna[currentQuestion].title} </h1>
					<h4>Question can have multiple answers</h4>
					<Answers
						options={qna[currentQuestion].options}
						handleChange={handleAnswerChange}
						input={true}
					/>
					<ProgressBar
						next={nextQuestions}
						prev={prevQuestions}
						progress={percentage}
						submit={submit}
					/>
					<MiniPlayer id={id} title={videoTitle} />
				</>
			)}
		</>
	);
}
