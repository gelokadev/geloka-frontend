import { useHistory } from 'react-router-dom';
import { Card, Input, Table, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { HOUSE } from '../../../../../constants/FrontendUrl';
import Flex from '../../../../../components/shared-components/Flex';
import CommodityService from '../../../../../services/houses/commodities';
import CommodityCategory from '../../../../../models/house/CommodityCategory';
import PageHeaderAlt from '../../../../../components/layout-components/PageHeaderAlt';

export const List = () => {

	let history = useHistory();

	const [search, setSearch] = useState<String>('');
  	const [datas, setDatas] = useState<CommodityCategory[]>([]);

  	useEffect(() => {
    	getCategories();
  	}, []);

  	const getCategories = () => {
    	CommodityService.getCategories().then(response => {
			setDatas(response.data.map(elt => new CommodityCategory(elt)));
    	}).finally(() => {

    	});
  	};

  	const columns = [
		{
			title: "Nom par défaut",
			dataIndex: 'title',
			render: (__: any, elm: CommodityCategory) => (
				<div className="d-flex">
					<div className='ml-3'>
						<p className='font-weight-bold mb-0' style={{ color: 'black' }}>{elm.name}</p>
					</div>
				</div>
			)
		},
		{
			title: "Français",
			dataIndex: 'startAt',
			render: (__: any, elm: CommodityCategory) => (
				<div className="d-flex">
					<div className='ml-3'>
						<p className='font-weight-bold mb-0' style={{ color: 'black' }}>{elm.french}</p>
					</div>
				</div>
			)
		},
		{
			title: "Anglais",
			dataIndex: 'startAt',
			render: (__: any, elm: CommodityCategory) => (
				<div className="d-flex">
					<div className='ml-3'>
						<p className='font-weight-bold mb-0' style={{ color: 'black' }}>{elm.english}</p>
					</div>
				</div>
			)
		},
		{
			title: "Date de création",
			dataIndex: 'timezone',
			render: (__: any, elm: CommodityCategory) => (
				<div className="d-flex">
					<div className='ml-3'>
						<p className='font-weight-bold mb-0' style={{ color: 'black' }}>{elm.getParsedDate()}</p>
					</div>
				</div>
			)
		},
		{
			title: "Actions",
			dataIndex: 'meetingType',
			render: (__: any, elm: CommodityCategory) => (
				<div className="d-flex">
					<div className='ml-3'>
						<Button
							type="primary"
							onClick={() => history.push(HOUSE.COMMODITY.CATEGORY.UPDATE.replace(':reference', elm.reference))}
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
					<h2>Liste des catégories</h2>
				</Flex>
			</PageHeaderAlt>	
			<Card>
				<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
					<Flex className="mb-1" mobileFlex={false}>
						<Button type="primary" onClick={() => {
							history.push(HOUSE.COMMODITY.CATEGORY.CREATE);
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
						dataSource={datas.filter(d => d.name.toLowerCase().includes(search.toLowerCase()))}
					/>
				</div>
			</Card>
		</React.Fragment>	
  	)
}

export default List;