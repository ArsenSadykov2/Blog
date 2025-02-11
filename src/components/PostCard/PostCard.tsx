import React from "react";

interface Props {
    title: string;
    author: string;
    onClickCard?: React.MouseEventHandler;
}

const PostCard: React.FC<Props> = React.memo(({title, author, onClickCard}) => {


    return (
        <article className="PostCard" onClick={onClickCard}>
            <h1>{title}</h1>
            <div className="PostCard">
                <div><p className="Author">{author}</p></div>
            </div>
        </article>
    );
}, (prevProps, nextProps) => {
    return prevProps.title === nextProps.title && prevProps.author === nextProps.author;
});

export default PostCard;