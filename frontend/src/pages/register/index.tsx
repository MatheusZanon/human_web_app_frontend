import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const schema = z
  .object({
    name: z.string().min(3, 'É necessário pelo menos 3 caracteres'),
    cpf: z.string().refine((cpf: string) => {
      if (typeof cpf !== 'string') return false;
      cpf = cpf.replace(/[^\d]+/g, '');
      if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
      const cpfDigits = cpf.split('').map((el) => +el);
      const rest = (count: number): number => {
        return (
          ((cpfDigits.slice(0, count - 12).reduce((soma, el, index) => soma + el * (count - index), 0) * 10) % 11) % 10
        );
      };
      return rest(10) === cpfDigits[9] && rest(11) === cpfDigits[10];
    }, 'Digite um cpf válido.'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'É necessário pelo menos 6 caracteres'),
    confirmPassword: z.string().min(6, 'É necessário pelo menos 6 caracteres'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas devem ser iguais',
  });

type RegisterData = z.infer<typeof schema>;

function Register() {
  const {
    register,
    handleSubmit,
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
      cpf: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(schema),
  });

  function onSubmit(data: RegisterData) {
    const parsedData = schema.safeParse(data);
    if (parsedData.success) {
      console.log(data);
    } else {
      console.log(`Error: ${parsedData.error}`);
    }
  }

  return (
    <div className='w-50 p-3 d-flex flex-column align-items-center shadow rounded'>
      <img src='https://via.placeholder.com/250x100' alt={`Human logo`} className='w-50 mb-2' />
      <form onSubmit={handleSubmit(onSubmit)} className='w-100'>
        <div>
          <label htmlFor='name' className='form-label'>
            Name<span className='text-danger'>*</span>
          </label>
          <input type='text' id='name' className='form-control' {...register('name')} />
          {errors.email && <p className='text-danger'>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor='email' className='form-label'>
            Email<span className='text-danger'>*</span>
          </label>
          <input type='email' id='email' className='form-control' {...register('email')} />
          {errors.email && <p className='text-danger'>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor='cpf' className='form-label'>
            CPF<span className='text-danger'>*</span>
          </label>
          <input type='text' id='cpf' className='form-control' {...register('cpf')} />
          {errors.cpf && <p className='text-danger'>{errors.cpf.message}</p>}
        </div>
        <div>
          <label htmlFor='password' className='form-label'>
            Password<span className='text-danger'>*</span>
          </label>
          <input type='password' id='password' className='form-control' {...register('password')} />
          {errors.password && <p className='text-danger'>{errors.password.message}</p>}
        </div>
        <div>
          <label htmlFor='confirmPassword' className='form-label'>
            Confirm Password<span className='text-danger'>*</span>
          </label>
          <input type='password' id='confirmPassword' className='form-control' {...register('confirmPassword')} />
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
    </div>
  );
}

export default Register;
