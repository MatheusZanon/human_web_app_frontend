import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className='d-flex flex-column align-items-center justify-content-center container min-vh-100'>
      <div className='d-block text-center w-50 h-50 overflow-hidden'>
        <img src='/404.svg' alt='404' className='img-fluid' />
      </div>
      <div className='text-center'>
        <h1>404 - Page Not Found</h1>
        <Link to='/' className='btn btn-primary'>
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
