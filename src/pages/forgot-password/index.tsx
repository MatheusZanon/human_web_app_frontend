import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePostForgotPassword } from '@/api/http/user';
import { useEffect } from 'react';

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
            return;
        }

        forgotPasswordMutation(parsedData.data);
    }

    useEffect(() => {
        if (isForgotPasswordPending) {
            toast.info('Enviando email...', {
                position: 'bottom-right',
                autoClose: 5000,
            });
            return;
        }
    }, [isForgotPasswordPending]);

    useEffect(() => {
        if (isForgotPasswordError) {
            toast.dismiss();
            toast.error(`Erro: ${forgotPasswordError?.response?.data}`, {
                position: 'bottom-right',
                autoClose: 7000,
            });
            return;
        }
    }, [isForgotPasswordError, forgotPasswordError]);

    useEffect(() => {
        if (isForgotPasswordSuccess) {
            toast.dismiss();
            toast.success('O link para redefinir sua senha foi enviado para o email informado!', {
                position: 'bottom-right',
                autoClose: 7000,
            });
        }
    }, [isForgotPasswordSuccess]);

    return (
        <div className='w-50 p-3 d-flex flex-column align-items-center shadow rounded'>
            <img src='/human-logo-full-font-black.svg' alt={`Human logo`} className='w-50 mb-2' style={{maxHeight: '100px', maxWidth: '200px' }}/>
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
        </div>
    );
}

export default ForgotPassword;
