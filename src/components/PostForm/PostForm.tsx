import  {useEffect} from 'react';

const PostForm = () => {

    useEffect(() => {
        console.log('[PostForm] in useEffect');
        return () => {
            console.log('[PostForm] before unmount');
        }
    }, []);

    return (
        <div>
            <p>Post form will be here</p>
        </div>
    );
};

export default PostForm;