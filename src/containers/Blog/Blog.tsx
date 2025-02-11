import './Blog.css';
import {useCallback, useEffect, useState} from "react";
import {ApiPost, ApiUsers, BlogPost} from "../../types";
import PostCard from "../../components/PostCard/PostCard.tsx";
import PostForm from "../../components/PostForm/PostForm.tsx";
import {BASE_URL, POSTS_URL, USERS_URL} from "../../globalConstants.ts";
import axios from 'axios';
import FullPost from "../../components/FullPost/FullPost.tsx";

const Blog = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [showPostForm, setShowPostForm] = useState<boolean>(false);
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

    //Fetch
    // const fetchData = useCallback(async () => {
    //     const postsResponse = await makeRequest<ApiPost  []>(BASE_URL + POSTS_URL);
    //
    //     const promises = postsResponse.map(async (postApi) => {
    //         const userUrl = BASE_URL + USERS_URL + postApi.userId;
    //         const user = await makeRequest<ApiUsers>(userUrl);
    //         return {
    //             id: postApi.id,
    //             title: postApi.title,
    //             author: user.name,
    //         };
    //     });
    //
    //     const newPosts = await Promise.all(promises);
    //     setPosts(newPosts);
    // }, []);

    //Axios
    const fetchData = useCallback(async () => {
        const postsResponse = await axios<ApiPost[]>(BASE_URL + POSTS_URL + '?_limit=3');

        const promises = postsResponse.data.map(async (postApi) => {
            const userUrl = BASE_URL + USERS_URL + postApi.userId;
            const user = await axios<ApiUsers>(userUrl);
            return {
                id: postApi.id,
                title: postApi.title,
                author: user.data.name,
            };
        });

        const newPosts = await Promise.all(promises);
        setPosts(newPosts);
    }, []);



    useEffect(() => {
        fetchData().catch(e => console.error(e));
    }, [fetchData]);


    const changeRandom = () => {
        setPosts(prevState => {
            return prevState.map((post, index) => {
                if (index === 0) {
                    return {
                        ...post,
                        author: 'NEW TITLE'
                    };
                }
                return {...post};
            });
        });
    };

    let postForm = null;

    if (showPostForm) {
        postForm = (
            <PostForm/>
        );
    }


    let postsList = null;

    if (posts.length > 0) {
        postsList = (
            <>
                {posts.map((post) => (
                    <PostCard
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        onClickCard={() => setSelectedPostId(post.id)}
                    />
                ))}
            </>
        );
    }


    return (
        <>
            <div className="Posts">
                {postsList}
            </div>
            <div>
                <FullPost id = {selectedPostId}/>
            </div>
            <hr/>
            <button onClick={() => {setShowPostForm(!showPostForm);}}>New Post</button>
            <button onClick={changeRandom}>Change random</button>
            <hr/>

            {postForm}
        </>
    );
};

export default Blog;