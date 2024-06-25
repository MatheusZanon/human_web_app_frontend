import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePostResetPassword } from '@/api/http/user';

const ResetPasswordSchema = z
    .object({
        newPassword: z.string().min(6, 'É necessário pelo menos 6 caracteres'),
        confirmNewPassword: z.string().min(6, 'É necessário pelo menos 6 caracteres'),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: 'As senhas não conferem',
        path: ['confirmNewPassword'],
    });

type ResetPasswordData = z.infer<typeof ResetPasswordSchema>;

function ResetPassword() {
    const navigate = useNavigate();
    const {
        mutate: resetPasswordMutation,
        isPending: isResetPasswordPending,
        isSuccess: isResetPasswordSuccess,
        isError: isResetPasswordError,
        error: resetPasswordError,
    } = usePostResetPassword();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordData>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        criteriaMode: 'all',
        shouldUnregister: false,
        shouldFocusError: true,
        shouldUseNativeValidation: false,
        delayError: 500,
        defaultValues: {
            newPassword: '',
            confirmNewPassword: '',
        },
        resolver: zodResolver(ResetPasswordSchema),
    });

    const [searchParams] = useSearchParams();
    function onSubmit(data: ResetPasswordData) {
        const parsedData = ResetPasswordSchema.safeParse(data);

        if (!parsedData.success) {
            return;
        }

        const token = searchParams.get('token');

        resetPasswordMutation({ new_password: parsedData.data.newPassword, token: token as string });
    }
    if (isResetPasswordPending) {
        toast.info('Enviando email...', {
            position: 'bottom-right',
            autoClose: 5000,
        });
        return;
    }

    if (isResetPasswordError) {
        toast.error(`${resetPasswordError?.response?.data as string}`, {
            position: 'bottom-right',
            autoClose: 7000,
        });
        return;
    }

    if (isResetPasswordSuccess) {
        toast.success('Senha alterada com sucesso', {
            position: 'bottom-right',
            autoClose: 7000,
        });

        setTimeout(() => {
            navigate('/');
        }, 7000);
    }

    return (
        <div className='w-50 p-3 d-flex flex-column align-items-center shadow rounded'>
            <img src='/human-logo-full.svg' alt={`Human logo`} className='w-50 mb-2' />
            <form onSubmit={handleSubmit(onSubmit)} className='w-100'>
                <div>
                    <label htmlFor='newPassword' className='form-label'>
                        Nova Senha:<span className='text-danger'>*</span>
                    </label>
                    <input type='password' id='newPassword' className='form-control' {...register('newPassword')} />
                    {errors.newPassword && <p className='text-danger'>{errors.newPassword.message}</p>}
                </div>
                <div>
                    <label htmlFor='confirmNewPassword' className='form-label'>
                        Confirme a nova senha:<span className='text-danger'>*</span>
                    </label>
                    <input
                        type='password'
                        id='confirmNewPassword'
                        className='form-control'
                        {...register('confirmNewPassword')}
                    />
                    {errors.confirmNewPassword && <p className='text-danger'>{errors.confirmNewPassword.message}</p>}
                </div>
                <button type='submit' className='btn btn-primary mt-2'>
                    Trocar sua senha
                </button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default ResetPassword;
