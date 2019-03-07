import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from 'react-apexcharts'

class ImpactOnProject extends Component {
    groupBy(list, props) {
        return list.reduce((a, b) => {
            (a[b[props]] = a[b[props]] || []).push(b);
            return a;
        }, {});
    }

    render() {
        if (this.props.commits.length > 0) {
            let committers = this.props.commits.map(commit => commit.committer);
            let groupByLogin = this.groupBy(committers, 'login');
            let options = {
                labels: Object.keys(groupByLogin),
            };
            let series = Object.values(groupByLogin).map(obj => obj.length);

            return (
                <div>
                    <hr />
                    <h2>Per Commiter Impact</h2>
                    <div className="donut">
                        <Chart options={options} series={series} type="donut" width="500" />
                    </div>
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

export default connect(mapStateToProps, null)(ImpactOnProject);