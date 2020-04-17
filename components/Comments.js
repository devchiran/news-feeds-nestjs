import React from "react";
import TimeAgo from 'react-timeago';

export default function Comments(props) {
    const getDomain = (url) => {
        return url ? url.match(/\..*?(?=\/)/)[0].slice(1) : "Unknown";
    };

    const comments = props.list || [];
    const commentsItems = comments.map((item) => (
        <li className="comment-item" key={item.objectID} data-key={item.objectID}>
            <div className="comment-vote">
                <label className="comment-count">
                    {item.num_comments || '-'}
                </label>
                <div className="vote-panel">
                    <label className="vote-count high">{item.points}</label>
                    <button className="upvote-btn" value={item.objectID} onClick={props.upvoteCB}></button>
                </div>
            </div>
            <div className="comment-details">
                <div className="title">{item.title || item.story_text}</div>
                <div className="details-desc">
                    <p className="domain">(<a className="domain-url" href={item.url}>{getDomain(item.url)}</a>)</p>
                    <p className="author"><span className="author-by">by </span>{item.author}</p>
                    <TimeAgo date={item.created_at} className="timestamp" />
                    <div>
                        <span className="separetor">[</span>
                        <button className="hide-btn" value={item.objectID} onClick={props.removeCB}>hide</button>
                        <span className="separetor">]</span>
                    </div>
                </div>
            </div>
        </li>
    ));

    return (
        <section className="comment-container">
            <ul className="comment-list">
                {commentsItems}
            </ul>
        </section >
    );
}
