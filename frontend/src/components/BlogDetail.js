import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from '../config';

export default function BlogDetails() {
    const [blog, setBlog] = useState({});
    const [loading, setLoading] = useState(true);

    const {slug} = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axios.get(API_ENDPOINTS.BLOG_DETAIL(slug));
                setBlog(res.data);
                console.log('Blog detail:', res.data);
            }
            catch (err) {
                console.error('Error fetching blog detail:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    const createBlog = () => {
        if (!blog.content) return { __html: '' };
        
        let processedContent = blog.content;
        
        // Process images uploaded through Summernote
        // Replace relative image paths with full backend URL
        processedContent = processedContent.replace(
            /src="\/media\//g,
            `src="${API_ENDPOINTS.BASE_URL}/media/`
        );
        
        // Also handle images that might be stored with relative paths
        processedContent = processedContent.replace(
            /src="media\//g,
            `src="${API_ENDPOINTS.BASE_URL}/media/`
        );
        
        // Ensure YouTube videos are properly embedded and responsive
        processedContent = processedContent.replace(
            /<iframe([^>]*youtube[^>]*)>/gi,
            '<div class="video-responsive"><iframe$1 frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
        );
        
        // Handle other video embeds
        processedContent = processedContent.replace(
            /<iframe([^>]*vimeo[^>]*)>/gi,
            '<div class="video-responsive"><iframe$1 frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>'
        );
        
        return { __html: processedContent };
    };

    const capitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    };

    const getCategoryGradient = (category) => {
        const categoryColors = {
            technology: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            business: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            science: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            health: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            culture: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            world: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            environment: 'linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%)',
            design: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
            politics: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
            opinion: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            style: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
            travel: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
            default: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        };
        return categoryColors[category?.toLowerCase()] || categoryColors.default;
    };

    if (loading) {
        return (
            <div className='container mt-5'>
                <div className='d-flex justify-content-center align-items-center' style={{minHeight: '60vh'}}>
                    <div className='text-center'>
                        <div className="spinner-border text-primary mb-3" role="status" style={{width: '3rem', height: '3rem'}}>
                            <span className="sr-only">Loading...</span>
                        </div>
                        <p className="text-muted">Loading article...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='position-relative'>
            {/* Hero Section with Gradient Background */}
            <div className="position-relative overflow-hidden" 
                 style={{
                     background: getCategoryGradient(blog.category),
                     minHeight: '40vh',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center'
                 }}>
                
                {/* Decorative Elements */}
                <div className="position-absolute" style={{
                    top: '-100px',
                    right: '-100px',
                    width: '300px',
                    height: '300px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    transform: 'rotate(45deg)'
                }}></div>
                <div className="position-absolute" style={{
                    bottom: '-50px',
                    left: '-50px',
                    width: '200px',
                    height: '200px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '50%'
                }}></div>

                <div className="container text-center text-white position-relative" style={{zIndex: 2}}>
                    {/* Category Badge */}
                    <span className="badge mb-3 px-4 py-2" style={{
                        background: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        borderRadius: '25px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        backdropFilter: 'blur(10px)'
                    }}>
                        {capitalizeFirstLetter(blog.category)}
                    </span>

                    {/* Title */}
                    <h1 className="display-4 font-weight-bold mb-4" style={{
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                        lineHeight: '1.2',
                        maxWidth: '900px',
                        margin: '0 auto'
                    }}>
                        {blog.title}
                    </h1>

                    {/* Date and Reading Time */}
                    <div className="d-flex justify-content-center align-items-center flex-wrap">
                        <div className="d-flex align-items-center mx-3 mb-2">
                            <i className="fas fa-calendar-alt mr-2"></i>
                            <span style={{fontSize: '1.1rem'}}>{blog.month} {blog.day}</span>
                        </div>
                        <div className="d-flex align-items-center mx-3 mb-2">
                            <i className="fas fa-clock mr-2"></i>
                            <span style={{fontSize: '1.1rem'}}>8 min read</span>
                        </div>
                        <div className="d-flex align-items-center mx-3 mb-2">
                            <i className="fas fa-eye mr-2"></i>
                            <span style={{fontSize: '1.1rem'}}>1.2k views</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10">
                        {/* Content Card */}
                        <div className="card border-0 shadow-lg" style={{
                            borderRadius: '20px',
                            overflow: 'hidden'
                        }}>
                            {/* Gradient Top Border */}
                            <div className="w-100" style={{
                                height: '4px',
                                background: getCategoryGradient(blog.category)
                            }}></div>

                            <div className="card-body p-5">
                                {/* Article Content */}
                                <div 
                                    className="article-content" 
                                    style={{
                                        fontSize: '1.1rem',
                                        lineHeight: '1.8',
                                        color: '#2c3e50'
                                    }}
                                    dangerouslySetInnerHTML={createBlog()} 
                                />
                            </div>
                        </div>

                        {/* Action Section */}
                        <div className="text-center mt-5">
                            <div className="d-inline-flex align-items-center p-4 rounded-pill shadow-sm" style={{
                                background: 'linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%)',
                                border: '1px solid rgba(0,0,0,0.05)'
                            }}>
                                <Link 
                                    to='/blog' 
                                    className="btn px-4 py-2 mr-3"
                                    style={{
                                        background: getCategoryGradient(blog.category),
                                        border: 'none',
                                        borderRadius: '25px',
                                        color: 'white',
                                        textDecoration: 'none',
                                        fontWeight: '600',
                                        fontSize: '0.9rem',
                                        transition: 'all 0.3s ease'
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
                                    <i className="fas fa-arrow-left mr-2"></i>
                                    Back to Articles
                                </Link>

                                {/* Social Share Buttons */}
                                {/* <div className="d-flex align-items-center">
                                    <span className="text-muted mr-3" style={{fontSize: '0.9rem'}}>Share:</span>
                                    <button 
                                        className="btn btn-sm rounded-circle mr-2 p-2"
                                        style={{
                                            background: '#1da1f2',
                                            border: 'none',
                                            color: 'white',
                                            width: '35px',
                                            height: '35px'
                                        }}
                                        title="Share on Twitter"
                                    >
                                        <i className="fab fa-twitter"></i>
                                    </button>
                                    <button 
                                        className="btn btn-sm rounded-circle mr-2 p-2"
                                        style={{
                                            background: '#3b5998',
                                            border: 'none',
                                            color: 'white',
                                            width: '35px',
                                            height: '35px'
                                        }}
                                        title="Share on Facebook"
                                    >
                                        <i className="fab fa-facebook-f"></i>
                                    </button>
                                    <button 
                                        className="btn btn-sm rounded-circle p-2"
                                        style={{
                                            background: '#0077b5',
                                            border: 'none',
                                            color: 'white',
                                            width: '35px',
                                            height: '35px'
                                        }}
                                        title="Share on LinkedIn"
                                    >
                                        <i className="fab fa-linkedin-in"></i>
                                    </button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Styles for Article Content */}
            <style jsx>{`
                .article-content h1, .article-content h2, .article-content h3 {
                    color: #2c3e50;
                    font-weight: 700;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                }
                
                .article-content h1 {
                    font-size: 2rem;
                    border-bottom: 3px solid ${getCategoryGradient(blog.category)};
                    padding-bottom: 0.5rem;
                }
                
                .article-content h2 {
                    font-size: 1.5rem;
                }
                
                .article-content h3 {
                    font-size: 1.25rem;
                }
                
                .article-content p {
                    margin-bottom: 1.5rem;
                    text-align: justify;
                }
                
                .article-content blockquote {
                    border-left: 4px solid ${getCategoryGradient(blog.category)};
                    background: rgba(102, 126, 234, 0.05);
                    padding: 1.5rem;
                    margin: 2rem 0;
                    border-radius: 0 10px 10px 0;
                    font-style: italic;
                }
                
                .article-content code {
                    background: #f8f9fa;
                    padding: 0.2rem 0.4rem;
                    border-radius: 4px;
                    font-size: 0.9em;
                    color: #e83e8c;
                }
                
                .article-content pre {
                    background: #2d3748;
                    color: #e2e8f0;
                    padding: 1.5rem;
                    border-radius: 10px;
                    overflow-x: auto;
                    margin: 2rem 0;
                }
                
                .article-content ul, .article-content ol {
                    margin-bottom: 1.5rem;
                    padding-left: 2rem;
                }
                
                .article-content li {
                    margin-bottom: 0.5rem;
                }
                
                .article-content img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 10px;
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
                    margin: 2rem auto;
                    display: block;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                
                .article-content img:hover {
                    transform: scale(1.02);
                    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
                }
                
                .article-content a {
                    color: ${getCategoryGradient(blog.category)};
                    text-decoration: none;
                    font-weight: 600;
                    border-bottom: 1px solid transparent;
                    transition: all 0.3s ease;
                }
                
                .article-content a:hover {
                    border-bottom-color: currentColor;
                }
                
                /* Responsive video containers */
                .video-responsive {
                    position: relative;
                    padding-bottom: 56.25%; /* 16:9 aspect ratio */
                    padding-top: 25px;
                    height: 0;
                    margin: 2rem 0;
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
                }
                
                .video-responsive iframe {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 10px;
                }
                
                /* Handle tables */
                .article-content table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 2rem 0;
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                
                .article-content th,
                .article-content td {
                    padding: 12px 15px;
                    text-align: left;
                    border-bottom: 1px solid #e2e8f0;
                }
                
                .article-content th {
                    background: ${getCategoryGradient(blog.category)};
                    color: white;
                    font-weight: 600;
                }
                
                .article-content tr:hover {
                    background-color: rgba(102, 126, 234, 0.05);
                }
            `}</style>
        </div>
    );
};