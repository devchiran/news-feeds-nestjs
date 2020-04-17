import React, { useState, useEffect } from "react";
import fetch from 'isomorphic-unfetch';
import Comments from "./Comments";

export default function Layout() {
    const [pageNum, setPageNum] = useState(0);
    const [comments, setComments] = useState([]);

    const getInitialComments = async function () {
        const res = await fetch(`https://hn.algolia.com/api/v1/search?page=${pageNum}`)
            .then(res => res.json())
            .then(data => {
                setPageNum(pageNum + 1);
                setComments(data.hits);
            });
    }

    const upvote = (e) => {
        const votedObjId = e.target.value;
        const newState = comments.map(item =>
            item.objectID == votedObjId ? { ...item, points: item.points + 1 } : item
        )
        setComments(newState);

        // Keeping the voted ids in local storage
        const votedObjIds = JSON.parse(localStorage.getItem("votedObjIds")) || [];
        if (votedObjIds.indexOf(votedObjId) < 0) {
            votedObjIds.push(votedObjId);
        }
        localStorage.setItem("votedObjIds", JSON.stringify(votedObjIds));
    }

    const removeComment = (e) => {
        const objectID = e.target.value;
        const newState = comments.filter(item => item.objectID !== objectID);
        setComments(newState);

        // Keeping the removed object ids in local storage
        const removedObjIds = JSON.parse(localStorage.getItem("removedObjIds")) || [];
        if (removedObjIds.indexOf(objectID) < 0) {
            removedObjIds.push(objectID);
        }
        localStorage.setItem("removedObjIds", JSON.stringify(removedObjIds));
    }

    useEffect(() => {
        getInitialComments();
    }, []);

    return (
        <div className="layout">
            <header className="list-header">
                <div className="logo">Y</div>
                <p className="heading">top</p>
                <p className="divider">|</p>
                <p className="subheading">new</p>
            </header>
            <Comments list={comments} upvoteCB={upvote} removeCB={removeComment} />
            <footer className="list-footer">
                <button className="load-more-btn" onClick={getInitialComments}>More</button>
            </footer>
        </div>
    );
}
