import { useHistory } from 'react-router-dom';
import Lessor from '../../../../models/Lessor';
import { Card, Input, Table, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import UserService from '../../../../services/users';
import { HOUSE } from '../../../../constants/FrontendUrl';
import Flex from '../../../../components/shared-components/Flex';
import PageHeaderAlt from '../../../../components/layout-components/PageHeaderAlt';

export const List = () => {

	let history = useHistory();

	const [search, setSearch] = useState<String>('');
  	const [datas, setDatas] = useState<Lessor[]>([]);

  	useEffect(() => {
    	getLessors();
  	}, []);

  	const getLessors = () => {
    	UserService.getLessors().then(response => {
			setDatas(response.data.map(elt => new Lessor(elt)));
			console.log(response.data.map(elt => new Lessor(elt)))
    	}).finally(() => {

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
						<p className='font-weight-bold mb-0' style={{ color: 'black' }}>{elm.userInfo.telephone}</p>
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
						dataSource={datas.filter(d => d.firstName.toLowerCase().includes(search.toLowerCase()))}
					/>
				</div>
			</Card>
		</React.Fragment>	
  	)
}

export default List;