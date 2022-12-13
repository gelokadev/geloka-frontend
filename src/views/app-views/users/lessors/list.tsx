import { Tag } from 'antd';
import { useHistory } from 'react-router-dom';
import Lessor from '../../../../models/Lessor';
import { SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import UserService from '../../../../services/users';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { NotificationPlacement } from 'antd/lib/notification';
import RejectRequestModal from './components/rejectRequestModal';
import Flex from '../../../../components/shared-components/Flex';
import { Card, Input, Table, Button, Modal, notification } from 'antd';
import PageHeaderAlt from '../../../../components/layout-components/PageHeaderAlt';

const { confirm } = Modal;

export const List = () => {

	const [search, setSearch] = useState<String>('');
	const [datas, setDatas] = useState<Lessor[]>([]);
	const [showRejectModal, setShowRejectModal] = useState<boolean>(false);
	const [selectedLessor, setSelectedLessor] = useState<Lessor|null>(null);

	const [api, contextHolder] = notification.useNotification();

	const openNotification = (placement: NotificationPlacement) => {
	  api.error({
		message: `Une erreur est survenue`,
		description:
		  'La raison du refus est obligatoire, veuillez la compléter!',
		placement,
	  });
	};

  	useEffect(() => {
    	getLessors();
  	}, []);

  	const getLessors = () => {
    	UserService.getLessors().then(response => {
			setDatas(response.data.map(elt => new Lessor(elt)));
    	});
  	};
	
  	const approveLessorRequest = (status: boolean, reason: string|null = null) => {

		if(selectedLessor === null) return;

		if(!status && !reason) {
			openNotification('topRight');
			return;
		}

		let data: any = {status};

		if(reason) data.reason = reason;

    	UserService.approveLessorRequest(selectedLessor?.reference, data).then(() => {
			getLessors();
    	}).finally(() => {
			setSelectedLessor(null);
			setShowRejectModal(false);
    	});
  	};
		
  	const changeLessorstatus = (lessor: Lessor) => {
		console.log(lessor);
		if(lessor === null) return;
    	UserService.changeLessorStatus(lessor?.reference).then(() => {
			getLessors();
    	}).finally(() => {
			setSelectedLessor(null);
    	});
  	};

  	const columns = [
		{
			title: "Noms & prénoms",
			dataIndex: 'title',
			render: (__: any, elm: Lessor) => (
				<div className="d-flex">
					<div className='ml-3'>
						<p className='font-weight-bold mb-0' style={{ color: 'black' }}>{elm.userInfo.fullName}</p>
					</div>
				</div>
			)
		},
		{
			title: "Email",
			dataIndex: 'description',
			render: (__: any, elm: Lessor) => (
				<div className="d-flex">
					<div className='ml-3'>
						<p className='font-weight-bold mb-0' style={{ color: 'black' }}>{elm.userInfo.email}</p>
					</div>
				</div>
			)
		},
		{
			title: "Téléphone",
			dataIndex: 'description',
			render: (__: any, elm: Lessor) => (
				<div className="d-flex">
					<div className='ml-3'>
						<p className='font-weight-bold mb-0' style={{ color: 'black' }}>{elm.userInfo.telephone}</p>
					</div>
				</div>
			)
		},
		{
			title: "Status",
			dataIndex: 'description',
			render: (__: any, elm: Lessor) => (
				<div className="d-flex">
					<div className='ml-3'>
						{
							elm.status === 'ACTIVE' ?
							<Tag color='blue'>Actif</Tag> :
							elm.status === 'SUSPENDED' ?
							<Tag color='volcano'>Suspendu</Tag> :
							elm.status === 'REJECTED' ?
							<Tag color='red'>Refusé</Tag> :
							<Tag color='orange'>En attente</Tag>
						}
						
					</div>
				</div>
			)
		},
		{
			title: "Date de création",
			dataIndex: 'createdAt',
			render: (__: any, elm: Lessor) => (
				<div className="d-flex">
					<div className='ml-3'>
						<p className='font-weight-bold mb-0' style={{ color: 'black' }}>{elm.getParsedDate()}</p>
					</div>
				</div>
			)
		},
		{
			title: "Actions",
			render: (__: any, elm: Lessor) => (
				<div className="d-flex">
					{ elm.status === 'PENDING' && (
						<div className='ml-3'>
							<Button
								type="primary"
								onClick={() => {
									setSelectedLessor(elm);
									showConfirm(true);
								}}
							>
								Approuver
							</Button>
							<Button
								danger
								className='ml-2'
								type="primary"
								onClick={() => {
									setShowRejectModal(true);
									setSelectedLessor(elm);
								}}
							>
								Refuser
							</Button>
						</div>
					)}
					{ elm.status === 'ACTIVE' && (
						<div className='ml-3'>
							<Button
								danger
								type="primary"
								onClick={() => {
									showConfirmStatusChanging(false, elm);
								}}
							>
								Suspendre
							</Button>
						</div>
					)}
					{ elm.status === 'SUSPENDED' && (
						<div className='ml-3'>
							<Button
								type="primary"
								onClick={() => {
									showConfirmStatusChanging(true, elm);
								}}
							>
								Activer
							</Button>
						</div>
					)}
				</div>
			)
		}
	];

	const showConfirm = (status: boolean) => {
		confirm({
		  	title: status ? 'Voulez-vous vraiment approuver ce bailleur?' : 'Voulez-vous vraiment refuser ce bailleur?',
		  	icon: <ExclamationCircleFilled />,
		  	content: 'Cette action est irreversible!',
		  	okText: 'Valider',
    		cancelText: 'Annuler',
		  	onOk() {
				approveLessorRequest(status, null);
		  	},
		  	onCancel() {},
		});
	};

	const showConfirmStatusChanging = (status: boolean, lessor: Lessor) => {
		confirm({
		  	title: status ? 'Voulez-vous vraiment activer ce bailleur?' : 'Voulez-vous vraiment suspendre ce bailleur?',
		  	icon: <ExclamationCircleFilled />,
		  	content: 'Changement du status du bailleur',
		  	okText: 'Valider',
    		cancelText: 'Annuler',
		  	onOk() {
				changeLessorstatus(lessor);
		  	},
		  	onCancel() {},
		});
	};

  	return (
		<React.Fragment>
			{contextHolder}
			<PageHeaderAlt className="border-bottom">
				<Flex className="py-2" mobileFlex={false}>
					<h2>Liste des bailleurs</h2>
				</Flex>
			</PageHeaderAlt>	
			<Card>
				<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
					<Flex className="mb-1" mobileFlex={false}>
						<div className="mr-md-3 mb-3 ml-3">
							<Input placeholder='Recherchez une catégorie' prefix={<SearchOutlined />} onChange={e => setSearch(e.target.value)} />
						</div>
					</Flex>
				</Flex>
				<div className="table-responsive">
					<Table
						rowKey='id'
						columns={columns}
						dataSource={datas.filter(d => d.userInfo.fullName.toLowerCase().includes(search.toLowerCase()))}
					/>
				</div>
			</Card>
			<RejectRequestModal visible={showRejectModal} handleOk={(reason: string | null) => {
				approveLessorRequest(false, reason);
			}}  handleCancel={() => setShowRejectModal(false)} />
		</React.Fragment>	
  	)
}

export default List;