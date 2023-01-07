import House from '../../../models/house/House';
import React, { useEffect, useState } from 'react';
import { HOUSE } from '../../../constants/FrontendUrl';
import { useHistory, useParams } from 'react-router-dom';
import HouseService from '../../../services/houses/self';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { NotificationPlacement } from 'antd/lib/notification';
import Flex from '../../../components/shared-components/Flex';
import { MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Card, notification, Row, Col, Button, Modal } from 'antd';
import MasonryImages from '../../../components/util-components/MasonryImages';
import PageHeaderAlt from '../../../components/layout-components/PageHeaderAlt';

const { confirm } = Modal;


export const Details = () => {

    let history = useHistory();
    const { reference }: any = useParams();
	const [house, setHouse] = useState<House | null>(null);
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
    	getHouse();
  	}, []);

  	const getHouse = () => {
    	HouseService.findHouse(reference).then(response => {
            console.log(response.data);
            console.log(new House(response.data));
			setHouse(new House(response.data));
    	}).catch((err) => {
            console.log(err);
            history.push(HOUSE.LIST);
        });
  	};

	const validateHouse = (status: boolean) => {
    	HouseService.validateHouse(reference, {status, reason: null}).then(response => {
            console.log(response.data);
            console.log(new House(response.data));
			setHouse(new House(response.data));
    	}).catch((err) => {
            console.log(err);
            history.push(HOUSE.LIST);
        });
  	};

	const showConfirmStatusChanging = (status: boolean) => {
		confirm({
		  	title: status ? 'Voulez-vous vraiment activer ce logement?' : 'Voulez-vous vraiment suspendre ce logement?',
		  	icon: <ExclamationCircleFilled />,
		  	content: 'Changement du status du logement',
		  	okText: 'Valider',
    		cancelText: 'Annuler',
		  	onOk() {
				validateHouse(status);
		  	},
		  	onCancel() {},
		});
	};

  	return (
		<React.Fragment>
			{contextHolder}
			<PageHeaderAlt className="border-bottom">
				<Flex className="py-2" mobileFlex={false}>
					<h2>Details de logements</h2>
				</Flex>
			</PageHeaderAlt>	
			<Card>
				<div className="table-responsive container-fluid">
                    <MasonryImages />
                    <div className='d-flex justify-content-between mt-2 row'>
                        <div>
                            <h1><b>{house?.title}</b></h1>
                            <span>{house?.category.title}</span> &nbsp; &#x2022; &nbsp;
                            <span>{house?.lounges} salons</span> &nbsp; &#x2022; &nbsp;
                            <span>{house?.rooms} chambres </span> &nbsp; &#x2022; &nbsp;
                            <span>{house?.baths} douches</span>
                        </div>
                        <div>
                            <p>Proposé par</p> <p>{house?.lessor?.firstName+' '+house?.lessor?.lastName}</p>
                        </div>
                    </div>

					<Row gutter={16} className="mt-5">
						<Col xs={24} sm={24} md={18}>
                            <p>{house?.description}</p>
                        </Col>
                        <Col xs={24} sm={24} md={6}>
							<h2 className='text-right'><b>{house?.getPriceRange()}</b></h2>
                        </Col>
                    </Row>

					<Row gutter={16} className="mt-3">
						<Col xs={24} sm={24} md={18}>
							<span><StarOutlined /> {house?.stars} étoiles</span> &nbsp; &#x2022; &nbsp;
							<span><MessageOutlined /> {house?.commentCount} commentaires</span>
                        </Col>
                        <Col xs={24} sm={24} md={6} className='d-flex'>
							<Button
								danger
								type="primary"
								onClick={() => {
									showConfirmStatusChanging(false);
								}}
							>
								Suspendre le logement
							</Button>
							<Button
								type="primary"
								className='ml-1'
								onClick={() => {
									showConfirmStatusChanging(true);
								}}
							>
								Activer le logement
							</Button>
                        </Col>
                    </Row>
				</div>
			</Card>
		</React.Fragment>	
  	)
}

export default Details;