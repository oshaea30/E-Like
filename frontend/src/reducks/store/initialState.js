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
        list: []
    },
    chats: {
        results: [],
        count: 0,
        next: null,
        previous: null,
    }
};

export default initialState;
