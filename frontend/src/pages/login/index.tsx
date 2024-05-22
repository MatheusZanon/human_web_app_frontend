import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { api } from '@/utils/axios';

const schema = z.object({
    username: z.string().min(2, 'Nome de usuário inválido'),
    password: z.string().min(2, 'É necessário pelo menos 6 caracteres'),
});

type LoginData = z.infer<typeof schema>;

function Login() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        criteriaMode: 'all',
        shouldUnregister: false,
        shouldFocusError: true,
        shouldUseNativeValidation: false,
        delayError: 500,
        defaultValues: {
            username: '',
            password: '',
        },
        resolver: zodResolver(schema),
    });

    function onSubmit(data: LoginData) {
        const parsedData = schema.safeParse(data);
        if (parsedData.success) {
        api.post('token/', {
            username: parsedData.data.username,
            password: parsedData.data.password,
        }, {withCredentials: true}).then(response => {
                if (response.status == 200) {
                    toast("Login efetuado com sucesso!");
                    setTimeout(() => {
                        navigate('/main/robos');
                    }, 1500);  
                }  
        }).catch(error => {
            console.error('Houve um erro no login: ', error, error.response.status);
            if (error.response.status == 401) {
            toast("Credenciais Inválidas!");
            } else if (error.response.status == 500) {
            toast("Erro Interno do Servidor");
            }
        });
        }
    };

    return (
        <div className='w-50 p-3 d-flex flex-column align-items-center shadow rounded'>
            <img src='/human-logo-full.svg' alt={`Human logo`} className='mb-2' />
            <form onSubmit={handleSubmit(onSubmit)} className='w-100'>
                <div>
                    <label htmlFor='username' className='form-label'>
                        Nome de Usuário:<span className='text-danger'>*</span>
                    </label>
                    <input type='text' id='username' className='form-control' {...register('username')} />
                    {errors.username && <p className='text-danger'>{errors.username.message}</p>}
                </div>
                <div>
                    <label htmlFor='password' className='form-label'>
                        Password<span className='text-danger'>*</span>
                    </label>
                    <input type='password' id='password' className='form-control' {...register('password')} />
                    {errors.password && <p className='text-danger'>{errors.password.message}</p>}
                </div>
                <button type='submit' className='btn btn-primary mt-2'>
                    Login
                </button>
                <div className='row mt-2'>
                    <span className='text-muted'>
                        Ainda não possui uma conta?{' '}
                        <Link to='/register' className='text-decoration-none text-primary'>
                            Clique aqui
                        </Link>{' '}
                        para requisitar o seu cadastro
                    </span>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;
