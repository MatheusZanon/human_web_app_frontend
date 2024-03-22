import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const schema = z
  .object({
    username: z.string().min(3, 'É necessário pelo menos 3 caracteres'),
    firstname: z.string(),
    lastname: z.string(),
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
    setor: z.string().min(6, 'É necessário pelo menos 6 caracteres'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas devem ser iguais',
  });

type RegisterData = z.infer<typeof schema>;

function Register() {
  const navigate = useNavigate();

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
      axios.post('http://localhost:8000/api/user/', {
        username: parsedData.data.username,
        first_name: parsedData.data.firstname,
        last_name: parsedData.data.lastname,
        email: parsedData.data.email,
        password: parsedData.data.password,
        rg: null,
        cpf: parsedData.data.cpf,
        telefone_celular: null,
      }).then(response => {
        if (response.status == 201){
          toast("Solicitação de Cadastro efetuada com sucesso!");
          setTimeout(() => {
            navigate('/');
          }, 1000);
        }
      }).catch(error => {
        console.error('Houve um erro na solicitação de cadastro: ', error)
      });
    } else {
      console.log(`Error: ${parsedData.error}`);
    }
  }

  return (
    <div className='w-50 p-3 d-flex flex-column align-items-center shadow rounded'>
      <img src='https://via.placeholder.com/250x100' alt={`Human logo`} className='w-50 mb-2' />
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
            Nome: <span>(Opcional)</span>
          </label>
          <input type='text' id='firstname' className='form-control' {...register('firstname')} />
        </div>
        <div>
          <label htmlFor='lastname' className='form-label'>
            Sobrenome: <span>(Opcional)</span>
          </label>
          <input type='text' id='lastname' className='form-control' {...register('lastname')} />
        </div>
        <div>
          <label htmlFor='cpf' className='form-label'>
            CPF:<span className='text-danger'>*</span>
          </label>
          <input type='text' id='cpf' className='form-control' {...register('cpf')} />
          {errors.cpf && <p className='text-danger'>{errors.cpf.message}</p>}
        </div>
        <div>
          <label htmlFor='email' className='form-label'>
            Email:<span className='text-danger'>*</span>
          </label>
          <input type='email' id='email' className='form-control' {...register('email')} />
          {errors.email && <p className='text-danger'>{errors.email.message}</p>}
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
          <input type='password' id='confirmPassword' className='form-control' {...register('confirmPassword')} />
          {errors.confirmPassword && <p className='text-danger'>{errors.confirmPassword.message}</p>}
        </div>
        <div>
          <label htmlFor='setor' className='form-label'>
            Setor:<span className='text-danger'>*</span>
          </label>
          <input type='text' id='setor' className='form-control'  {...register('setor')}/>
          {errors.setor && <p className='text-danger'>{errors.setor.message}</p>}
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
