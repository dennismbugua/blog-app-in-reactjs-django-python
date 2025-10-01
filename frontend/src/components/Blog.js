import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../config';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [featuredBlog, setFeaturedBlog] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [featuredRes, blogsRes] = await Promise.all([
                    axios.get(API_ENDPOINTS.BLOG_FEATURED),
                    axios.get(API_ENDPOINTS.BLOG_LIST)
                ]);
                
                setFeaturedBlog(featuredRes.data[0] || {});
                setBlogs(blogsRes.data || []);
                console.log('Featured blog:', featuredRes.data);
                console.log('All blogs:', blogsRes.data);
            }
            catch (err) {
                console.error('Error fetching blog data:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const capitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    };

    const getBlogs = () => {
        let list = [];
        let result = [];
        
        blogs.map(blogPost => {
            const categoryColors = {
                technology: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                business: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                science: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                health: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                culture: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                world: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                default: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)'
            };
            
            const categoryGradient = categoryColors[blogPost.category?.toLowerCase()] || categoryColors.default;
            
            return list.push(
                <div className="card mb-4 border-0 h-100 position-relative overflow-hidden" 
                     style={{
                         background: 'linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%)',
                         boxShadow: '0 10px 30px rgba(0,0,0,0.1), 0 1px 8px rgba(0,0,0,0.06)',
                         borderRadius: '20px',
                         transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                         transform: 'translateY(0px)'
                     }}
                     onMouseEnter={(e) => {
                         e.currentTarget.style.transform = 'translateY(-8px)';
                         e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15), 0 8px 16px rgba(0,0,0,0.1)';
                     }}
                     onMouseLeave={(e) => {
                         e.currentTarget.style.transform = 'translateY(0px)';
                         e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1), 0 1px 8px rgba(0,0,0,0.06)';
                     }}>
                    {/* Decorative gradient bar */}
                    <div className="position-absolute w-100" style={{
                        height: '4px',
                        background: categoryGradient,
                        top: 0,
                        left: 0,
                        borderRadius: '20px 20px 0 0'
                    }}></div>
                    
                    <div className="card-body p-4" style={{paddingTop: '2rem'}}>
                        <div className="d-flex align-items-center mb-3">
                            <span className="badge px-3 py-2 mr-2" style={{
                                background: categoryGradient,
                                color: 'white',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                borderRadius: '20px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                {capitalizeFirstLetter(blogPost.category)}
                            </span>
                            <small className="text-muted d-flex align-items-center" style={{fontSize: '0.85rem'}}>
                                <i className="fas fa-calendar-alt mr-2" style={{color: '#6c757d'}}></i>
                                {blogPost.month} {blogPost.day}
                            </small>
                        </div>
                        
                        <h4 className="card-title mb-3" style={{
                            fontWeight: '700',
                            fontSize: '1.4rem',
                            lineHeight: '1.3',
                            color: '#2c3e50',
                            marginBottom: '1rem'
                        }}>
                            {blogPost.title}
                        </h4>
                        
                        <p className="card-text mb-4" style={{
                            color: '#6c757d',
                            lineHeight: '1.7',
                            fontSize: '0.95rem',
                            marginBottom: '1.5rem'
                        }}>
                            {blogPost.excerpt}
                        </p>
                        
                        <Link 
                            to={`/blog/${blogPost.slug}`} 
                            className="btn px-4 py-2 position-relative overflow-hidden"
                            style={{
                                background: categoryGradient,
                                border: 'none',
                                borderRadius: '25px',
                                color: 'white',
                                textDecoration: 'none',
                                fontWeight: '600',
                                fontSize: '0.9rem',
                                transition: 'all 0.3s ease',
                                textTransform: 'none'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'scale(1.05)';
                                e.target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'scale(1)';
                                e.target.style.boxShadow = 'none';
                            }}
                        >
                            Read More <i className="fas fa-arrow-right ml-2"></i>
                        </Link>
                    </div>
                </div>
            );
        });

        for (let i = 0; i < list.length; i += 3) {
            result.push(
                <div key={i} className='row mb-4'>
                    <div className='col-lg-4 col-md-6 mb-4'>
                        {list[i]}
                    </div>
                    <div className='col-lg-4 col-md-6 mb-4'>
                        {list[i+1] ? list[i+1] : null}
                    </div>
                    <div className='col-lg-4 col-md-6 mb-4'>
                        {list[i+2] ? list[i+2] : null}
                    </div>
                </div>
            )
        }

        return result;
    };

    if (loading) {
        return (
            <div className='container mt-5'>
                <div className='d-flex justify-content-center align-items-center' style={{minHeight: '50vh'}}>
                    <div className='text-center'>
                        <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
                            <span className="sr-only">Loading...</span>
                        </div>
                        <p className="mt-3 text-muted">Loading amazing blog posts...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='container mt-3'>
            <div className="nav-scroller py-3 mb-4">
                <nav className="nav d-flex justify-content-center flex-wrap">
                    <Link className="nav-link px-3 py-2 mx-1 mb-2 text-decoration-none text-dark border rounded-pill" 
                          style={{transition: 'all 0.3s ease'}}
                          onMouseEnter={(e) => {
                              e.target.style.backgroundColor = '#007bff';
                              e.target.style.color = 'white';
                          }}
                          onMouseLeave={(e) => {
                              e.target.style.backgroundColor = 'transparent';
                              e.target.style.color = '#333';
                          }}
                          to='/category/world'>World</Link>
                    <Link className="nav-link px-3 py-2 mx-1 mb-2 text-decoration-none text-dark border rounded-pill" 
                          style={{transition: 'all 0.3s ease'}}
                          onMouseEnter={(e) => {
                              e.target.style.backgroundColor = '#28a745';
                              e.target.style.color = 'white';
                          }}
                          onMouseLeave={(e) => {
                              e.target.style.backgroundColor = 'transparent';
                              e.target.style.color = '#333';
                          }}
                          to='/category/environment'>Environment</Link>
                    <Link className="nav-link px-3 py-2 mx-1 mb-2 text-decoration-none text-dark border rounded-pill" 
                          style={{transition: 'all 0.3s ease'}}
                          onMouseEnter={(e) => {
                              e.target.style.backgroundColor = '#17a2b8';
                              e.target.style.color = 'white';
                          }}
                          onMouseLeave={(e) => {
                              e.target.style.backgroundColor = 'transparent';
                              e.target.style.color = '#333';
                          }}
                          to='/category/technology'>Technology</Link>
                    <Link className="nav-link px-3 py-2 mx-1 mb-2 text-decoration-none text-dark border rounded-pill" 
                          style={{transition: 'all 0.3s ease'}}
                          onMouseEnter={(e) => {
                              e.target.style.backgroundColor = '#6f42c1';
                              e.target.style.color = 'white';
                          }}
                          onMouseLeave={(e) => {
                              e.target.style.backgroundColor = 'transparent';
                              e.target.style.color = '#333';
                          }}
                          to='/category/design'>Design</Link>
                    <Link className="nav-link px-3 py-2 mx-1 mb-2 text-decoration-none text-dark border rounded-pill" 
                          style={{transition: 'all 0.3s ease'}}
                          onMouseEnter={(e) => {
                              e.target.style.backgroundColor = '#e83e8c';
                              e.target.style.color = 'white';
                          }}
                          onMouseLeave={(e) => {
                              e.target.style.backgroundColor = 'transparent';
                              e.target.style.color = '#333';
                          }}
                          to='/category/culture'>Culture</Link>
                    <Link className="nav-link px-3 py-2 mx-1 mb-2 text-decoration-none text-dark border rounded-pill" 
                          style={{transition: 'all 0.3s ease'}}
                          onMouseEnter={(e) => {
                              e.target.style.backgroundColor = '#fd7e14';
                              e.target.style.color = 'white';
                          }}
                          onMouseLeave={(e) => {
                              e.target.style.backgroundColor = 'transparent';
                              e.target.style.color = '#333';
                          }}
                          to='/category/business'>Business</Link>
                    <Link className="nav-link px-3 py-2 mx-1 mb-2 text-decoration-none text-dark border rounded-pill" 
                          style={{transition: 'all 0.3s ease'}}
                          onMouseEnter={(e) => {
                              e.target.style.backgroundColor = '#dc3545';
                              e.target.style.color = 'white';
                          }}
                          onMouseLeave={(e) => {
                              e.target.style.backgroundColor = 'transparent';
                              e.target.style.color = '#333';
                          }}
                          to='/category/politics'>Politics</Link>
                    <Link className="nav-link px-3 py-2 mx-1 mb-2 text-decoration-none text-dark border rounded-pill" 
                          style={{transition: 'all 0.3s ease'}}
                          onMouseEnter={(e) => {
                              e.target.style.backgroundColor = '#6c757d';
                              e.target.style.color = 'white';
                          }}
                          onMouseLeave={(e) => {
                              e.target.style.backgroundColor = 'transparent';
                              e.target.style.color = '#333';
                          }}
                          to='/category/opinion'>Opinion</Link>
                    <Link className="nav-link px-3 py-2 mx-1 mb-2 text-decoration-none text-dark border rounded-pill" 
                          style={{transition: 'all 0.3s ease'}}
                          onMouseEnter={(e) => {
                              e.target.style.backgroundColor = '#20c997';
                              e.target.style.color = 'white';
                          }}
                          onMouseLeave={(e) => {
                              e.target.style.backgroundColor = 'transparent';
                              e.target.style.color = '#333';
                          }}
                          to='/category/science'>Science</Link>
                    <Link className="nav-link px-3 py-2 mx-1 mb-2 text-decoration-none text-dark border rounded-pill" 
                          style={{transition: 'all 0.3s ease'}}
                          onMouseEnter={(e) => {
                              e.target.style.backgroundColor = '#ffc107';
                              e.target.style.color = 'white';
                          }}
                          onMouseLeave={(e) => {
                              e.target.style.backgroundColor = 'transparent';
                              e.target.style.color = '#333';
                          }}
                          to='/category/health'>Health</Link>
                    <Link className="nav-link px-3 py-2 mx-1 mb-2 text-decoration-none text-dark border rounded-pill" 
                          style={{transition: 'all 0.3s ease'}}
                          onMouseEnter={(e) => {
                              e.target.style.backgroundColor = '#6f42c1';
                              e.target.style.color = 'white';
                          }}
                          onMouseLeave={(e) => {
                              e.target.style.backgroundColor = 'transparent';
                              e.target.style.color = '#333';
                          }}
                          to='/category/style'>Style</Link>
                    <Link className="nav-link px-3 py-2 mx-1 mb-2 text-decoration-none text-dark border rounded-pill" 
                          style={{transition: 'all 0.3s ease'}}
                          onMouseEnter={(e) => {
                              e.target.style.backgroundColor = '#17a2b8';
                              e.target.style.color = 'white';
                          }}
                          onMouseLeave={(e) => {
                              e.target.style.backgroundColor = 'transparent';
                              e.target.style.color = '#333';
                          }}
                          to='/category/travel'>Travel</Link>
                </nav>
            </div>

            <div className="card mb-5 border-0 overflow-hidden position-relative" 
                 style={{
                     minHeight: '350px',
                     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                     borderRadius: '25px',
                     boxShadow: '0 15px 35px rgba(102, 126, 234, 0.3), 0 5px 15px rgba(0,0,0,0.08)'
                 }}>
                {/* Decorative elements */}
                <div className="position-absolute" style={{
                    top: '-50px',
                    right: '-50px',
                    width: '200px',
                    height: '200px',
                    background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                    borderRadius: '50%',
                    transform: 'rotate(45deg)'
                }}></div>
                <div className="position-absolute" style={{
                    bottom: '-30px',
                    left: '-30px',
                    width: '150px',
                    height: '150px',
                    background: 'linear-gradient(45deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
                    borderRadius: '50%'
                }}></div>
                
                <div className="card-body p-5 position-relative" style={{zIndex: 2}}>
                    <div className="text-center">
                        <span className="badge mb-4 px-4 py-2" style={{
                            background: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            borderRadius: '25px',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            backdropFilter: 'blur(10px)'
                        }}>
                            ⭐ Featured Post
                        </span>
                        
                        <h1 className="card-title mb-4" style={{
                            color: 'white',
                            fontWeight: '800',
                            fontSize: '2.5rem',
                            lineHeight: '1.2',
                            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>
                            {featuredBlog.title}
                        </h1>
                        
                        <p className="card-text mb-4 mx-auto" style={{
                            color: 'rgba(255,255,255,0.9)',
                            lineHeight: '1.8',
                            fontSize: '1.1rem',
                            maxWidth: '600px',
                            textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                        }}>
                            {featuredBlog.excerpt}
                        </p>
                        
                        <Link 
                            to={`/blog/${featuredBlog.slug}`} 
                            className="btn btn-lg px-5 py-3 position-relative overflow-hidden"
                            style={{
                                background: 'rgba(255,255,255,0.15)',
                                border: '2px solid rgba(255,255,255,0.3)',
                                borderRadius: '30px',
                                color: 'white',
                                textDecoration: 'none',
                                fontWeight: '600',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                                backdropFilter: 'blur(10px)',
                                textTransform: 'none'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = 'rgba(255,255,255,0.25)';
                                e.target.style.transform = 'scale(1.05)';
                                e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'rgba(255,255,255,0.15)';
                                e.target.style.transform = 'scale(1)';
                                e.target.style.boxShadow = 'none';
                            }}
                        >
                            Read Featured Article <i className="fas fa-arrow-right ml-3"></i>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mb-5">
                <div className="text-center mb-5 position-relative">
                    <div className="d-inline-block position-relative">
                        <h2 className="mb-3" style={{
                            fontWeight: '800',
                            fontSize: '2.5rem',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            Latest Articles
                        </h2>
                        <div className="position-absolute" style={{
                            bottom: '-10px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '100px',
                            height: '4px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: '2px'
                        }}></div>
                    </div>
                    <p className="lead text-muted mt-4 mb-4" style={{
                        fontSize: '1.1rem',
                        maxWidth: '600px',
                        margin: '1.5rem auto 0'
                    }}>
                        Discover our collection of insightful articles and stories
                    </p>
                    <span className="badge px-4 py-2" style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        borderRadius: '25px',
                        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                    }}>
                        {blogs.length} {blogs.length === 1 ? 'Article' : 'Articles'} Available
                    </span>
                </div>
                
                {blogs.length > 0 ? (
                    getBlogs()
                ) : (
                    <div className="text-center py-5">
                        <i className="fas fa-blog fa-3x text-muted mb-3"></i>
                        <h4 className="text-muted">No blog posts available</h4>
                        <p className="text-muted">Check back later for new content!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
