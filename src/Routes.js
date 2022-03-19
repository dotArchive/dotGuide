import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';

/****COMPONENTS****/
import Home from './components/Home';
import singlePost from './components/Post/SinglePost';

const Routes = () => {
	return (
		<div id="routes">
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/post" component={singlePost} />
			</Switch>
		</div>
	);
};

export default withRouter(Routes);
