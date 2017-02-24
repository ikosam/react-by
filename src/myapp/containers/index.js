import React from 'react'
import { Router, Route, browserHistory,hashHistory,Link} from 'react-router';
import {render} from 'react-dom'
import {createStore,applyMiddleware,compose} from 'redux'
import {Provider} from 'react-redux'
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import App from './app';
import servers from './servert'
import taps from './tap'



const Aremover = (location, cb) => {  //路由按需处理  示列
	require.ensure([], require => {
	    cb(null, require('./datas').default)
	},'Aremover')
};

const Qt = (location, cb) => {  //路由按需处理  示列
	require.ensure([], require => {
	    cb(null, require('./qiantaoluyou').default)
	},'Qt')
};


let enhancer = compose(
        applyMiddleware(thunk, createLogger()),  //处理think
        window.devToolsExtension ? window.devToolsExtension() : f => f
);


const stores = createStore(servers,enhancer);


render(
	<Provider store={stores}>
		<Router history={hashHistory}>
	      <Route path="/" component={App} />
	      <Route path="tapgo" component={taps}>	
	      		<Route path="/qiantao" getComponent={Qt} />
	      </Route>
	      <Route path="myadds" getComponent={Aremover} />
	      
	    </Router>
	</Provider>,
	document.getElementById('root')
	)                                                    



