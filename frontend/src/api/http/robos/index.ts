import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/utils/queryClient';
import { getRobos } from './getRobos';
import { getRoboById } from './getRoboById';
import { getRoboParametrosById } from './getRoboParametrosById';
import { postRobos } from './postRobos';
import { deleteRobos } from './deleteRobos';
import { postExecutarRobo, type RoboParametrosType } from './postExecutarRobo';
import { getRoboRotinasById } from './getRoboRotinasById';
import { CriarRoboType } from '@/utils/types/criar_robo';
import { postParametros } from './postParametros';
import { CriarParametroType } from '@/utils/types/criar_parametro';
import { CriarRotinaType } from '@/utils/types/criar_rotina';
import { postRotinas } from './postRotinas';
import { deleteParametros } from './deleteParametros';
import { IAppError } from '@/utils/types/app_error';
import { putParametros } from './putParametros';
import { deleteRotina } from './deleteRotinas';
import { putRotinas } from './putRotinas';
export type { RoboParametrosType } from './postExecutarRobo';

export function useRobos() {
    return useQuery({
        queryKey: ['robos'],
        queryFn: () => getRobos(),
    });
}

export function useRoboById({ roboId }: { roboId: string }) {
    return useQuery({
        queryKey: [`robo/${roboId}`],
        queryFn: () => getRoboById({ robo_id: roboId }),
        enabled: !!roboId,
    });
}

export function useRoboParametrosById({ roboId }: { roboId: string }) {
    return useQuery({
        queryKey: [`robo/${roboId}/parametros/listar`],
        queryFn: () => getRoboParametrosById({ robo_id: roboId }),
        enabled: !!roboId,
    });
}

export function useCreateRobo() {
    return useMutation({
        mutationKey: ['robos'],
        mutationFn: (data: CriarRoboType) => {
            return postRobos(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['robos'] });
        },
        onError: (err: IAppError) => err,
    });
}

export function useDeleteRobo() {
    return useMutation({
        mutationKey: ['robos'],
        mutationFn: (id: number) => {
            return deleteRobos(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['robos'] });
        },
        onError: (err: IAppError) => err,
    });
}

export function useExecutarRobo({ roboId }: { roboId: string }) {
    return useMutation({
        mutationKey: [`robo/${roboId}/executar`],
        mutationFn: (data: RoboParametrosType) => {
            return postExecutarRobo({ roboId, data });
        },
        onError: (err: IAppError) => err,
    });
}

export function useCriarParametro({ roboId }: { roboId: string }) {
    return useMutation({
        mutationKey: [`robo/${roboId}/parametros/criar/`],
        mutationFn: (data: CriarParametroType) => {
            return postParametros(parseInt(roboId), data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`robo/${roboId}/parametros/listar`] });
        },
        onError: (err: IAppError) => err,
    });
}

export function useCriarRotina({ roboId }: { roboId: string }) {
    return useMutation({
        mutationKey: [`robo/${roboId}/rotinas/criar/`],
        mutationFn: (data: CriarRotinaType) => {
            return postRotinas(parseInt(roboId), data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`robo/${roboId}/rotinas/listar`] });
        },
        onError: (err: IAppError) => err,
    });
}

export function useAlterarParametro({ roboId }: { roboId: string }) {
    return useMutation({
        mutationKey: [`robo/${roboId}/parametros/atualizar/`],
        mutationFn: ({parametroId, data}: { parametroId: number; data: RoboParametrosType }) => {
            return putParametros({ roboId: parseInt(roboId), parametroId, data });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`robo/${roboId}/parametros/listar`] });
        },
        onError: (err: IAppError) => err,
    });
}

export function useAlterarRotina({ roboId }: { roboId: string }) {
    return useMutation({
        mutationKey: [`robo/${roboId}/rotinas/atualizar/`],
        mutationFn: ({rotinaId, data}: { rotinaId: number; data: CriarRotinaType }) => {
            return putRotinas({ roboId: parseInt(roboId), rotinaId, data });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`robo/${roboId}/rotinas/listar`] });
        },
        onError: (err: IAppError) => err,
    });
}

export function useDeleteParametro({ roboId }: { roboId: string }) {
    return useMutation({
        mutationKey: [`robo/${roboId}/parametros/excluir/`],
        mutationFn: (parametroId: number) => {
            return deleteParametros(parseInt(roboId), parametroId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`robo/${roboId}/parametros/listar`] });
        },
        onError: (err: IAppError) => err,
    });
}

export function useDeleteRotina({ roboId }: { roboId: string }) {
    return useMutation({
        mutationKey: [`robo/${roboId}/rotinas/excluir/`],
        mutationFn: (rotinaId: number) => {
            return deleteRotina(parseInt(roboId), rotinaId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`robo/${roboId}/rotinas/listar`] });
        },
        onError: (err: IAppError) => err,
    });
}

export function useGetRoboRotinasById({ roboId }: { roboId: string }) {
    return useQuery({
        queryKey: [`robo/${roboId}/rotinas/listar`],
        queryFn: () => getRoboRotinasById({ robo_id: roboId }),
        enabled: !!roboId,
    });
}
