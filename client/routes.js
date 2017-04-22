import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import MyId from './containers/MyId';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={MyId} />
    {/*<Route path="" component={} />*/}
	</Route>
);