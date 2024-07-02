import { useState } from 'react';
import styles from './vales-sst-modal.module.scss';
import { FinanceiroValesSST } from '@/utils/types/dashboard/financeiro_vales_sst';
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
} from '@/components/baseModal';
import { Pencil } from 'lucide-react';

interface ModalProps {
    vale: FinanceiroValesSST;
    onUpdate: (vale: FinanceiroValesSST) => void;
}

const ValesSSTModal: React.FC<ModalProps> = ({ vale, onUpdate }) => {
    // @ts-expect-error setNome não é utilizado no momento
    const [nome, setNome] = useState<string>(vale.nome_razao_social);
    const [valeTransporte, setValeTransporte] = useState<number>(vale.vale_transporte);
    const [assinaturaEletronica, setAssinaturaEletronica] = useState<number>(vale.assinat_eletronica);
    const [valeRefeicao, setValeRefeicao] = useState<number>(vale.vale_refeicao);
    const [pontoEletronico, setPontoEletronico] = useState<number>(vale.mensal_ponto_elet);
    const [saudeSeguranca, setSaudeSeguranca] = useState<number>(vale.saude_seguranca_trabalho);

    const handleSubmit = (): void => {
        // Aqui você incluiria o código para enviar os dados atualizados para a API
        const updatedVale = {
            id: vale.id,
            nome_razao_social: nome,
            vale_transporte: valeTransporte,
            assinat_eletronica: assinaturaEletronica,
            vale_refeicao: valeRefeicao,
            mensal_ponto_elet: pontoEletronico,
            saude_seguranca_trabalho: saudeSeguranca,
            mes: vale.mes,
            ano: vale.ano,
        };
        onUpdate(updatedVale); // Esta função deverá atualizar os dados no estado superior ou na API
    };

    return (
        <BaseModalProvider>
            <BaseModalTrigger variant='warning' modalKey='editar-vale-sst'>
                <Pencil size={16} />
            </BaseModalTrigger>
            <BaseModalRoot modalKey='editar-vale-sst'>
                <BaseModalContent>
                    <BaseModalHeader>
                        <BaseModalTitle>Editar Vale/SST</BaseModalTitle>
                    </BaseModalHeader>
                    <BaseModalBody>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <label className={styles.label}>
                                Nome/Razão Social:
                                <span className='d-block fw-normal'>{vale.nome_razao_social}</span>
                            </label>
                            <label className={styles.label}>
                                Vale Transporte:
                                <input
                                    type='number'
                                    className='form-control'
                                    value={valeTransporte}
                                    onChange={(e) => setValeTransporte(parseFloat(e.target.value))}
                                />
                            </label>
                            <label className={styles.label}>
                                Assinatura Eletrônica:
                                <input
                                    type='number'
                                    className='form-control'
                                    value={assinaturaEletronica}
                                    onChange={(e) => setAssinaturaEletronica(parseFloat(e.target.value))}
                                />
                            </label>
                            <label className={styles.label}>
                                Vale Refeição:
                                <input
                                    type='number'
                                    className='form-control'
                                    value={valeRefeicao}
                                    onChange={(e) => setValeRefeicao(parseFloat(e.target.value))}
                                />
                            </label>
                            <label className={styles.label}>
                                Ponto Eletrônico:
                                <input
                                    type='number'
                                    className='form-control'
                                    value={pontoEletronico}
                                    onChange={(e) => setPontoEletronico(parseFloat(e.target.value))}
                                />
                            </label>
                            <label className={styles.label}>
                                Saúde/Segurança do Trabalho:
                                <input
                                    type='number'
                                    className='form-control'
                                    value={saudeSeguranca}
                                    onChange={(e) => setSaudeSeguranca(parseFloat(e.target.value))}
                                />
                            </label>
                        </form>
                    </BaseModalBody>
                    <BaseModalFooter>
                        <BaseModalConfirmationButton onClick={handleSubmit}>Salvar</BaseModalConfirmationButton>
                        <BaseModalCloseButton>Fechar</BaseModalCloseButton>
                    </BaseModalFooter>
                </BaseModalContent>
            </BaseModalRoot>
        </BaseModalProvider>
        /*<div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={onClose}>&times;</span>
                <h2>Editar</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label className={styles.label}>
                        Nome/Razão Social:
                        <span className='d-block fw-normal'>{vale.nome_razao_social}</span>
                    </label>
                    <label className={styles.label}>
                        Vale Transporte:
                        <input type="number" className='form-control' value={valeTransporte} onChange={e => setValeTransporte(parseFloat(e.target.value))} />
                    </label>
                    <label className={styles.label}>
                        Assinatura Eletrônica:
                        <input type="number" className='form-control' value={assinaturaEletronica} onChange={e => setAssinaturaEletronica(parseFloat(e.target.value))} />
                    </label>
                    <label className={styles.label}>
                        Vale Refeição:
                        <input type="number" className='form-control' value={valeRefeicao} onChange={e => setValeRefeicao(parseFloat(e.target.value))} />
                    </label>
                    <label className={styles.label}>
                        Ponto Eletrônico:
                        <input type="number" className='form-control' value={pontoEletronico} onChange={e => setPontoEletronico(parseFloat(e.target.value))} />
                    </label>
                    <label className={styles.label}>
                        Saúde/Segurança do Trabalho:
                        <input type="number" className='form-control' value={saudeSeguranca} onChange={e => setSaudeSeguranca(parseFloat(e.target.value))} />
                    </label>
                    <button type="submit" className='btn btn-primary'>Salvar Alterações</button>
                </form>
            </div>
        </div>*/
    );
};

export default ValesSSTModal;
