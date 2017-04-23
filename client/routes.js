import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import MyId from './containers/MyId';
import SearchedIdentity from './containers/SearchedId';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={MyId} />
			<Route path="/:identity" component={SearchedIdentity} />
	</Route>
);