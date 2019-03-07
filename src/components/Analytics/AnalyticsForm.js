import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListOfCommiters from './ListOfCommiters';
import ImpactOnProject from './ImpactOnProject';
import ProjectionOfCommitsOnTimeline from './ProjectionOfCommitsOnTimeline';

class AnalyticsForm extends Component {
    render() {
        if (this.props.contributors_error.data) {
            return (
                <div>
                    <h3>Somethign Went Wrong</h3>
                    <h5>{this.props.contributors_error.data.message}</h5>
                </div>
            )
        } else if (this.props.commits_error.data) {
            return (
                <div>
                    <h3>Somethign Went Wrong</h3>
                    <h5>{this.props.commits_error.data.message}</h5>
                </div>
            )
        } else {
            return (
                <div>
                    <ListOfCommiters />
                    <ImpactOnProject />
                    <ProjectionOfCommitsOnTimeline />
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        contributors_error: state.repositories.contributors_error,
        commits_error: state.repositories.commits_error
    };
}

export default connect(mapStateToProps, null)(AnalyticsForm);