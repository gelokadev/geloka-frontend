import React, { useState } from 'react';
import { Modal, Input } from 'antd';

const { TextArea } = Input;

interface IProps {
    visible: boolean,
    status: boolean,
    handleCancel: () => void,
    handleOk: (reason: string|null) => void
}

const ChangeStatusModal: React.FC<IProps> = ({ visible, status, handleOk, handleCancel }) => {

    const [reason, setReason] = useState<string|null>(null);

    return (
        <Modal title={`${status ? 'Ré-activation' : 'Suspension'} du logement`} visible={visible} onOk={() => handleOk(reason)} onCancel={handleCancel}>
            <p>Vous allez {`${status ? 'ré-activer' : 'suspendre'}`} ce logement, quelle est la raison de cette action?</p>
            <TextArea rows={4} placeholder={`Raison de la ${status ? 'ré-activation' : 'suspension'}`} onChange={(e) => setReason(e.target.value)} />
        </Modal>
    );
};

export default ChangeStatusModal;