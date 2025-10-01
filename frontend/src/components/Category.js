import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { API_ENDPOINTS } from '../config';

const Category = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentCategory, setCurrentCategory] = useState('');
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        setCurrentCategory(id);

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axios.post(API_ENDPOINTS.BLOG_CATEGORY, { id }, config);
                setBlogs(res.data || []);
                console.log(`${id} category blogs:`, res.data);
            }
            catch (err) {
                console.error('Error fetching category blogs:', err);
                setBlogs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const capitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    };

    const getCategoryBlogs = () => {
        let list = [];
        let result = [];

        blogs.map(blogPost => {
            return list.push(
                <div key={blogPost.id} className="card mb-4 shadow-sm border-0 h-100" 
                     style={{
                         borderRadius: '15px',
                         background: 'linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%)',
                         transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                     }}
                     onMouseEnter={(e) => {
                         e.currentTarget.style.transform = 'translateY(-5px)';
                         e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
                     }}
                     onMouseLeave={(e) => {
                         e.currentTarget.style.transform = 'translateY(0px)';
                         e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                     }}>
                    
                    <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <span className="badge badge-primary px-3 py-2" 
                                  style={{
                                      borderRadius: '20px',
                                      fontSize: '0.8rem',
                                      fontWeight: '600',
                                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                  }}>
                                {capitalizeFirstLetter(blogPost.category)}
                            </span>
                            <small className="text-muted">
                                <i className="fas fa-calendar-alt mr-1"></i>
                                {blogPost.month} {blogPost.day}
                            </small>
                        </div>
                        
                        <h5 className="card-title font-weight-bold mb-3" 
                            style={{color: '#2c3e50', lineHeight: '1.4'}}>
                            {blogPost.title}
                        </h5>
                        
                        <p className="card-text text-muted mb-4" style={{lineHeight: '1.6'}}>
                            {blogPost.excerpt}
                        </p>
                        
                        <div className="d-flex justify-content-between align-items-center">
                            <Link 
                                to={`/blog/${blogPost.slug}`} 
                                className="btn btn-primary px-4 py-2"
                                style={{
                                    borderRadius: '25px',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    border: 'none',
                                    textDecoration: 'none',
                                    fontSize: '0.9rem',
                                    fontWeight: '600'
                                }}
                            >
                                Read More <i className="fas fa-arrow-right ml-2"></i>
                            </Link>
                            
                            <small className="text-muted">
                                <i className="fas fa-clock mr-1"></i>
                                5 min read
                            </small>
                        </div>
                    </div>
                </div>
            );
        });

        for (let i = 0; i < list.length; i += 2) {
            result.push(
                <div key={i} className='row mb-4'>
                    <div className='col-md-6'>
                        {list[i]}
                    </div>
                    <div className='col-md-6'>
                        {list[i+1] ? list[i+1] : null}
                    </div>
                </div>
            );
        }

        return result;
    };

    return (
        <div className='container mt-4'>
            <div className="text-center mb-5">
                <h1 className='display-4 font-weight-bold mb-3' 
                    style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textTransform: 'capitalize'
                    }}>
                    {currentCategory} Category
                </h1>
                <p className="lead text-muted">
                    Discover amazing articles in the {currentCategory} category
                </p>
            </div>
            
            <div className="nav-scroller py-3 mb-5">
                <nav className="nav d-flex justify-content-center flex-wrap">
                    <Link className="nav-link px-3 py-2 mx-1 mb-2 rounded-pill border" 
                          style={{color: '#667eea', borderColor: '#667eea'}} 
                          to='/category/world'>World</Link>
                    <Link className="nav-link px-3 py-2 mx-1 mb-2 rounded-pill border" 
                          style={{color: '#28a745', borderColor: '#28a745'}} 
                          to='/category/environment'>Environment</Link>
                    <Link className="nav-link px-3 py-2 mx-1 mb-2 rounded-pill border" 
                          style={{color: '#17a2b8', borderColor: '#17a2b8'}} 
                          to='/category/technology'>Technology</Link>
                    <Link className="nav-link px-3 py-2 mx-1 mb-2 rounded-pill border" 
                          style={{color: '#6f42c1', borderColor: '#6f42c1'}} 
                          to='/category/design'>Design</Link>
                    <Link className="nav-link px-3 py-2 mx-1 mb-2 rounded-pill border" 
                          style={{color: '#e83e8c', borderColor: '#e83e8c'}} 
                          to='/category/culture'>Culture</Link>
                    <Link className="nav-link px-3 py-2 mx-1 mb-2 rounded-pill border" 
                          style={{color: '#fd7e14', borderColor: '#fd7e14'}} 
                          to='/category/business'>Business</Link>
                    <Link className="nav-link px-3 py-2 mx-1 mb-2 rounded-pill border" 
                          style={{color: '#dc3545', borderColor: '#dc3545'}} 
                          to='/category/politics'>Politics</Link>
                    {/* <Link className="nav-link px-3 py-2 mx-1 mb-2 rounded-pill border" 
                          style={{color: '#6c757d', borderColor: '#6c757d'}} 
                          to='/category/opinion'>Opinion</Link> */}
                    <Link className="nav-link px-3 py-2 mx-1 mb-2 rounded-pill border" 
                          style={{color: '#20c997', borderColor: '#20c997'}} 
                          to='/category/science'>Science</Link>
                    <Link className="nav-link px-3 py-2 mx-1 mb-2 rounded-pill border" 
                          style={{color: '#ffc107', borderColor: '#ffc107'}} 
                          to='/category/health'>Health</Link>
                    <Link className="nav-link px-3 py-2 mx-1 mb-2 rounded-pill border" 
                          style={{color: '#6f42c1', borderColor: '#6f42c1'}} 
                          to='/category/style'>Style</Link>
                    <Link className="nav-link px-3 py-2 mx-1 mb-2 rounded-pill border" 
                          style={{color: '#17a2b8', borderColor: '#17a2b8'}} 
                          to='/category/travel'>Travel</Link>
                </nav>
            </div>
            
            {loading ? (
                <div className='d-flex justify-content-center align-items-center' style={{minHeight: '40vh'}}>
                    <div className='text-center'>
                        <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
                            <span className="sr-only">Loading...</span>
                        </div>
                        <p className="mt-3 text-muted">Loading {currentCategory} articles...</p>
                    </div>
                </div>
            ) : blogs.length > 0 ? (
                <div className="mb-5">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 className="font-weight-bold text-dark">Articles</h3>
                        <span className="badge badge-primary badge-pill px-3 py-2" 
                              style={{
                                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                  fontSize: '0.9rem'
                              }}>
                            {blogs.length} {blogs.length === 1 ? 'Article' : 'Articles'}
                        </span>
                    </div>
                    {getCategoryBlogs()}
                </div>
            ) : (
                <div className="text-center py-5" style={{minHeight: '40vh'}}>
                    <div className="mb-4" style={{fontSize: '4rem'}}>📚</div>
                    <h4 className="text-muted mb-3">No articles found in {currentCategory}</h4>
                    <p className="text-muted">Check back later for new content in this category!</p>
                    <Link 
                        to="/" 
                        className="btn btn-outline-primary mt-3 px-4 py-2"
                        style={{borderRadius: '25px', fontWeight: '600'}}
                    >
                        Browse All Articles
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Category;
