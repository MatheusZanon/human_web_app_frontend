import { formatCellphone } from '@/libs';
import styles from './update-cliente-modal.module.scss';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useClienteProfileCard } from './cliente-profile-card-provider';
import { useUpdateCliente } from '@/api/http/clientes_financeiro';

const UpdateClienteModal: React.FC = () => {
    const { cliente, editMode, handleEditMode } = useClienteProfileCard();

    const updateClienteSchema = z.object({
        nome_razao_social: z.string().min(1, 'Este campo é obrigatório'),
        email: z.string().min(1, 'Este campo é obrigatório'),
        cnpj: z.string().min(1, 'Este campo é obrigatório'),
        cpf: z.string().min(1, 'Este campo é obrigatório'),
        phone: z
            .string()
            .trim()
            .regex(/^(\(?\d{2}\)?\s?)?(\d{5})-?(\d{4})$/, 'Formato de telefone inválido. Use o formato (XX) XXXXX-XXXX')
            .min(1, 'Este campo é obrigatório'),
        regiao: z.string().min(1, 'Este campo é obrigatório'),
    });

    type UpdateClienteType = z.infer<typeof updateClienteSchema>;

    // Função para formatar o telefone no formato brasileiro
    const phoneFormatter = (phone: string) => {
        // Remover todos os caracteres não numéricos
        const cleanPhone = phone.replace(/\D/g, '');

        if (cleanPhone.length <= 2) {
            return cleanPhone;
        }

        // Adicionar parênteses ao DDD
        if (cleanPhone.length <= 7) {
            return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2)}`;
        }

        // Adicionar traço após o quinto dígito
        return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2, 7)}-${cleanPhone.slice(7)}`;
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<UpdateClienteType>({
        resolver: zodResolver(updateClienteSchema),
        mode: 'onChange',
        reValidateMode: 'onChange',
        criteriaMode: 'all',
        shouldUnregister: false,
        shouldFocusError: true,
        shouldUseNativeValidation: false,
        delayError: 500,
    });

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedPhone = phoneFormatter(event.target.value);
        setValue('phone', formattedPhone);
    };

    const { mutate: updateCliente, isPending: isUpdateClientePending, error: UpdateClienteError } = useUpdateCliente();

    const onSubmit = ({ cnpj, cpf, email, nome_razao_social, phone, regiao }: UpdateClienteType) => {
        const cleanedPhone = phone.replace(/\D/g, '');
        const currentPhone = cliente?.telefone_celular?.replace(/\D/g, '');
        const phoneToSave = cleanedPhone !== currentPhone ? cleanedPhone : null;
        const updatedValues: Partial<UpdateClienteType> = {};

        if (cliente?.email !== email) {
            updatedValues.email = email;
        }

        if (phoneToSave) {
            updatedValues.phone = phoneToSave;
        }

        if (cliente?.cnpj !== cnpj) {
            updatedValues.cnpj = cnpj;
        }

        if (cliente?.cpf !== cpf) {
            updatedValues.cpf = cpf;
        }

        if (cliente?.nome_razao_social !== nome_razao_social) {
            updatedValues.nome_razao_social = nome_razao_social;
        }

        if (cliente?.regiao !== regiao) {
            updatedValues.regiao = regiao;
        }

        updateCliente({ clienteId: cliente!.id, data: updatedValues });

        if (isUpdateClientePending) {
            toast.loading('Por favor, aguarde...');
        }

        if (!isUpdateClientePending) {
            toast.dismiss();
        }

        if (!isUpdateClientePending && !UpdateClienteError) {
            toast.success('Dados atualizados com sucesso!', {
                autoClose: 3000,
                position: 'bottom-right',
            });
        }

        if (!isUpdateClientePending && UpdateClienteError) {
            toast.error(`Erro ao atualizar dados! ${UpdateClienteError?.response?.data}`, {
                autoClose: 3000,
                position: 'bottom-right',
            });
        }

        handleEditMode();
    };

    return (
        editMode && (
            <div className={`${styles.modalWrapper}`}>
                <div className={`${styles.modalContent} p-4 gap-2`}>
                    <form className='d-flex flex-column gap-2 w-100 h-100 px-1 overflow-auto'>
                        <div className='d-flex flex-column w-100'>
                            <label htmlFor='username' className='form-label'>
                                Razão Social:
                            </label>
                            <input
                                type='text'
                                id='username'
                                className='form-control'
                                {...register('nome_razao_social')}
                                defaultValue={cliente?.nome_razao_social}
                            />
                            {errors.nome_razao_social && <p className='text-danger'>{errors.nome_razao_social.message?.toString()}</p>}
                        </div>
                        <div className='d-flex flex-column w-100'>
                            <label htmlFor='email' className='form-label'>
                                Email:
                            </label>
                            <input
                                type='text'
                                id='email'
                                className='form-control'
                                {...register('email')}
                                defaultValue={cliente?.email}
                            />
                            {errors.email && <p className='text-danger'>{errors.email.message?.toString()}</p>}
                        </div>
                        <div className='d-flex flex-column w-100'>
                            <label htmlFor='firstName' className='form-label'>
                                Região:
                            </label>
                            <input
                                type='text'
                                id='firstName'
                                className='form-control'
                                {...register('regiao')}
                                defaultValue={cliente?.regiao}
                            />
                            {errors.regiao && (
                                <p className='text-danger'>{errors.regiao.message?.toString()}</p>
                            )}
                        </div>
                        <div className='d-flex flex-column w-100'>
                            <label htmlFor='lastName' className='form-label'>
                                CNPJ:
                            </label>
                            <input
                                type='text'
                                id='lastName'
                                className='form-control'
                                {...register('cnpj')}
                                defaultValue={cliente?.cnpj}
                            />
                            {errors.cnpj && <p className='text-danger'>{errors.cnpj.message?.toString()}</p>}
                        </div>
                        <div className='d-flex flex-column w-100'>
                            <label htmlFor='lastName' className='form-label'>
                                CPF:
                            </label>
                            <input
                                type='text'
                                id='lastName'
                                className='form-control'
                                {...register('cpf')}
                                defaultValue={cliente?.cpf}
                            />
                            {errors.cpf && <p className='text-danger'>{errors.cpf.message?.toString()}</p>}
                        </div>
                        <div className='d-flex flex-column w-100'>
                            <label htmlFor='phone' className='form-label'>
                                Celular
                            </label>
                            <input
                                type='text'
                                id='phone'
                                className='form-control'
                                {...register('phone')}
                                onChange={handlePhoneChange}
                                defaultValue={formatCellphone(cliente?.telefone_celular || '00000000000')}
                            />
                            {errors.phone && <p className='text-danger'>{errors.phone.message?.toString()}</p>}
                        </div>
                        <button
                            className='btn btn-primary'
                            onClick={handleSubmit(onSubmit)}
                            disabled={isUpdateClientePending}
                        >
                            Salvar
                        </button>
                    </form>
                </div>
            </div>
        )
    );
};

export { UpdateClienteModal };
