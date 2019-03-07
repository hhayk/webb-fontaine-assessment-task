import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import './Autosuggest.scss';

export default class Autosuggest extends Component {
    state = {
        searchValue: '',
        open: false
    }
    searchTimeoutId;
    searchField;

    componentWillReceiveProps(nextProps) {
        if (nextProps.repos.length !== this.props.repos.length) {
            this.setState({ open: true });
        }
    }

    onChange(event) {
        let value = event.target.value;

        clearTimeout(this.searchTimeoutId);
        this.searchTimeoutId = setTimeout(() => {
            this.searchTimeoutId = null;
            if (value !== this.state.searchValue) {
                this.setState({ searchValue: value });
                this.props.onSearch(value);
            }
        }, this.props.searchDebounce);
    }

    onRepoSelect(repo) {
        this.setState({
            open: false
        });
        this.searchField.value = "";
        this.props.onRepoSelect(repo);
    }

    render() {
        return (
            <div>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Project Name"
                        aria-label="Project Name"
                        aria-describedby="basic-addon2"
                        ref={(ref) => this.searchField = ref}
                        value={this.state.textValue}
                        onChange={this.onChange.bind(this)}
                    />
                    <div className="container-repo dropdown-menu" style={{ display: this.state.open ? 'block' : 'none' }}>
                        {
                            this.props.repos
                                .map((repo, i) =>
                                    <div key={i} className="container-repo-row">
                                        <div className="repo" onClick={this.onRepoSelect.bind(this, repo)}>
                                            <div className="repo-avatar">
                                                <img alt="" src={repo.owner.avatar_url} />
                                            </div>
                                            <div className="repo-meta">
                                                <div className="repo-title">{repo.full_name}</div>
                                                <div className="repo-desc">{repo.description}</div>
                                                <div className="repo-stats">
                                                    <div><span className="glyphicon glyphicon-eye-open"></span> {repo.watchers_count} Watchers</div>
                                                    <div><span className="glyphicon glyphicon-star"></span> {repo.stargazers_count} Stars</div>
                                                    <div><span className="glyphicon glyphicon-flash"></span>{repo.forks_count} Forks</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                        }
                    </div>
                </InputGroup>
            </div>
        );
    }
}