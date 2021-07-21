export const initialState = {
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null,
    token: localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null,
    playlists: [],
    playing: false,
    item: null
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            localStorage.setItem("user", JSON.stringify(action.user));
            return {
                ...state,
                user: action.user
            };

        case "SET_TOKEN":
            localStorage.setItem("token", JSON.stringify(action.token));
            window.history.pushState({}, null, "/");
            return {
                ...state,
                token: action.token
            };

        case "SET_PLAYLISTS":
            return {
                ...state,
                playlists: action.playlists
            };

        case "SET_DISCOVER_WEEKLY":
            return {
                ...state,
                discover_weekly: action.discover_weekly
            };
        case "RESET_STATE":
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            return {
                user: null,
                token: null,
                playlists: [],
                playing: false,
                item: null
            };
        default:
            return state;
    }
};

export default reducer;
