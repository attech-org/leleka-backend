// const isAuthorized = (req, res, next) => {
// check if Authorization header exist ? continue : return 401
// check if Authorization header not expired ? continue : refresh token
// ---- refresh token:
// ---- get refreshToken from DB
// ---- post reuqest to Twitter API with "refreshToken" and "twitter_client_id", "twitter_client_secret" from .env
// ---- in response you'll have new authToken and refreshAuthToken
// ---- save new tokens to DB
// ---- continue
// call next if no errors
// }
