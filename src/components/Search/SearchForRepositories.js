import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
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

    onChange(event) {
        let fieldVal = event.target.value;

        let owner = 'chef-cookbooks';
        let repo = 'docker';

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
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Project Name"
                        aria-label="Project Name"
                        aria-describedby="basic-addon2"
                        onChange={this.onChange.bind(this)}
                    />
                </InputGroup>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        repositoriesByName: (name) => dispatch(getRepositoriesByName(name)),
        repositoryContributors: (owner, repo) => dispatch(getRepositoryContributors(owner, repo)),
        repositoryCommits: (owner, repo) => dispatch(getRepositoryCommits(owner, repo)),
    }
}

export default withRouter(connect(null, mapDispatchToProps)(SearchForProject));