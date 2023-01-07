import { useHistory } from 'react-router-dom';
import House from '../../../models/house/House';
import UserService from '../../../services/users';
import { SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { HOUSE } from '../../../constants/FrontendUrl';
import HouseService from '../../../services/houses/self';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { NotificationPlacement } from 'antd/lib/notification';
import Flex from '../../../components/shared-components/Flex';
import RejectRequestModal from './components/rejectRequestModal';
import { Card, Input, Table, Button, Modal, notification, Tag } from 'antd';
import PageHeaderAlt from '../../../components/layout-components/PageHeaderAlt';

const { confirm } = Modal;

export const List = () => {

	let history = useHistory();

	const [datas, setDatas] = useState<House[]>([]);
	const [search, setSearch] = useState<String>('');
	const [selectedHouse, setSelectedHouse] = useState<House|null>(null);
	const [showRejectModal, setShowRejectModal] = useState<boolean>(false);

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
    	getHouses();
  	}, []);

  	const getHouses = () => {
    	HouseService.getHouses().then(response => {
            console.log(response.data.content.map(elt => new House(elt)));
			setDatas(response.data.content.map(elt => new House(elt)));
    	});
  	};
	
  	const approveLessorRequest = (status: boolean, reason: string|null = null) => {

		if(selectedHouse === null) return;

		if(!status && !reason) {
			openNotification('topRight');
			return;
		}

		let data: any = {status};

		if(reason) data.reason = reason;

    	UserService.approveLessorRequest(selectedHouse?.reference, data).then(() => {
			getHouses();
    	}).finally(() => {
			setSelectedHouse(null);
			setShowRejectModal(false);
    	});
  	};
		
  	const changeHouseStatus = (house: House) => {
		console.log(house);
		if(house === null) return;
    	// UserService.changehouseStatus(house?.reference).then(() => {
		// 	getHouses();
    	// }).finally(() => {
		// 	setSelectedHouse(null);
    	// });
  	};

  	const columns = [
		{
			title: "Titre",
			dataIndex: 'title',
			render: (__: any, elm: House) => (
				<div className="d-flex">
					<div className='ml-3 d-flex justify-content-center align-items-center'>
                        <img src={elm.image} alt={elm.title+' title'} width={40} height={40} />
						<p className='font-weight-bold mb-0 ml-3' style={{ color: 'black' }}>{elm.title}</p>
					</div>
				</div>
			)
		},
        {
			title: "Prix",
			dataIndex: 'price',
			render: (__: any, elm: House) => (
				<div className="d-flex">
					<div className='ml-3'>
						<p className='font-weight-bold mb-0' style={{ color: 'black' }}>{elm.price} Fcfa</p>
					</div>
				</div>
			)
		},
        {
			title: "Adresse",
			dataIndex: 'address',
			render: (__: any, elm: House) => (
				<div className="d-flex">
					<div className='ml-3'>
						<p className='font-weight-bold mb-0' style={{ color: 'black' }}>{elm.coordinate.address}</p>
					</div>
				</div>
			)
		},
        {
			title: "Catégorie",
			dataIndex: 'category',
			render: (__: any, elm: House) => (
				<div className="d-flex">
					<div className='ml-3'>
						<p className='font-weight-bold mb-0' style={{ color: 'black' }}>{elm.category.title}</p>
					</div>
				</div>
			)
		},
		{
			title: "Status",
			dataIndex: 'description',
			render: (__: any, elm: House) => (
				<div className="d-flex">
					<div className='ml-3'>
						{
							elm.enabled ?
							<Tag color='blue'>Actif</Tag> :
							<Tag color='volcano'>Suspendu</Tag>
						}
						
					</div>
				</div>
			)
		},
		{
			title: "Date de création",
			dataIndex: 'createdAt',
			render: (__: any, elm: House) => (
				<div className="d-flex">
					<div className='ml-3'>
						<p className='font-weight-bold mb-0' style={{ color: 'black' }}>{elm.getParsedDate()}</p>
					</div>
				</div>
			)
		},
		{
			title: "Actions",
			render: (__: any, elm: House) => (
				<div className="d-flex">
					<div className='ml-3'>
						<Button
							type="primary"
							onClick={() => {
								history.push(HOUSE.DETAILS.replace(':reference', elm.reference))
							}}
						>
							Détails
						</Button>
					</div>
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

	const showConfirmStatusChanging = (status: boolean, house: House) => {
		confirm({
		  	title: status ? 'Voulez-vous vraiment activer ce bailleur?' : 'Voulez-vous vraiment suspendre ce bailleur?',
		  	icon: <ExclamationCircleFilled />,
		  	content: 'Changement du status du bailleur',
		  	okText: 'Valider',
    		cancelText: 'Annuler',
		  	onOk() {
				changeHouseStatus(house);
		  	},
		  	onCancel() {},
		});
	};

  	return (
		<React.Fragment>
			{contextHolder}
			<PageHeaderAlt className="border-bottom">
				<Flex className="py-2" mobileFlex={false}>
					<h2>Liste des logements</h2>
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
						dataSource={datas.filter(d => d.title.toLowerCase().includes(search.toLowerCase()))}
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