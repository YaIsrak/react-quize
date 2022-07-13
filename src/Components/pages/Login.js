import Illustration from '../Illustration';
import LoginForm from '../loginForm';

export default function Login() {
	return (
		<>
			<h1>Login to your account</h1>
			<div className='column'>
				<Illustration />
				<LoginForm />
			</div>
		</>
	);
}
