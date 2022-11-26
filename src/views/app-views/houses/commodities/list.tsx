import { useHistory } from 'react-router-dom';
import { Card, Input, Table, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import Commodity from '../../../../models/Commodity';
import HouseService from '../../../../services/houses';
import { HOUSE } from '../../../../constants/FrontendUrl';
import Flex from '../../../../components/shared-components/Flex';
import PageHeaderAlt from '../../../../components/layout-components/PageHeaderAlt';

export const List = () => {

	let history = useHistory();

  	const [datas, setDatas] = useState<any>([]);

  	useEffect(() => {
    	getCommodities();
  	}, []);

  	const getCommodities = () => {
    	HouseService.getCommodities().then(response => {
			setDatas(response);
    	}).finally(() => {

    	});
  	};

	const onSearch = (e: any) => {
		// const value = e.currentTarget.value;
		// const searchArray = e.currentTarget.value ? [] : [];
	}

  	const columns = [
		{
			title: "Nom par défaut",
			dataIndex: 'title',
			render: (__: any, elm: Commodity) => (
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
			render: (__: any, elm: Commodity) => (
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
			render: (__: any, elm: Commodity) => (
				<div className="d-flex">
					<div className='ml-3'>
						<p className='font-weight-bold mb-0' style={{ color: 'black' }}>{elm.english}</p>
					</div>
				</div>
			)
		},
		{
			title: "Icône",
			dataIndex: 'endAt',
			render: (__: any, elm: Commodity) => (
				<div className="d-flex">
					<div className='ml-3'>
						<p className='font-weight-bold mb-0' style={{ color: 'black' }}>{elm.icon}</p>
					</div>
				</div>
			)
		},
		{
			title: "Date de création",
			dataIndex: 'timezone',
			render: (__: any, elm: Commodity) => (
				<div className="d-flex">
					<div className='ml-3'>
						<p className='font-weight-bold mb-0' style={{ color: 'black' }}>{elm.createdAt}</p>
					</div>
				</div>
			)
		},
		{
			title: "Actions",
			dataIndex: 'meetingType',
			render: (__: any, elm: Commodity) => (
				<div className="d-flex">
					<div className='ml-3'>
						<p className='font-weight-bold mb-0' style={{ color: 'black' }}>{elm.createdAt}</p>
					</div>
				</div>
			)
		}
	];

  	return (
		<React.Fragment>
			<PageHeaderAlt className="border-bottom">
				<Flex className="py-2" mobileFlex={false}>
					<h2>Liste des commodités</h2>
				</Flex>
			</PageHeaderAlt>	
			<Card>
				<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
					<Flex className="mb-1" mobileFlex={false}>
						<Button type="primary" onClick={() => {
							history.push(HOUSE.COMMODITY.CREATE);
						}}>
							Ajouter une entrée
						</Button>
						<div className="mr-md-3 mb-3 ml-3">
							<Input placeholder='Recherchez une commodité' prefix={<SearchOutlined />} onChange={e => onSearch(e)} />
						</div>
					</Flex>
				</Flex>
				<div className="table-responsive">
					<Table
						rowKey='id'
						dataSource={datas}
						columns={columns}
					/>
				</div>
			</Card>
		</React.Fragment>	
  	)
}

export default List;