import { useExecutarRobo, useRoboParametrosById, useGetRoboRotinasById } from '@/api/http/robos';
import { useAuthenticatedUser } from '@/contexts/AuthenticatedUser/AuthenticatedUserProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

function Parametros({ id }: { id: string }) {
    const { hasPermission } = useAuthenticatedUser();
    const {
        data: roboParametros,
        isLoading,
        isSuccess,
        isError,
        failureReason,
    } = useRoboParametrosById({
        roboId: id,
    });

    const { data: roboRotinas, isSuccess: isRoboRotinasSuccess } = useGetRoboRotinasById({ roboId: id ? id : '' });
    const createSchemaFromResponse = (response: typeof roboParametros) => {
        const schemaObject: Record<string, z.ZodType> = {};

        // Iterar sobre as chaves da resposta da API
        for (const key in response) {
            // eslint-disable-next-line no-prototype-builtins
            if (response.hasOwnProperty(key)) {
                const parametroInfo = response[key].parametro_info;
                const tipo = parametroInfo.tipo;

                // Definir o tipo do Zod com base no tipo do parâmetro
                switch (tipo) {
                    case 'TEXT' || 'DATE':
                        schemaObject[parametroInfo.nome] = z.string().min(1, 'Este campo é obrigatório');
                        break;
                    case 'NUMBER':
                        schemaObject[parametroInfo.nome] = z
                            .number({
                                invalid_type_error: 'Por favor digite um número',
                            })
                            .min(1, 'Este campo é obrigatório');
                        break;
                    // Adicione outros casos conforme necessário
                    default:
                        schemaObject[parametroInfo.nome] = z.unknown(); // Se o tipo não for reconhecido, aceitamos qualquer tipo
                        break;
                }
            }
        }

        return z.object(schemaObject);
    };

    const RoboParametrosSchema = createSchemaFromResponse(roboParametros);
    type RoboParametrosType = z.infer<typeof RoboParametrosSchema>;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RoboParametrosType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        criteriaMode: 'all',
        shouldUnregister: false,
        shouldFocusError: true,
        shouldUseNativeValidation: false,
        delayError: 500,
        defaultValues: roboParametros
            ? Object.fromEntries(
                  roboParametros.map((parametro) => [parametro?.parametro_info?.nome ?? '', parametro?.valor ?? '']),
              )
            : {},
        resolver: zodResolver(RoboParametrosSchema),
    });

    const { mutate: executarRobo } = useExecutarRobo({
        roboId: id,
    });

    const onSubmit = (data: RoboParametrosType) => {
        executarRobo(data);
    };

    return (
        <>
            {isLoading && <div>Loading...</div>}
            {isSuccess && roboParametros ? (
                <form className='d-flex flex-column gap-2'>
                    {roboParametros?.map((parametro) => (
                        <div key={parametro.id}>
                            <label className='form-label'>{parametro.parametro_info.nome}</label>
                            <input
                                type={parametro.parametro_info.tipo.toLowerCase()}
                                defaultValue={
                                    parametro.parametro_info.tipo.toLowerCase() === 'date'
                                        ? parametro?.valor
                                        : parametro?.valor
                                }
                                {...register(parametro.parametro_info.nome)}
                                className='form-control'
                            />
                            {errors[parametro.parametro_info.nome] ? (
                                <small className='text-danger'>
                                    {errors[parametro.parametro_info.nome]?.message as string}
                                </small>
                            ) : null}
                        </div>
                    ))}

                    {isRoboRotinasSuccess && (
                        <div>
                            <label className='form-label'>Rotina</label>
                            <select id='rotinas' className='form-select' defaultValue='' {...register('rotina')}>
                                <option value=''>Selecione uma rotina</option>
                                {roboRotinas.map((rotina) => (
                                    <option key={rotina.id} value={rotina.nome}>
                                        {rotina.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    <div>
                        {hasPermission('Can change robos') && (
                            <button onClick={handleSubmit(onSubmit)} className='btn btn-primary'>
                                Executar
                            </button>
                        )}
                    </div>
                </form>
            ) : null}
            {isError && (
                <div>
                    Error <pre>{JSON.stringify(failureReason, null, 2)}</pre>
                </div>
            )}
        </>
    );
}

export default Parametros;
