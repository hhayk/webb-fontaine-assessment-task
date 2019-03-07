import {
    PROJECTS_LOAD_START,
    PROJECTS_LOAD_SUCCESS,
    REPOSITORY_CONTRIBUTORS_LOAD_START,
    REPOSITORY_CONTRIBUTORS_LOAD_SUCCESS,
    REPOSITORY_CONTRIBUTORS_LOAD_FAIL,
    REPOSITORY_COMMITS_LOAD_START,
    REPOSITORY_COMMITS_LOAD_SUCCESS,
    REPOSITORY_COMMITS_LOAD_FAIL
} from '../constants/actionTypes';

const defaultState = {
    repos: [],
    contributors: [],
    commits: [],
    contributors_error: {},
    commits_error: {}
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case PROJECTS_LOAD_START:
            return {
                ...state,
                repos: []
            }
        case PROJECTS_LOAD_SUCCESS:
            return {
                ...state,
                repos: action.payload.repos
            }
        case REPOSITORY_CONTRIBUTORS_LOAD_START:
            return {
                ...state,
                contributors: []
            }
        case REPOSITORY_CONTRIBUTORS_LOAD_SUCCESS:
            return {
                ...state,
                contributors: action.payload.contributors,
                contributors_error: {}
            }
        case REPOSITORY_CONTRIBUTORS_LOAD_FAIL:
            return {
                ...state,
                contributors: [],
                contributors_error: action.payload.error
            }
        case REPOSITORY_COMMITS_LOAD_START:
            return {
                ...state,
                commits: []
            }
        case REPOSITORY_COMMITS_LOAD_SUCCESS:
            return {
                ...state,
                commits: action.payload.commits,
                commits_error: {}
            }
        case REPOSITORY_COMMITS_LOAD_FAIL:
            return {
                ...state,
                commits: [],
                commits_error: action.payload.error
            }
        default:
            return state;
    }
}