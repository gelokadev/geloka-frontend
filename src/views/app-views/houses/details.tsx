import { Card, Row, Col, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { HOUSE } from '../../../constants/FrontendUrl';
import { useHistory, useParams } from 'react-router-dom';
import HouseService from '../../../services/houses/self';
import Flex from '../../../components/shared-components/Flex';
import ChangeStatusModal from './components/changeStatusModal';
import House, { HouseStatus } from '../../../models/house/House';
import MasonryImages from '../../../components/util-components/MasonryImages';
import PageHeaderAlt from '../../../components/layout-components/PageHeaderAlt';

export const Details = () => {

    let history = useHistory();
    const { reference }: any = useParams();
	const [house, setHouse] = useState<House | null>(null);
	const [isSuspension, setIsSuspension] = useState<boolean>(false);
	const [showStatusModal, setShowStatusModal] = useState<boolean>(false);

  	useEffect(() => {
    	getHouse();
  	}, []);

  	const getHouse = () => {
    	HouseService.findHouse(reference).then(response => {
			setHouse(new House(response.data));
    	}).catch(() => {
            history.push(HOUSE.LIST);
        });
  	};

	const validateHouse = (reason: string) => {
    	HouseService.validateHouse(reference, {status: !isSuspension, reason}).then(response => {
			getHouse();
    	}).catch(() => {
            history.push(HOUSE.LIST);
        }).finally(() => {
			setShowStatusModal(false);
			setIsSuspension(false);
		});
  	};

  	return (
		<React.Fragment>
			<PageHeaderAlt className="border-bottom">
				<Flex className="py-2" mobileFlex={false}>
					<h2>Details de logements</h2>
				</Flex>
			</PageHeaderAlt>	
			<Card>
				<div className="table-responsive container-fluid">
                    <MasonryImages medias={house?.medias ?? []} />
                    <div className='d-flex justify-content-between mt-2 row'>
                        <div>
                            <h1><b>{house?.title}</b></h1>
                            <span>Catégorie: {house?.category.title}</span> &nbsp; &#x2022; &nbsp;
                            <span>Salon: {house?.lounges}</span> &nbsp; &#x2022; &nbsp;
                            <span>Chambre: {house?.rooms} </span> &nbsp; &#x2022; &nbsp;
                            <span>Cuisine: {house?.kitchens} </span> &nbsp; &#x2022; &nbsp;
                            <span>Douche: {house?.baths}</span><br />
							<span className='mt-5'>Accessible {house?.getAccessibilities()}</span>
                        </div>
                        <div>
                            <p>{house?.lessor?.firstName+' '+house?.lessor?.lastName}</p>
                        </div>
                    </div>

					<Row gutter={16} className="mt-5">
						<Col xs={24} sm={24} md={18}>
                            <p>{house?.description}</p>
                        </Col>
                        <Col xs={24} sm={24} md={6} className='pl-10'>
							<h2><b>{house?.getPriceRange()}</b></h2>
							<Button
								danger
								type="primary"
								onClick={() => {
									window.open(`https://maps.google.com/?q=${house?.coordinate.latitude},${house?.coordinate.longitude}`, '_blank')
								}}
							>
								Voir sur la carte
							</Button>
                        </Col>
                    </Row>

					<Row gutter={16} className="mt-3">
						{/* <Col xs={24} sm={24} md={18}>
							<span><StarOutlined /> {house?.stars} étoiles</span> &nbsp; &#x2022; &nbsp;
							<span><MessageOutlined /> {house?.commentCount} commentaires</span>
                        </Col> */}
                        <Col xs={24} sm={24} md={6} className='d-flex'>
							{ house != null && [HouseStatus.PENDING, HouseStatus.RUNNING].includes(house?.status) && (
								<Button
									danger
									type="primary"
									onClick={() => {
										setIsSuspension(true);
										setShowStatusModal(true);
									}}
								>
									Suspendre le logement
								</Button>
							)}
							{ house != null && [HouseStatus.PENDING, HouseStatus.SUSPENDED].includes(house?.status) && (
								<Button
									type="primary"
									className='ml-1'
									onClick={() => {
										setIsSuspension(false);
										setShowStatusModal(true);
									}}
								>
									Activer le logement
								</Button>
							)}
                        </Col>
                    </Row>

					{house != null && showStatusModal && (
						<ChangeStatusModal
							visible={showStatusModal}
							status={!isSuspension}
							handleOk={(reason: string | null) => {
								validateHouse(reason ?? "Pas de raison spécifiée");
							}}
							handleCancel={() => setShowStatusModal(false)}
						/>
					)}
				</div>
			</Card>
		</React.Fragment>	
  	)
}

export default Details;