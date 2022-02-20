import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  console.log('~ NotFoundPage');

  return (
    <div className='container vh-100 d-flex flex-column align-items-center justify-content-center text-capitalize text-center'>
      <h1 className='text-center '>404</h1>
      <h3 className='h2'>Look like you're lost</h3>
      <p>the page you are looking for not avaible!</p>
      <Link to='/'>Go to Home</Link>
    </div>
  );
}
