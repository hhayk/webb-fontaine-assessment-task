import React, { Component } from 'react';
import Autosuggest from './autosuggest/Autosuggest';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { getRepositoriesByName } from '../../actions/githubActions';
import { getRepositoryContributors } from '../../actions/githubActions';
import { getRepositoryCommits } from '../../actions/githubActions';

class SearchForProject extends Component {
    constructor(props, context) {
        super(props, context);

        let pathname = this.props.history.location.pathname;
        if (pathname.length > 1) {
            let args = pathname.split('/');
            args.shift();
            let [owner, repo] = args;

            this.searchByOwnerInRepo(owner, repo);
        }
    }

    onSearch(search) {
        this.props.repositoriesByName(search);
    }

    onRepoSelect(repository) {
        let owner = repository.owner.login;
        let repo = repository.name;

        this.props.history.push('/' + owner + '/' + repo);
        this.searchByOwnerInRepo(owner, repo);
    }

    searchByOwnerInRepo(owner, repo) {
        this.props.repositoryContributors(owner, repo);
        this.props.repositoryCommits(owner, repo);
    }

    render() {
        return (
            <div>
                <Autosuggest
                    repos={this.props.repos}
                    searchDebounce="250"
                    onSearch={this.onSearch.bind(this)}
                    onRepoSelect={this.onRepoSelect.bind(this)}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        repos: state.repositories.repos
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        repositoriesByName: (name) => dispatch(getRepositoriesByName(name)),
        repositoryContributors: (owner, repo) => dispatch(getRepositoryContributors(owner, repo)),
        repositoryCommits: (owner, repo) => dispatch(getRepositoryCommits(owner, repo)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchForProject));