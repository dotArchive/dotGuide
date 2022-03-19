import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';

const Routes = () => {
	return (
		<div id="routes">
			<Switch>
				<Route path="/" exact component={Home} />
			</Switch>
		</div>
	);
};

export default withRouter(Routes);
