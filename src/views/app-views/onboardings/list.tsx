import { useHistory } from 'react-router-dom';
import { Card, Input, Table, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { HOUSE, ONBOARDING } from '../../../constants/FrontendUrl';
import Flex from '../../../components/shared-components/Flex';
import CommodityService from '../../../services/houses/commodities';
import CommodityCategory from '../../../models/house/CommodityCategory';
import PageHeaderAlt from '../../../components/layout-components/PageHeaderAlt';
import Onboarding from '../../../models/Onboarding';
import SystemService from '../../../services/systems';

export const List = () => {

	let history = useHistory();

	const [search, setSearch] = useState<String>('');
  	const [datas, setDatas] = useState<Onboarding[]>([]);

  	useEffect(() => {
    	getOnboardings();
  	}, []);

  	const getOnboardings = () => {
    	SystemService.getOnboardings().then(response => {
			setDatas(response.data.map(elt => new Onboarding(elt)));
    	}).finally(() => {

    	});
  	};

  	const columns = [
		{
			title: "Titre français",
			dataIndex: 'titleFr',
			render: (__: any, elm: Onboarding) => (
				<div className="d-flex">
					<div className='ml-3'>
						<p className='font-weight-bold mb-0' style={{ color: 'black' }}>{elm?.titleFr}</p>
					</div>
				</div>
			)
		},
		{
			title: "Titre anglais",
			dataIndex: 'titleEn',
			render: (__: any, elm: Onboarding) => (
				<div className="d-flex">
					<div className='ml-3'>
						<p className='font-weight-bold mb-0' style={{ color: 'black' }}>{elm?.titleEn}</p>
					</div>
				</div>
			)
		},
		{
			title: "Date de création",
			dataIndex: 'createdAt',
			render: (__: any, elm: Onboarding) => (
				<div className="d-flex">
					<div className='ml-3'>
						<p className='font-weight-bold mb-0' style={{ color: 'black' }}>{elm.getParsedDate()}</p>
					</div>
				</div>
			)
		},
		{
			title: "Actions",
			render: (__: any, elm: Onboarding) => (
				<div className="d-flex">
					<div className='ml-3'>
						<Button
							type="primary"
							onClick={() => history.push(ONBOARDING.UPDATE.replace(':reference', elm.id))}
						>
							Editer
						</Button>
					</div>
				</div>
			)
		}
	];

  	return (
		<React.Fragment>
			<PageHeaderAlt className="border-bottom">
				<Flex className="py-2" mobileFlex={false}>
					<h2>Liste des onboardings</h2>
				</Flex>
			</PageHeaderAlt>	
			<Card>
				<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
					<Flex className="mb-1" mobileFlex={false}>
						<Button type="primary" onClick={() => {
							history.push(ONBOARDING.CREATE);
						}}>
							Ajouter une entrée
						</Button>
						<div className="mr-md-3 mb-3 ml-3">
							<Input placeholder='Recherchez une catégorie' prefix={<SearchOutlined />} onChange={e => setSearch(e.target.value)} />
						</div>
					</Flex>
				</Flex>
				<div className="table-responsive">
					<Table
						rowKey='id'
						columns={columns}
						dataSource={datas.filter(d => d.titleFr?.toLowerCase().includes(search.toLowerCase()))}
					/>
				</div>
			</Card>
		</React.Fragment>	
  	)
}

export default List;