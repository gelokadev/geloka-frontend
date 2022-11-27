import { useHistory } from 'react-router-dom';
import { Card, Input, Table, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { HOUSE } from '../../../../constants/FrontendUrl';
import Commodity from '../../../../models/house/Commodity';
import HouseCategory from '../../../../models/house/Category';
import Flex from '../../../../components/shared-components/Flex';
import HouseCategoryService from '../../../../services/houses/category';
import PageHeaderAlt from '../../../../components/layout-components/PageHeaderAlt';

export const List = () => {

	let history = useHistory();

	const [search, setSearch] = useState<String>('');
  	const [datas, setDatas] = useState<HouseCategory[]>([]);

  	useEffect(() => {
    	getCommodities();
  	}, []);

  	const getCommodities = () => {
    	HouseCategoryService.getCategories().then(response => {
			setDatas(response.data.map(elt => new HouseCategory(elt)));
    	}).finally(() => {

    	});
  	};

  	const columns = [
		{
			title: "Nom par défaut",
			dataIndex: 'title',
			render: (__: any, elm: HouseCategory) => (
				<div className="d-flex">
					<div className='ml-3'>
						<p className='font-weight-bold mb-0' style={{ color: 'black' }}>{elm.title}</p>
					</div>
				</div>
			)
		},
		{
			title: "Description",
			dataIndex: 'description',
			render: (__: any, elm: HouseCategory) => (
				<div className="d-flex">
					<div className='ml-3'>
						<p className='font-weight-bold mb-0' style={{ color: 'black' }}>{elm.description.slice(0, 100)}</p>
					</div>
				</div>
			)
		},
		{
			title: "Date de création",
			dataIndex: 'createdAt',
			render: (__: any, elm: HouseCategory) => (
				<div className="d-flex">
					<div className='ml-3'>
						<p className='font-weight-bold mb-0' style={{ color: 'black' }}>{elm.getParsedDate()}</p>
					</div>
				</div>
			)
		},
		{
			title: "Actions",
			render: (__: any, elm: HouseCategory) => (
				<div className="d-flex">
					<div className='ml-3'>
						<Button
							type="primary"
							onClick={() => history.push(HOUSE.CATEGORY.UPDATE.replace(':reference', elm.reference))}
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
							history.push(HOUSE.CATEGORY.CREATE);
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
						dataSource={datas.filter(d => d.title.toLowerCase().includes(search.toLowerCase()))}
					/>
				</div>
			</Card>
		</React.Fragment>	
  	)
}

export default List;