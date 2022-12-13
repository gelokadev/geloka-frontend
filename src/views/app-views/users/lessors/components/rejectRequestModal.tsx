import React, { useState } from 'react';
import { Modal, Input } from 'antd';

const { TextArea } = Input;

interface IProps {
    visible: boolean,
    handleCancel: () => void,
    handleOk: (reason: string|null) => void
}

const RejectRequestModal: React.FC<IProps> = ({ visible, handleOk, handleCancel }) => {

    const [reason, setReason] = useState<string|null>(null);

    return (
        <Modal title="Refus de la requête du bailleur" visible={visible} onOk={() => handleOk(reason)} onCancel={handleCancel}>
            <p>Vous allez refuser la requête de devenir bailleur, quelle est la raison de ce refus?</p>
            <TextArea rows={4} placeholder="Raison du refus" onChange={(e) => setReason(e.target.value)} />
        </Modal>
    );
};

export default RejectRequestModal;