import React, { Component } from 'react';
import { ItemAdapter } from 'react-bootstrap-autosuggest';

export default class RepositoryAdapter extends ItemAdapter {
    itemIncludedByInput() {
        return true // don't perform client filtering; show all server items
    }

    sortItems(items) {
        return items // don't sort items; just use server ordering
    }

    renderItem(item) {
        console.log('render me');
        return <div className="repo">
            <div className="repo-avatar">
                <img src={item.owner.avatar_url} />
            </div>
            <div className="repo-meta">
                <div className="repo-title">{item.full_name}</div>
                <div className="repo-desc">{item.description}</div>
                {/* <div className="repo-stats">
                    <div><Glyphicon glyph="eye-open" /> {item.watchers_count} Watchers</div>
                    <div><Glyphicon glyph="star" /> {item.stargazers_count} Stars</div>
                    <div><Glyphicon glyph="flash" /> {item.forks_count} Forks</div>
                </div> */}
            </div>
        </div>
    }
}