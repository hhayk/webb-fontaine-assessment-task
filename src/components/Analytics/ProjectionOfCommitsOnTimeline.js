import React, { Component } from 'react';
import { connect } from 'react-redux';
import Timeline from 'react-time-line';

class ProjectionOfCommitsOnTimeline extends Component {
    render() {
        if (this.props.commits.length > 0) {
            return (
                <div>
                    <hr />
                    <h2>Daily Commits</h2>
                    <Timeline items={
                        this.props.commits.map(commit => {
                            return { ts: commit.commit.author.date, text: commit.commit.author.name + ' : ' + commit.commit.message }
                        })
                    } />
                </div>
            );
        } else return <div></div>
    }
}

const mapStateToProps = (state) => {
    return {
        commits: state.repositories.commits
    };
}

export default connect(mapStateToProps, null)(ProjectionOfCommitsOnTimeline);