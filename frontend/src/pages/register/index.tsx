import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '@/utils/axios';
import { phoneFormatter } from '@/libs';

const schema = z
    .object({
        username: z.string().min(3, 'É necessário pelo menos 3 caracteres'),
        firstname: z.string(),
        lastname: z.string(),
        email: z.string().email('Email inválido'),
        telefone: z.string().trim(),
        password: z.string().min(6, 'É necessário pelo menos 6 caracteres'),
        confirmPassword: z.string().min(6, 'É necessário pelo menos 6 caracteres'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'As senhas devem ser iguais',
    });

type RegisterData = z.infer<typeof schema>;

function Register() {
    const navigate = useNavigate();

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedPhone = phoneFormatter(event.target.value);
        setValue('telefone', formattedPhone);
    };

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<RegisterData>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        criteriaMode: 'all',
        shouldUnregister: false,
        shouldFocusError: true,
        shouldUseNativeValidation: false,
        delayError: 500,
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        resolver: zodResolver(schema),
    });

    function onSubmit(data: RegisterData) {
        const parsedData = schema.safeParse(data);
        if (parsedData.success) {
            const cleanedPhone = parsedData.data.telefone.replace(/\D/g, '');
            api.post('user/', {
                username: parsedData.data.username,
                first_name: parsedData.data.firstname,
                last_name: parsedData.data.lastname,
                email: parsedData.data.email,
                telefone_celular: cleanedPhone,
                password: parsedData.data.password,
            })
                .then((response) => {
                    if (response.status == 201) {
                        toast('Solicitação de Cadastro efetuada com sucesso!');
                        setTimeout(() => {
                            navigate('/');
                        }, 500);
                    }
                })
                .catch((error) => {
                    toast.error(`Erro: ${error.response.data.error}`);
                });
        } else {
            console.log(`Error: ${parsedData.error}`);
        }
    }

    return (
        <div className='w-50 p-3 d-flex flex-column align-items-center shadow rounded'>
            <img src='/human-logo-full-font-black.svg' alt={`Human logo`} className='w-50 mb-2' style={{maxHeight: '100px', maxWidth: '200px' }}/>
            <form onSubmit={handleSubmit(onSubmit)} className='w-100'>
                <div>
                    <label htmlFor='username' className='form-label'>
                        Nome de Usuário:<span className='text-danger'>*</span>
                    </label>
                    <input type='text' id='username' className='form-control' {...register('username')} />
                    {errors.username && <p className='text-danger'>{errors.username.message}</p>}
                </div>
                <div>
                    <label htmlFor='firstname' className='form-label'>
                        Nome:
                    </label>
                    <input type='text' id='firstname' className='form-control' {...register('firstname')} />
                </div>
                <div>
                    <label htmlFor='lastname' className='form-label'>
                        Sobrenome:
                    </label>
                    <input type='text' id='lastname' className='form-control' {...register('lastname')} />
                </div>
                <div className='d-flex gap-3 mt-2 mb-2'>
                    <div className='w-100'>
                        <label htmlFor='email' className='form-label'>
                            Email:<span className='text-danger'>*</span>
                        </label>
                        <input type='email' id='email' className='form-control' {...register('email')} />
                        {errors.email && <p className='text-danger'>{errors.email.message}</p>}
                    </div>
                    <div className='w-100'>
                        <label htmlFor='telefone' className='form-label'>
                            Telefone:
                        </label>
                        <input
                            type='text'
                            id='telefone'
                            className='form-control'
                            {...register('telefone')}
                            onChange={handlePhoneChange}
                            placeholder='(00) 00000-0000'
                        />
                        {errors.telefone && <p className='text-danger'>{errors.telefone.message}</p>}
                    </div>
                </div>
                <div>
                    <label htmlFor='password' className='form-label'>
                        Senha:<span className='text-danger'>*</span>
                    </label>
                    <input type='password' id='password' className='form-control' {...register('password')} />
                    {errors.password && <p className='text-danger'>{errors.password.message}</p>}
                </div>
                <div>
                    <label htmlFor='confirmPassword' className='form-label'>
                        Confirmar Senha:<span className='text-danger'>*</span>
                    </label>
                    <input
                        type='password'
                        id='confirmPassword'
                        className='form-control'
                        {...register('confirmPassword')}
                    />
                    {errors.confirmPassword && <p className='text-danger'>{errors.confirmPassword.message}</p>}
                </div>
                <button type='submit' className='btn btn-primary mt-2'>
                    Requisitar cadastro
                </button>
                <div className='row mt-2'>
                    <span className='text-muted'>
                        Já possui uma conta?{' '}
                        <Link to='/' className='text-decoration-none text-primary'>
                            Clique aqui
                        </Link>{' '}
                        para entrar no sistema
                    </span>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Register;
