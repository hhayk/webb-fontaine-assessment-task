import axios from 'axios';
import { GITHUB_API } from '../constants/environments';
import {
    PROJECTS_LOAD_START,
    PROJECTS_LOAD_SUCCESS,
    PROJECTS_LOAD_FAIL,
    REPOSITORY_CONTRIBUTORS_LOAD_START,
    REPOSITORY_CONTRIBUTORS_LOAD_SUCCESS,
    REPOSITORY_CONTRIBUTORS_LOAD_FAIL,
    REPOSITORY_COMMITS_LOAD_START,
    REPOSITORY_COMMITS_LOAD_SUCCESS,
    REPOSITORY_COMMITS_LOAD_FAIL
} from '../constants/actionTypes';

export function getRepositoriesByName(name) {
    return dispatch => {
        dispatch({
            type: PROJECTS_LOAD_START
        });

        axios
            .get(GITHUB_API + 'search/repositories?q=' + name)
            .then(response => {
                dispatch({
                    type: PROJECTS_LOAD_SUCCESS,
                    payload: { repos: response.data.items }
                })
            })
            .catch(error => {
                dispatch({
                    type: PROJECTS_LOAD_FAIL,
                    payload: { error: error.response }
                })
            });
    }
}

export function getRepositoryContributors(owner, repo) {
    return dispatch => {
        dispatch({
            type: REPOSITORY_CONTRIBUTORS_LOAD_START
        });

        axios
            .get(GITHUB_API + 'repos/' + owner + '/' + repo + '/contributors')
            .then(response => {
                dispatch({
                    type: REPOSITORY_CONTRIBUTORS_LOAD_SUCCESS,
                    payload: { contributors: response.data }
                })
            })
            .catch(error => {
                dispatch({
                    type: REPOSITORY_CONTRIBUTORS_LOAD_FAIL,
                    payload: { error: error.response }
                })
            });
    }
}

export function getRepositoryCommits(owner, repo, perPage = 30, limit = 100) {
    return dispatch => {
        dispatch({
            type: REPOSITORY_COMMITS_LOAD_START
        });

        let pages = [...Array(Math.ceil(limit / perPage)).keys()].map(i => i + 1);
        axios
            .all(pages.map(page => axios.get(GITHUB_API + 'repos/' + owner + '/' + repo + '/commits?page=' + page)))
            .then(axios.spread((...results) => {
                let commits = results.map(result => result.data).flat().filter(commit => commit.author !== null);
                dispatch({
                    type: REPOSITORY_COMMITS_LOAD_SUCCESS,
                    payload: { commits : commits.slice(0, limit) }
                })
            }))
            .catch(error => {
                dispatch({
                    type: REPOSITORY_COMMITS_LOAD_FAIL,
                    payload: { error: error.response }
                })
            });
    }
}