import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'
import Image from 'react-bootstrap/Image'

class ListOfCommiters extends Component {
    state = {
        itemPerPage: 10,
        activePage: 0
    }

    onPaginationClick(activePage) {
        this.setState({ activePage });
    }

    render() {
        if (this.props.contributors.length > 0) {
            return (
                <div>
                    <h2>Project Commiters</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Avatar</th>
                                <th>Login</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.contributors
                                    .filter((_, i) => i >= this.state.itemPerPage * this.state.activePage && i < this.state.itemPerPage * (this.state.activePage + 1))
                                    .map((contributor, i) =>
                                        <tr key={this.state.itemPerPage * this.state.activePage + i}>
                                            <td>{this.state.itemPerPage * this.state.activePage + i}</td>
                                            <td>
                                                <Image src={contributor.avatar_url} roundedCircle width="50" height="50" />
                                            </td>
                                            <td>
                                                <a href={contributor.html_url} target="_blank" rel="noopener noreferrer" >{contributor.login}</a>
                                            </td>
                                        </tr>
                                    )
                            }
                        </tbody>
                    </Table>
                    <Pagination>
                        {
                            this.props.contributors
                                .filter((_, i) => i % this.state.itemPerPage === 0)
                                .map((_, i) =>
                                    <Pagination.Item key={i} active={i === this.state.activePage} onClick={this.onPaginationClick.bind(this, i)}>
                                        {i + 1}
                                    </Pagination.Item>
                                )
                        }
                    </Pagination>
                </div>
            );
        } else return <div></div>
    }
}

const mapStateToProps = (state) => {
    return {
        contributors: state.repositories.contributors
    };
}

export default connect(mapStateToProps, null)(ListOfCommiters);