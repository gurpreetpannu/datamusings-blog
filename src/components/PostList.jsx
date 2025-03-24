import React from 'react';
import Post from './Post';

const PostList = ({ posts = [] }) => {
  return (
    <div>
      {posts?.map((post, index) => (
        <Post key={post?.id || index} post={post} onDelete={post?.onDelete} />
      ))}
    </div>
  );
};

export default PostList;
