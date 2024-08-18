
import { injectIntl } from 'react-intl';
import Icons from '../../../../datas/icons.json';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { HOUSE } from '../../../../constants/FrontendUrl';
import Flex from '../../../../components/shared-components/Flex';
import { Input, Row, Col, Card, Form, message, Select } from 'antd';
import HouseCategoryService from '../../../../services/houses/category';
import GKButton from "../../../../components/shared-components/GKButton";
import PageHeaderAlt from '../../../../components/layout-components/PageHeaderAlt';

const { Option } = Select

const Update = () => {

	const rules = {
		title: [
			{
				required: true,
				message: 'Le nom est obligatoire',
			}
		],
		description: [
			{
				required: true,
				message: 'La description est obligatoire',
			}
		],
		icon: [
			{
				required: true,
				message: "L'icône est obligatoire",
			}
		],
	}

	let history = useHistory();
	const [form] = Form.useForm();
	const { reference }: any = useParams();
	const [submitLoading, setSubmitLoading] = useState(false);

	useEffect(() => {
		findData();
  	}, []);

	const findData = () => {
		HouseCategoryService.findCategory(reference).then((response) => {
			form.setFieldsValue({
				icon: response.data.icon,
				title: response.data.title,
				description: response.data.description
			});
		}).catch(() => {
			history.push(HOUSE.CATEGORY.LIST);
		})
	};

	const onFinish = () => {
		setSubmitLoading(true)
		form.validateFields().then(values => {
			HouseCategoryService.updateCategory(reference, values).then(() => {
				history.push(HOUSE.CATEGORY.LIST);
			}).finally(() => {
				setSubmitLoading(false);
			})
		}).catch(() => {
			setSubmitLoading(false);
			message.error("Une erreur est survenue, veuillez réessayer plutard");
		});
	};

	return (
		<React.Fragment>
			<PageHeaderAlt className="border-bottom">
				<Flex className="py-2" mobileFlex={false}>
					<h2>Editer la catégorie</h2>
				</Flex>
			</PageHeaderAlt>
			<Form
				form={form}
				layout="vertical"
				className="ant-advanced-search-form"
			>
				<Row gutter={16}>
					<Col xs={24} sm={24} md={24}>
						<Card>
							<Form.Item name="title" label={'Nom de la catégorie'} rules={rules.title}>
								<Input placeholder={'Nom de la catégorie'} />
							</Form.Item>
							<Form.Item name="description" label={'Description de la catégorie'} rules={rules.description}>
								<Input placeholder={'Description de la catégorie'} />
							</Form.Item>
							<Form.Item name="icon" label={'Icône de la catégorie'} rules={rules.icon}>
								<Select
									showSearch
									className="w-100"
									filterOption={(input, option) => {
										return option?.props.value.toLowerCase().includes(input.toLowerCase())
									}}
									placeholder={'Icône de la catégorie'}
								>
									{ Icons.icons.map((icon: any, index: number) => (
										<Option key={index} value={icon.properties.name}>
											<div className='d-flex flex-row align-items-center'>
												<svg width="30" height="30" viewBox="0 0 1200 1200">
													{icon.icon.paths.map((path: string, i: number) => (
														<path key={i} d={path}></path>
													))}
												</svg>
												&nbsp;&nbsp;{icon.properties.name}
											</div>
										</Option>
									))}
								</Select>
							</Form.Item>
							<div className='d-flex justify-content-end'>
								<GKButton label='Sauvegarder' type="primary" loading={submitLoading} onClick={() => onFinish()} />
							</div>
						</Card>
					</Col>
				</Row>
			</Form>	
		</React.Fragment>
	)
}

export default injectIntl(Update);