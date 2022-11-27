
import { injectIntl } from 'react-intl';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Input, Row, Col, Card, Form, message } from 'antd';
import { HOUSE } from '../../../../../constants/FrontendUrl';
import Flex from '../../../../../components/shared-components/Flex';
import CommodityService from '../../../../../services/houses/commodities';
import GKButton from "../../../../../components/shared-components/GKButton";
import PageHeaderAlt from '../../../../../components/layout-components/PageHeaderAlt';

const Update = () => {

	const rules = {
		name: [
			{
				required: true,
				message: 'Le nom par défaut est obligatoire',
			}
		],
		french: [
			{
				required: true,
				message: 'Le nom en français est obligatoire',
			}
		],
		english: [
			{
				required: true,
				message: 'Le nom en anglais est obligatoire',
			}
		]
	}

	let history = useHistory();
	const [form] = Form.useForm();
	const { reference }: any = useParams();
	const [submitLoading, setSubmitLoading] = useState(false);

	useEffect(() => {
		findData();
	}, []);

	const findData = () => {
		CommodityService.findCategory(reference).then((response) => {
			form.setFieldsValue({
				name: response.data.name,
				french: response.data.french,
				english: response.data.english
			});
		}).catch(() => {
			history.push(HOUSE.COMMODITY.CATEGORY.LIST);
		})
	};

	const onFinish = () => {
		setSubmitLoading(true)
		form.validateFields().then(values => {
			CommodityService.updateCommodityCategory(reference, values).then(() => {
				history.push(HOUSE.COMMODITY.CATEGORY.LIST);
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
					<h2>Editer une catégorie de commodité</h2>
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
							<Form.Item name="name" label={'Nom par défaut'} rules={rules.name}>
								<Input placeholder={'Nom par défaut'} />
							</Form.Item>
							<Form.Item name="french" label={'Nom en français'} rules={rules.french}>
								<Input placeholder={'Nom par français'} />
							</Form.Item>
							<Form.Item name="english" label={'Nom en anglais'} rules={rules.english}>
								<Input placeholder={'Nom par anglais'} />
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