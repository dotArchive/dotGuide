import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';

/****COMPONENTS****/
import Home from './components/Home';
import addPost from './components/Post/UpdatePost/AddPost';
import AllPosts from './components/Post/AllPosts';

const Routes = () => {
	return (
		<div id="routes">
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/addpost" component={addPost} />
				<Route path="/posts" component={AllPosts} />
			</Switch>
		</div>
	);
};

export default withRouter(Routes);
