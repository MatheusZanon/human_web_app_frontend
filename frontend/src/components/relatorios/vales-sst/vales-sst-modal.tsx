import { useState } from 'react';
import styles from './vales-sst-modal.module.scss';
import { FinanceiroValesSST } from '@/utils/types/financeiro_vales_sst';

interface ModalProps {
    vale: FinanceiroValesSST;
    onClose: () => void;
    onUpdate: (vale: FinanceiroValesSST) => void;
}

const ValesSSTModal: React.FC<ModalProps> = ({ vale, onClose, onUpdate }) => {
    const [nome, setNome] = useState<string>(vale.nome_razao_social);
    const [valeTransporte, setValeTransporte] = useState<number>(vale.vale_transporte);
    const [assinaturaEletronica, setAssinaturaEletronica] = useState<number>(vale.assinat_eletronica);
    const [valeRefeicao, setValeRefeicao] = useState<number>(vale.vale_refeicao);
    const [pontoEletronico, setPontoEletronico] = useState<number>(vale.mensal_ponto_elet);
    const [saudeSeguranca, setSaudeSeguranca] = useState<number>(vale.saude_seguranca_trabalho);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
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
            ano: vale.ano
        };
        onUpdate(updatedVale); // Esta função deverá atualizar os dados no estado superior ou na API
        onClose();  // Fechar o modal após a submissão
    };

    return (
        <div className={styles.modal}>
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
        </div>
    );
}

export default ValesSSTModal;
