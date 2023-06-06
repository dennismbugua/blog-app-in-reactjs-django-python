import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function BlogDetails() {
    
    

    const [blog, setBlog] = useState({});

    const {slug} = useParams()

    let url = slug 

    useEffect(() => {
        // const slug = props.match.params.id;

        const fetchData = async () => {
            try {
                const res = await axios.get(`https://personal-blog.herokuapp.com/api/blog/${slug}`);
                setBlog(res.data);
            }
            catch (err) {

            }
        };

        fetchData();
    }, [slug]);

    const createBlog = () => {
        return {__html: blog.content}
    };

    const capitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    };

    return (
        <div className='container mt-3'>
            <h1 className='display-2'>{blog.title}</h1>
            <h2 className='text-muted mt-3'>Category: {capitalizeFirstLetter(blog.category)}</h2>
            <h4>{blog.month} {blog.day}</h4>
            <div className='mt-5 mb-5' dangerouslySetInnerHTML={createBlog()} />
            <hr />
            <p className='lead mb-5'><Link to='/blog' className='font-weight-bold'>Back to Blogs</Link></p>
        </div>
    );
};