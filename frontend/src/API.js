import axios from "axios";
const LOGIN_USER_KEY = "E_LIKE_LOGIN_USER_KEY";

var baseURL;
if (
    process.env.REACT_APP_ENVIRONMENT &&
    process.env.REACT_APP_ENVIRONMENT === "PRODUCTION"
) {
    baseURL = process.env.REACT_APP_API_BASE_URL;
} else {
    baseURL = "http://127.0.0.1:8000";
}

const api = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    },
});

api.interceptors.request.use(
    config => {
        if (config.requireToken) {
            const user = localStorage.getItem(LOGIN_USER_KEY) ? JSON.parse(localStorage.getItem(LOGIN_USER_KEY)) : null;
            config.headers.common['Authorization'] = user.token;
        }

        return config;
    },
    err => {
        console.error(err);
    }
)

export default class API { 

    getPosts = async () => {
        const posts = await api
            .get("/posts/")
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw new Error(error);
            });
        return posts;
    };
    addPost = async (name, body, image) => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("body", body);
        formData.append("image", image);
        const savedPost = await api
            .post("/posts/add/", formData)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw new Error(error);
            });
        return savedPost;
    };
    deletePost = async (id) => {
        const response = await api
            .delete("/posts/delete/" + id + "/")
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw new Error(error);
            });
        return response;
    };

    signUp = async (signUpBody) => {
        const formData = new FormData();

        for (const key in signUpBody) {
            formData.append(key, signUpBody[key]);
        }

        return api
            .post("/users/signup/", formData)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw new Error(error);
            });
    };

    signIn = async (signInBody) => {
        const formData = new FormData();
        for (const key in signInBody) {
            formData.append(key, signInBody[key]);
        }
        return api
            .post("/users/signin/", formData)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw new Error(error);
            });
    };
    getUsers = async () => {
        const response = await api
            .get('/users/', {
                requireToken: true
            })
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                throw new Error(err);
            });
        return response;
    }

    // likes
    addLike = async (receive_user_id) => {
        const formData = new FormData();
        formData.append("receive_user_id", receive_user_id);
        const savedLike = await api
            .post("/likes/add/", formData, {
                requireToken: true
            })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw new Error(error);
            });
        return savedLike;
    }

    // matches
    getMatches = async () => {
        const response = await api
            .get('/matches/', {
                requireToken: true
            })
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                throw new Error(err);
            });
        return response;
    }
}
