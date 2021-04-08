import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

import {Redirect} from "react-router-dom"



const PostForm = ({ addPost}) => {
  const [text, setText] = useState('');
  if(text==="redirect"){
    return <Redirect to="/posts"/>
  }
  return (
    <div className='post-form'>
      <div className='bg-primary p round-btn-only'>
        <h2>    Engage with the community!</h2>
        <h3>    Post something...</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addPost({ text });
          setText('redirect');
          
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
        
        
      </form>
      
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(
  null,
  { addPost }
)(PostForm);
