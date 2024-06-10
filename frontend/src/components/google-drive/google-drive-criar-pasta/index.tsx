import {
    BaseModalBody,
    BaseModalContent,
    BaseModalHeader,
    BaseModalRoot,
    BaseModalTitle,
    BaseModalFooter,
    BaseModalConfirmationButton
    } from '@/components/baseModal';

const CriarPasta = () => {
    return (
        <BaseModalRoot modalKey='criar_pasta'>
            <BaseModalContent>
                <BaseModalHeader>
                    <BaseModalTitle>Nova Pasta</BaseModalTitle>
                </BaseModalHeader>
                <BaseModalBody>
                    <form className='d-flex flex-column gap-2 w-100 h-100 px-1 pb-1'>
                        <div className='d-flex flex-column w-100'>
                            <input type="text" className='form-control' placeholder='Nome da pasta' />
                        </div>
                    </form>
                </BaseModalBody>
                <BaseModalFooter>
                    <BaseModalConfirmationButton>Criar</BaseModalConfirmationButton>
                </BaseModalFooter>
            </BaseModalContent>
        </BaseModalRoot>
    )
}

export default CriarPasta;