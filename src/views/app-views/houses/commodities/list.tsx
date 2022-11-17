import { Card, Input,  Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import Commodity from '../../../../models/Commodity';
import HouseService from '../../../../services/houses';
import Flex from '../../../../components/shared-components/Flex';

export const List = () => {

  const [datas, setDatas] = useState<Commodity[]>([]);

  useEffect(() => {
    getCommodities();
  }, []);

  const getCommodities = () => {
    HouseService.getCommodities().then(response => {
      console.log("1 ", response);
      console.log("2 ", response.data);
      setDatas(response);
    }).finally(() => {

    });
  };

  const onSearch = (e: any) => {
		const value = e.currentTarget.value;
		const searchArray = e.currentTarget.value ? [] : [];
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
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        <Flex className="mb-1" mobileFlex={false}>
          <div className="mr-md-3 mb-3">
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
  )
}

export default List;