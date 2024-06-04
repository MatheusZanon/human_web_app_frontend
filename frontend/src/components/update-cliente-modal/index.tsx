import { cnpjFormatter, cpfFormatter, formatCellphone, formatCnpj, formatCpf, phoneFormatter } from '@/libs';
import styles from './update-cliente-modal.module.scss';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useClienteProfileCard } from './cliente-profile-card-provider';
import { useUpdateCliente } from '@/api/http/clientes_financeiro';
import { Pen } from 'lucide-react';
import {
    BaseModalBody,
    BaseModalCloseButton,
    BaseModalConfirmationButton,
    BaseModalContent,
    BaseModalFooter,
    BaseModalHeader,
    BaseModalProvider,
    BaseModalRoot,
    BaseModalTitle,
    BaseModalTrigger,
} from '../baseModal';

const UpdateClienteModal: React.FC = () => {
    const { cliente } = useClienteProfileCard();

    const updateClienteSchema = z.object({
        nome_razao_social: z.string().min(1, 'Este campo é obrigatório'),
        nome_fantasia: z.string().min(1, 'Este campo é obrigatório'),
        email: z.string().email('Email inválido'),
        cnpj: z.union([z.string().length(18, 'CNPJ inválido'), z.string().length(0, 'CNPJ inválido')]),
        cpf: z.union([z.string().length(14, 'CPF inválido'), z.string().length(0, 'CPF inválido')]),
        phone: z
            .string()
            .trim()
            .regex(/^(\(?\d{2}\)?\s?)?(\d{5})-?(\d{4})$/, 'Formato de telefone inválido. Use o formato (XX) XXXXX-XXXX')
            .min(1, 'Este campo é obrigatório'),
        regiao: z.string().min(1, 'Este campo é obrigatório'),
    });

    const updateClienteSchemaWithRequired = updateClienteSchema.refine(
        (data) => {
            const hasCNPJ = Boolean(data?.cnpj);
            const hasCPF = Boolean(data?.cpf);

            // Deve ter pelo menos um deles preenchido
            if (!hasCNPJ && !hasCPF) {
                return false; // Se ambos estiverem vazios, a condição falha
            }

            // Se ambos estiverem preenchidos, também é uma falha
            if (hasCNPJ && hasCPF) {
                return false;
            }

            return true; // Se apenas um estiver preenchido, a condição é verdadeira
        },
        {
            message: 'Preencha apenas um dos campos: CNPJ ou CPF.',
            path: ['cpf'], // Exibe a mensagem para ambos os campos
        },
    );

    type UpdateClienteType = z.infer<typeof updateClienteSchemaWithRequired>;

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<UpdateClienteType>({
        resolver: zodResolver(updateClienteSchemaWithRequired),
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

    const handleCNPJChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedCNPJ = cnpjFormatter(event.target.value);
        setValue('cnpj', formattedCNPJ);
    };

    const handleCPFChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedCPF = cpfFormatter(event.target.value);
        setValue('cpf', formattedCPF);
    };

    const { mutate: updateCliente, isPending: isUpdateClientePending, error: UpdateClienteError } = useUpdateCliente();

    const onSubmit = ({ cnpj, cpf, email, nome_razao_social, nome_fantasia, phone, regiao }: UpdateClienteType) => {
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

        if (cliente?.nome_fantasia !== nome_fantasia) {
            updatedValues.nome_fantasia = nome_fantasia;
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
    };

    return (
        <BaseModalProvider>
            <BaseModalTrigger modalKey='atualizar-cliente'>
                <Pen size={18} />
                Editar
            </BaseModalTrigger>
            <BaseModalRoot modalKey='atualizar-cliente'>
                <BaseModalContent>
                    <BaseModalHeader>
                        <BaseModalTitle>Editar dados do cliente</BaseModalTitle>
                    </BaseModalHeader>
                    <BaseModalBody>
                        <form className='d-flex flex-column gap-2 w-100 h-100 px-1 overflow-auto'>
                            <div className='d-flex flex-column w-100'>
                                <label htmlFor='razao_social' className='form-label'>
                                    Razão Social:
                                </label>
                                <input
                                    type='text'
                                    id='razao_social'
                                    className='form-control'
                                    {...register('nome_razao_social')}
                                    defaultValue={cliente?.nome_razao_social}
                                />
                                {errors.nome_razao_social && (
                                    <p className='text-danger'>{errors.nome_razao_social.message?.toString()}</p>
                                )}
                            </div>
                            <div className='d-flex flex-column w-100'>
                                <label htmlFor='nome_fantasia' className='form-label'>
                                    Nome Fantasia:
                                </label>
                                <input
                                    type='text'
                                    id='nome_fantasia'
                                    className='form-control'
                                    {...register('nome_fantasia')}
                                    defaultValue={cliente?.nome_fantasia}
                                />
                                {errors.nome_fantasia && (
                                    <p className='text-danger'>{errors.nome_fantasia.message?.toString()}</p>
                                )}
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
                                <label htmlFor='regiao' className='form-label'>
                                    Região:
                                </label>
                                <input
                                    type='text'
                                    id='regiao'
                                    className='form-control'
                                    {...register('regiao')}
                                    defaultValue={cliente?.regiao}
                                />
                                {errors.regiao && <p className='text-danger'>{errors.regiao.message?.toString()}</p>}
                            </div>
                            <div className='d-flex flex-column w-100'>
                                <label htmlFor='cnpj' className='form-label'>
                                    CNPJ:
                                </label>
                                <input
                                    type='text'
                                    id='cnpj'
                                    className='form-control'
                                    {...register('cnpj')}
                                    onChange={handleCNPJChange}
                                    placeholder='00.000.000/0000-00'
                                    defaultValue={cliente?.cnpj && formatCnpj(cliente.cnpj)}
                                />
                                {errors.cnpj && <p className='text-danger'>{errors.cnpj?.message}</p>}
                            </div>
                            <div className='d-flex flex-column w-100'>
                                <label htmlFor='cpf' className='form-label'>
                                    CPF:
                                </label>
                                <input
                                    type='text'
                                    id='cpf'
                                    className='form-control'
                                    {...register('cpf')}
                                    onChange={handleCPFChange}
                                    placeholder='000.000.000-00'
                                    defaultValue={cliente?.cpf && formatCpf(cliente.cpf)}
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
                        </form>
                    </BaseModalBody>
                    <BaseModalFooter>
                        <BaseModalConfirmationButton onClick={handleSubmit(onSubmit)} disabled={isUpdateClientePending}>Salvar</BaseModalConfirmationButton>
                        <BaseModalCloseButton>Cancelar</BaseModalCloseButton>
                    </BaseModalFooter>
                </BaseModalContent>
            </BaseModalRoot>
        </BaseModalProvider>
        /*editMode && (
            <div className={`${styles.modalWrapper}`}>
                <div className={`${styles.modalContent} p-4 gap-2`}>
                    <div className='d-flex w-100 justify-content-end align-items-center'>
                        <button className='btn' type='button' onClick={handleEditMode}>
                            <X size={18} />
                        </button>
                    </div>
                    <form className='d-flex flex-column gap-2 w-100 h-100 px-1 overflow-auto'>
                        <div className='d-flex flex-column w-100'>
                            <label htmlFor='razao_social' className='form-label'>
                                Razão Social:
                            </label>
                            <input
                                type='text'
                                id='razao_social'
                                className='form-control'
                                {...register('nome_razao_social')}
                                defaultValue={cliente?.nome_razao_social}
                            />
                            {errors.nome_razao_social && (
                                <p className='text-danger'>{errors.nome_razao_social.message?.toString()}</p>
                            )}
                        </div>
                        <div className='d-flex flex-column w-100'>
                            <label htmlFor='nome_fantasia' className='form-label'>
                                Nome Fantasia:
                            </label>
                            <input
                                type='text'
                                id='nome_fantasia'
                                className='form-control'
                                {...register('nome_fantasia')}
                                defaultValue={cliente?.nome_fantasia}
                            />
                            {errors.nome_fantasia && (
                                <p className='text-danger'>{errors.nome_fantasia.message?.toString()}</p>
                            )}
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
                            <label htmlFor='regiao' className='form-label'>
                                Região:
                            </label>
                            <input
                                type='text'
                                id='regiao'
                                className='form-control'
                                {...register('regiao')}
                                defaultValue={cliente?.regiao}
                            />
                            {errors.regiao && <p className='text-danger'>{errors.regiao.message?.toString()}</p>}
                        </div>
                        <div className='d-flex flex-column w-100'>
                            <label htmlFor='cnpj' className='form-label'>
                                CNPJ:
                            </label>
                            <input
                                type='text'
                                id='cnpj'
                                className='form-control'
                                {...register('cnpj')}
                                onChange={handleCNPJChange}
                                placeholder='00.000.000/0000-00'
                                defaultValue={cliente?.cnpj && formatCnpj(cliente.cnpj)}
                            />
                            {errors.cnpj && <p className='text-danger'>{errors.cnpj?.message}</p>}
                        </div>
                        <div className='d-flex flex-column w-100'>
                            <label htmlFor='cpf' className='form-label'>
                                CPF:
                            </label>
                            <input
                                type='text'
                                id='cpf'
                                className='form-control'
                                {...register('cpf')}
                                onChange={handleCPFChange}
                                placeholder='000.000.000-00'
                                defaultValue={cliente?.cpf && formatCpf(cliente.cpf)}
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
                            type='button'
                            onClick={handleSubmit(onSubmit)}
                            disabled={isUpdateClientePending}
                        >
                            Salvar
                        </button>
                    </form>
                </div>
            </div>
        )*/
    );
};

export { UpdateClienteModal };
