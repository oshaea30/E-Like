const initialState = { 
    posts: {
        list: []
    },
    users: {
        list: [],
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
