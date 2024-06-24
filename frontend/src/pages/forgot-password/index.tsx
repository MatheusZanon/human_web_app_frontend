import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePostForgotPassword } from '@/api/http/user';

const ForgotPasswordSchema = z.object({
    email: z.string().email('Email inválido'),
});

type ForgotPasswordData = z.infer<typeof ForgotPasswordSchema>;

function ForgotPassword() {
    const {
        mutate: forgotPasswordMutation,
        isSuccess: isForgotPasswordSuccess,
        isPending: isForgotPasswordPending,
        isError: isForgotPasswordError,
        error: forgotPasswordError,
    } = usePostForgotPassword();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordData>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        criteriaMode: 'all',
        shouldUnregister: false,
        shouldFocusError: true,
        shouldUseNativeValidation: false,
        delayError: 500,
        defaultValues: {
            email: '',
        },
        resolver: zodResolver(ForgotPasswordSchema),
    });

    function onSubmit(data: ForgotPasswordData) {
        const parsedData = ForgotPasswordSchema.safeParse(data);

        if (!parsedData.success) {
            console.log(`Error: ${parsedData.error}`);
            return;
        }

        forgotPasswordMutation(parsedData.data);

        if (isForgotPasswordPending) {
            console.log('Enviando email...');
            toast.info('Enviando email...', {
                position: 'bottom-right',
                autoClose: 3000,
            });
            return;
        }

        if (isForgotPasswordError) {
            console.log(`Error: ${forgotPasswordError}`);
            toast.error(`Erro: ${forgotPasswordError}`, {
                position: 'bottom-right',
                autoClose: 3000,
            });
            return;
        }

        if (isForgotPasswordSuccess) {
            console.log('Email enviado com sucesso!');
            toast.success('Email enviado com sucesso!', {
                position: 'bottom-right',
                autoClose: 3000,
            });
        }
    }

    return (
        <div className='w-50 p-3 d-flex flex-column align-items-center shadow rounded'>
            <img src='/human-logo-full.svg' alt={`Human logo`} className='w-50 mb-2' />
            <form onSubmit={handleSubmit(onSubmit)} className='w-100'>
                <div className='d-flex gap-3 mt-2 mb-2'>
                    <div className='w-100'>
                        <label htmlFor='email' className='form-label'>
                            Email:<span className='text-danger'>*</span>
                        </label>
                        <input type='email' id='email' className='form-control' {...register('email')} />
                        {errors.email && <p className='text-danger'>{errors.email.message}</p>}
                    </div>
                </div>
                <button type='submit' className='btn btn-primary mt-2'>
                    Enviar
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

export default ForgotPassword;
