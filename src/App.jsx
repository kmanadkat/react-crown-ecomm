import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './routes/home/home.component'
import Login from './routes/login/login.component'
import Navigation from './routes/navigation/navigation.component'

const Shop = () => {
	return (
		<div>
			<h1>Shop Page</h1>
		</div>
	)
}

function App() {
	return (
		<Routes>
			<Route path='/' element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path='shop' element={<Shop />} />
				<Route path='login' element={<Login />} />
			</Route>
		</Routes>
	)
}

export default App
