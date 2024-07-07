import { useHistory } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import PlaceService from '../../../services/places';
import PopularPlace from '../../../models/PopularPlace';
import { Card, Input, Table, Button, Switch } from 'antd';
import Flex from '../../../components/shared-components/Flex';
import { POPULAR_PLACE } from '../../../constants/FrontendUrl';
import PageHeaderAlt from '../../../components/layout-components/PageHeaderAlt';

export const List = () => {

	let history = useHistory();

	const [search, setSearch] = useState<String>('');
  	const [datas, setDatas] = useState<PopularPlace[]>([]);

  	useEffect(() => {
    	getPlaces();
  	}, []);

  	const getPlaces = () => {
    	PlaceService.getPopular().then(response => {
			setDatas(response.data.map(elt => new PopularPlace(elt)));
    	}).finally(() => {

    	});
  	};

  	const updateStatus = (item: PopularPlace) => {
    	PlaceService.updatePopularStatus(item.id).then(() => {
			getPlaces()
    	})
  	};

  	const columns = [
		{
			title: "Nom",
			dataIndex: 'title',
			render: (__: any, elm: PopularPlace) => (
				<div className="d-flex">
					<div className='ml-3'>
						<p className='font-weight-bold mb-0' style={{ color: 'black' }}>{elm.name}</p>
					</div>
				</div>
			)
		},
		{
			title: "Description",
			dataIndex: 'description',
			render: (__: any, elm: PopularPlace) => (
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
			render: (__: any, elm: PopularPlace) => (
				<div className="d-flex">
					<div className='ml-3'>
						<p className='font-weight-bold mb-0' style={{ color: 'black' }}>{elm.getParsedDate()}</p>
					</div>
				</div>
			)
		},
		{
			title: "Status",
			render: (__: any, elm: PopularPlace) => (
				<div className="d-flex">
					<div className='ml-3'>
						<Switch defaultChecked={elm.status} onChange={() => updateStatus(elm)} />
					</div>
				</div>
			)
		},
		{
			title: "Actions",
			render: (__: any, elm: PopularPlace) => (
				<div className="d-flex">
					<div className='ml-3'>
						<Button
							type="primary"
							onClick={() => history.push(POPULAR_PLACE.CITY.UPDATE.replace(':reference', elm.id))}
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
					<h2>Lieux populaires</h2>
				</Flex>
			</PageHeaderAlt>	
			<Card>
				<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
					<Flex className="mb-1" mobileFlex={false}>
						<Button type="primary" onClick={() => {
							history.push(POPULAR_PLACE.CITY.CREATE);
						}}>
							Ajouter une entrée
						</Button>
						<div className="mr-md-3 mb-3 ml-3">
							<Input placeholder='Recherchez un lieu' prefix={<SearchOutlined />} onChange={e => setSearch(e.target.value)} />
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