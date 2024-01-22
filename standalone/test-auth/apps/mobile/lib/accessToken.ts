// A workaround to store the access token instead of storing them in state. Because execution order is unknown, setting it here is safer.
let accessToken: string | undefined = undefined;

export const getAccessToken = () => accessToken;
export const setAccessToken = (token: string | undefined) => accessToken = token;