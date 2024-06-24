import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPasswordSchema = z.object({
    newPassword: z.string().min(6, 'É necessário pelo menos 6 caracteres'),
    confirmNewPassword: z.string().min(6, 'É necessário pelo menos 6 caracteres'),
});

type ResetPasswordData = z.infer<typeof ResetPasswordSchema>;

function ResetPassword() {
    const navigate = useNavigate();

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

    function onSubmit(data: ResetPasswordData) {
        const parsedData = ResetPasswordSchema.safeParse(data);
        console.log(parsedData);
    }

    return (
        <div className='w-50 p-3 d-flex flex-column align-items-center shadow rounded'>
            <img src='/human-logo-full.svg' alt={`Human logo`} className='w-50 mb-2' />
            <form onSubmit={handleSubmit(onSubmit)} className='w-100'>
                <div>
                    <label htmlFor='newPassword' className='form-label'>
                        New password:<span className='text-danger'>*</span>
                    </label>
                    <input type='text' id='newPassword' className='form-control' {...register('newPassword')} />
                    {errors.newPassword && <p className='text-danger'>{errors.newPassword.message}</p>}
                </div>
                <div>
                    <label htmlFor='confirmNewPassword' className='form-label'>
                        Confirm New password:<span className='text-danger'>*</span>
                    </label>
                    <input type='text' id='confirmNewPassword' className='form-control' {...register('confirmNewPassword')} />
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
