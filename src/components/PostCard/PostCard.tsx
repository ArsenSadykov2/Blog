import React, {useEffect} from "react";

interface Props {
    title: string;
    author: string;
}

const PostCard: React.FC<Props> = React.memo(({title, author}) => {

    useEffect(() => {
        console.log('PostCard');
    }, [])

    console.log(title);

    return (
        <div className="PostCard">
            <div><h4>{title}</h4></div>
            <div><p className="Author">{author}</p></div>
        </div>
    );
}, (prevProps, nextProps) => {
    return prevProps.title === nextProps.title && prevProps.author === nextProps.author;
});

export default PostCard;