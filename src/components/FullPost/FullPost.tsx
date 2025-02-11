import {useCallback, useEffect, useState} from "react";
import {ApiPost} from "../../types";
import axios from "axios";
import {BASE_URL, POSTS_URL} from "../../globalConstants.ts";

interface Props {
    id: number | null;
}
const FullPost: React.FC<Props> = ({id}) => {
    const [post, setPost] = useState<ApiPost | null>(null);
    const fetchPost = useCallback(async () => {
        if(id !== null) {
            const postPesponse = await axios<ApiPost>(BASE_URL + POSTS_URL + id);
            setPost(postPesponse.data);
        }
    }, [id]);
    useEffect(() => {
        fetchPost().catch(e => console.log(e));
    }, [fetchPost]);

    return post && (
        <div className="FullPost">
            <h1>{post.title} - ID = {post.id}</h1>
            <p>{post.body}</p>
            <div className="Edit">
                <button className="Delete" onClick={() => setPost(null)}>Delete</button>
            </div>
        </div>
    );
};

export default FullPost;