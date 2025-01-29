import {useEffect, useState} from "react";
import {BlogPost} from "../../types";
import PostCard from "../../components/PostCard/PostCard.tsx";

const Blog = () => {
    const url = 'https://jsonplaceholder.typicode.com/posts?_limit=10';
    const [count, setCount] = useState<number>(0);
    const [showPostForm, setShowPostForm] = useState<boolean>(true);
    const [posts, setPosts] = useState<BlogPost[]>([
        // {
        //     id: '1',
        //     title: 'Lorem 1',
        //     author: 'John Doe',
        // },
        // {
        //     id: '2',
        //     title: 'Lorem 2',
        //     author: 'John Doe',
        // },
        // {
        //     id: '3',
        //     title: 'Lorem 3',
        //     author: 'John Doe',
        // }
    ]);

    useEffect(() => {
        const fetchData = async () => {
           const response = await fetch(url);
           if(response.ok) {
               let posts = await response.json() as BlogPost[];
               posts = posts.map(post => {
                   return {id: post.id, author: 'John Doe', title: post.title};
               });
               setPosts(posts);
           }
           console.log(response);
        };

        if(posts.length === 0) {
            void fetchData();
        }
    }, []);

    const toggleShowPostForm = () => {setShowPostForm(prevState => !prevState);}

    const addOnePost = () => {
        setPosts(prevState => [...prevState, {id: String(new Date()), title: 'Test', author: 'Lorem', }]);
    };


    let postForm = null;

    if(showPostForm) {
        postForm = (
            <div className="text-center">
               <h4>Form to add post on  page</h4>
            </div>
        );
    }

    const changeSecondPostCardProps = () => {
        setPosts(prevState => prevState.map((post, index) => {
            if(index === 2) {
                return {
                    ...post,
                    author: 'Jane',
                }
            }
            return post;
        }));
    };

    return (
        <div className="container">
            <div className="Posts">
                {posts.length === 0 ? <p>Not Posts</p> :
                    <>
                        {posts.map(post => (
                            <PostCard title={post.title} author={post.author} key={post.id}/>
                        ))}
                    </>
                }
            </div>
            <hr/>
            <button className="btn btn-primary" onClick={addOnePost}>Addd one new post</button>
            <button onClick={changeSecondPostCardProps}>Change second Post Card</button>
            <hr/>
            <button className="btn btn-primary" onClick={toggleShowPostForm}>Toggle Form</button>
            {postForm}
            <hr/>
            <div className="my-4">
                <p>Count:</p>
                <button onClick={() => setCount(prevState => prevState + 1)}>Add +1 to count</button>
            </div>
        </div>
    );
};

export default Blog;