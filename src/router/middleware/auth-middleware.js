import { useAuthStore } from '@/stores/auth.js'

export default (to, from, next) => {
	const auth = useAuthStore()

	let exceptionalRoutes = ['Home', 'Login', 'Register', 'ForgotPassword', 'ResetPassword']
	let isGoingExceptionalRoutes = exceptionalRoutes.includes(to.name)

	/**
	 * IF THE USER IS NOT LOGGED IN
	 */
	if (!auth.isLoggedIn) {
		if (isGoingExceptionalRoutes) {
			next() // The user is not logged in but it's going to exceptional routes ? fine
			return
		} else {
			next({ name: 'Login' })
			return
		} // other routes than exceptional paths => /login
	}

	/**
	 * IF THE USER IS LOGGED IN
	 */
	if (auth.isLoggedIn && isGoingExceptionalRoutes) {
		next({ name: 'Dashboard', query: { 'redirect-reason': 'already logged' } })
	} else {
		next()
	}
}