import { Link } from 'react-router-dom';

function Forbidden() {
    return (
        <div className='d-flex flex-column align-items-center justify-content-center container min-vh-100'>
            <div className='d-block text-center w-50 h-50 overflow-hidden' style={{ maxHeight: '500px' }}></div>
            <div className='text-center'>
                <h1>Acesso não autorizado.</h1>
                <Link to='/main/robos' className='btn btn-primary'>
                    Ir para página inicial
                </Link>
            </div>
        </div>
    );
}

export default Forbidden;
