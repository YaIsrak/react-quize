import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../Components/pages/Login';
import { AuthProvider } from '../contexts/AuthContext';
import '../styles/App.css';
import Layout from './Layout';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import SignUp from './pages/Signup';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

function App() {
	return (
		<Router>
			<AuthProvider>
				<Layout>
					<Switch>
						<Route exact path='/' component={Home} />
						<PublicRoute exact path='/signup' component={SignUp} />
						<PublicRoute exact path='/login' component={Login} />
						<PrivateRoute exact path='/quiz/:id' component={Quiz} />
						<PrivateRoute exact path='/result/:id' component={Result} />
					</Switch>
				</Layout>
			</AuthProvider>
		</Router>
	);
}

export default App;
