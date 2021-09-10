import API from "../../API"
import { fetchMatchesAction } from "./actions";

const api = new API();

export const fetchMatches = () => {
    return async (dispatch) => {
        return api.getMatches()
            .then((matches) => dispatch(fetchMatchesAction(matches)))
            .catch((error) => alert(error));
    }
}
