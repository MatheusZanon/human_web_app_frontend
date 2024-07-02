import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className='d-flex flex-column align-items-center justify-content-center container min-vh-100'>
            <div className='d-block text-center w-50 h-50 overflow-hidden' style={{ maxHeight: '500px' }}>
                <img src='/erro404pagenotfound.gif' alt='404' className='img-fluid' />
            </div>
            <div className='text-center'>
                <h1>Página não encontrada</h1>
                <Link to='/main' className='btn btn-primary'>
                    Ir para página inicial
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
