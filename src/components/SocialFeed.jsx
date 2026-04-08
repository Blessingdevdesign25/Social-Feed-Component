import { useState, useEffect } from 'react';
import './SocialFeed.css';

const SocialFeed = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch posts, users, and comments in parallel
        const [postsRes, usersRes, commentsRes] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/posts'),
          fetch('https://jsonplaceholder.typicode.com/users'),
          fetch('https://jsonplaceholder.typicode.com/comments'),
        ]);

        if (!postsRes.ok || !usersRes.ok || !commentsRes.ok) {
          throw new Error('Failed to fetch data from JSONPlaceholder');
        }

        const posts = await postsRes.json();
        const users = await usersRes.json();
        const comments = await commentsRes.json();

        // Combine data
        const combinedData = posts.slice(0, 10).map((post) => {
          const user = users.find((u) => u.id === post.userId);
          const postComments = comments.filter((c) => c.postId === post.id);
          
          return {
            ...post,
            author: user || { name: 'Unknown Author', username: 'unknown' },
            // Include at least one comment as requested, or more if available
            comments: postComments.slice(0, 3) 
          };
        });

        setData(combinedData);
      } catch (err) {
        console.error('Data Fetch Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="feed-status">
        <div className="loader"></div>
        <p>Loading your feed...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="feed-status error">
        <p>Oops! {error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="social-feed">
      {data.map((post) => (
        <article key={post.id} className="post-card">
          <header className="post-header">
            <div className="avatar">
              {post.author.name.charAt(0)}
            </div>
            <div className="author-info">
              <h3 className="author-name">{post.author.name}</h3>
              <p className="author-handle">@{post.author.username.toLowerCase()}</p>
            </div>
          </header>
          
          <div className="post-content">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-body">{post.body}</p>
          </div>

          <footer className="post-footer">
            <div className="comment-section">
              <h4 className="comment-heading">Comments ({post.comments.length})</h4>
              {post.comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <span className="comment-user">{comment.email.split('@')[0]}</span>
                  <p className="comment-text">{comment.body}</p>
                </div>
              ))}
            </div>
          </footer>
        </article>
      ))}
    </div>
  );
};

export default SocialFeed;
