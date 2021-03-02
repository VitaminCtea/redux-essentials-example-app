import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { CSSTransition } from 'react-transition-group'

import { Navbar } from './app/Navbar'

import { PostsList } from './features/posts/PostsList'
import { AddPostForm } from './features/posts/AddPostForm'
import { SinglePostPage } from './features/posts/SinglePostPage'
import { EditPostForm } from './features/posts/EditPostForm'
import { UsersList } from './features/users/UsersList'
import { UserPage } from './features/users/UserPage'
import { NotificationsList } from './features/notifications/NotificationsList'

const FeaturesHome = () => {
    return (
        <>
            <AddPostForm />
            <PostsList />
        </>
    )
}

const routes = [
    { path: '/', Component: FeaturesHome },
    { path: '/posts/:postId', Component: SinglePostPage },
    { path: '/editPost/:postId', Component: EditPostForm },
    { path: '/users', Component: UsersList },
    { path: '/users/:userId', Component: UserPage },
    { path: '/notifications', Component: NotificationsList },
]

function App() {
	return (
		<Router>
			<Navbar />
			<div className="App">
                {
                    routes.map(route => (
                        <Route exact key={ route.path } path={ route.path }>
                            {
                                routeProps => (
                                    <CSSTransition in={ routeProps.match !== null } timeout={ 300 } classNames="page" unmountOnExit>
                                        <div className="page">
                                            <route.Component { ...routeProps } />
                                        </div>
                                    </CSSTransition>
                                )
                            }
                        </Route>
                    ))
                }
                {/* <Switch>
                    <Route exact path="/" render={ () => <FeaturesHome /> } />
					<Route exact path="/posts/:postId" component={ SinglePostPage } />
					<Route exact path="/editPost/:postId" component={ EditPostForm } />
					<Route exact path="/users" component={ UsersList } />
					<Route exact path="/users/:userId" component={ UserPage } />
					<Route exact path="/notifications" component={ NotificationsList } />
                    <ModalSwitch />
					<Redirect to="/" />
				</Switch> */}
			</div>
		</Router>
	)
}

export default App
