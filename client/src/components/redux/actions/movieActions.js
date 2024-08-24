import axios from 'axios';

// Action Types
export const FETCH_MOVIES_REQUEST = 'FETCH_MOVIES_REQUEST';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE';

// Action Creators
export const fetchMoviesRequest = () => {
    return {
        type: FETCH_MOVIES_REQUEST
    };
};

export const fetchMoviesSuccess = (movies) => {
    return {
        type: FETCH_MOVIES_SUCCESS,
        payload: movies
    };
};

export const fetchMoviesFailure = (error) => {
    return {
        type: FETCH_MOVIES_FAILURE,
        payload: error
    };
};

// Thunk to fetch movies
export const fetchMovies = () => {
    return (dispatch) => {
        dispatch(fetchMoviesRequest());
        axios.get('http://localhost:3001/movies')
            .then(response => {
                const movies = response.data;
                dispatch(fetchMoviesSuccess(movies));
            })
            .catch(error => {
                dispatch(fetchMoviesFailure('Failed to fetch movies'));
            });
    };
};
