import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const Category = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentCategory, setCurrentCategory] = useState('');

    const {id} = useParams()
    let url = id 

    useEffect(() => {
        // const category = props.match.params.id;
        
        // setCurrentCategory(capitalizeFirstLetter(id));

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const fetchData = async () => {
            try {
                const res = await axios.post(`https://personal-blog.herokuapp.com/api/blog/category`, { id }, config);
                setBlogs(res.data);
            }
            catch (err) {

            }
        };

        fetchData();
    }, [id]);

    // const capitalizeFirstLetter = (word) => {
    //     if (word)
    //         return word.charAt(0).toUpperCase() + word.slice(1);
    //     return '';
    // };

    const getCategoryBlogs = () => {
        let list = [];
        let result = [];

        blogs.map(blogPost => {
            return list.push(
                <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div className="col p-4 d-flex flex-column position-static">
                        <strong className="d-inline-block mb-2 text-primary">{blogPost.category}</strong>
                        <h3 className="mb-0">{blogPost.title}</h3>
                        <div className="mb-1 text-muted">{blogPost.month} {blogPost.day}</div>
                        <p className="card-text mb-auto">{blogPost.excerpt}</p>
                        <Link to={`/blog/${blogPost.slug}`} className="stretched-link">Continue reading</Link>
                    </div>
                    <div className="col-auto d-none d-lg-block">
                        <img width='200' height='250' src={blogPost.thumbnail} alt='thumbnail' />
                    </div>
                </div>
            );
        });

        for (let i = 0; i < list.length; i += 2) {
            result.push(
                <div key={i} className='row mb-2'>
                    <div className='col-md-6'>
                        {list[i]}
                    </div>
                    <div className='col-md-6'>
                        {list[i+1] ? list[i+1] : null}
                    </div>
                </div>
            )
        }

        return result;
    };

    return (
        <div className='container mt-3'>
            <h3 className='display-4'>{currentCategory} Category</h3>
            <div className="nav-scroller py-1 mb-2">
                <nav className="nav d-flex justify-content-between">
                    <Link className="p-2 text-muted" to='/category/world' exact="true">World</Link>
                    <Link className="p-2 text-muted" to='/category/environment' exact="true">Environment</Link>
                    <Link className="p-2 text-muted" to='/category/technology' exact="true">Technology</Link>
                    <Link className="p-2 text-muted" to='/category/design' exact="true">Design</Link>
                    <Link className="p-2 text-muted" to='/category/culture' exact="true">Culture</Link>
                    <Link className="p-2 text-muted" to='/category/business' exact="true">Business</Link>
                    <Link className="p-2 text-muted" to='/category/politics' exact="true">Politics</Link>
                    <Link className="p-2 text-muted" to='/category/opinion' exact="true">Opinion</Link>
                    <Link className="p-2 text-muted" to='/category/science' exact="true">Science</Link>
                    <Link className="p-2 text-muted" to='/category/health' exact="true">Health</Link>
                    <Link className="p-2 text-muted" to='/category/style' exact="true">Style</Link>
                    <Link className="p-2 text-muted" to='/category/travel' exact="true">Travel</Link>
                </nav>
            </div>
            {getCategoryBlogs()}
        </div>
    );
};

export default Category;
