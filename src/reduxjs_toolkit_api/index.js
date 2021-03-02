import { createSlice, createAction, combineReducers, createStore } from '@reduxjs/toolkit'

const incrementBy = createAction('incrementBy')
const decrementBy = createAction('decrementBy')

const counterSlice = createSlice({
	name: 'counter',
	initialState: 0,
	reducers: {
		increment: (state) => state + 1,
		decrement: (state) => state - 1,
		multiply: {
			reducer: (state, action) => state * action.payload,
			prepare: (value) => ({ payload: value || 2 }), // fallback if the payload is a falsy value
		},
	},
	// "builder callback API", recommended for TypeScript users
	extraReducers: (builder) => {
		builder.addCase(incrementBy, (state, action) => {
			return state + action.payload
		})
		builder.addCase(decrementBy, (state, action) => {
			return state - action.payload
		})
	},
})

const userSlice = createSlice({
	name: 'user',
	initialState: { name: '', age: 20 },
	reducers: {
		setUserName: (state, action) => {
			state.name = action.payload // mutate the state all you want with immer
		},
	},
	// "map object API"
	/**
	 * & counter.actions.increment为上述的counterSlice中的
	 * # 当dispatch(counter.actions.increment())之后, 这里的[ counter.actions.increment ]: state => {}也会执行。
	 * ? Note: 如果上述的increment方法带有参数payload的话(即: dispatch(counter.actions.increment(3))), 那么这里的es6写法中的方法格式为：[ counter.actions.increment ]: (state, action) => {}
	 */
	extraReducers: {
		[counterSlice.actions.increment]: (state) => {
			state.age += 1
		},
	},
})

const reducer = combineReducers({
	counter: counterSlice.reducer,
	user: userSlice.reducer,
})

const store = createStore(reducer)

store.subscribe(() => console.log(store.getState()))

export default () => {
	store.dispatch(counterSlice.actions.increment()) // -> { counter: 1, user: {name : '', age: 21} }
	store.dispatch(counterSlice.actions.increment()) // -> { counter: 2, user: {name: '', age: 22} }
	store.dispatch(counterSlice.actions.multiply(3)) // -> { counter: 6, user: {name: '', age: 22} }
	store.dispatch(counterSlice.actions.multiply()) // -> { counter: 12, user: {name: '', age: 22} }

	console.log(`${counterSlice.actions.decrement}`) // -> "counter/decrement"

	store.dispatch(userSlice.actions.setUserName('eric')) // -> { counter: 6, user: { name: 'eric', age: 22} }
}
