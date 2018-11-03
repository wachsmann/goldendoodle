export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
    	console.log(user.token);
        return { 'x-access-token': user.token, 'Content-Type': 'application/json' };
    } else {
        return {};
    }
}