const initialState = {
    posts: {
        list: []
    },
    users: {
        results: [],
        count: 0,
        next: null,
        previous: null,
        current_user: {}
    },
    matches: {
        results: [],
        count: 0,
        next: null,
        previous: null,
    },
    chats: {
        results: [],
        count: 0,
        next: null,
        previous: null,
    }
};

export default initialState;
