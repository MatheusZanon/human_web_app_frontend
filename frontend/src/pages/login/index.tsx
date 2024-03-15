import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'É necessário pelo menos 6 caracteres'),
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
      email: '',
      password: '',
    },
    resolver: zodResolver(schema),
  });

  function onSubmit(data: LoginData) {
    const parsedData = schema.safeParse(data);
    if (parsedData.success) {
      navigate('/');
    } else {
      console.log(`Error: ${parsedData.error}`);
    }
  }

  return (
    <div className='w-50 p-3 d-flex flex-column align-items-center shadow rounded'>
      <img src='https://via.placeholder.com/250x100' alt={`Human logo`} className='w-50 mb-2' />
      <form onSubmit={handleSubmit(onSubmit)} className='w-100'>
        <div>
          <label htmlFor='email' className='form-label'>
            Email<span className='text-danger'>*</span>
          </label>
          <input type='email' id='email' className='form-control' {...register('email')} />
          {errors.email && <p className='text-danger'>{errors.email.message}</p>}
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
    </div>
  );
}

export default Login;
