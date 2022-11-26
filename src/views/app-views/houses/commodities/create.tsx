
import { injectIntl } from 'react-intl';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import allIconsPack from '../../../../datas/icons';
import Flex from '../../../../components/shared-components/Flex';
import PageHeaderAlt from '../../../../components/layout-components/PageHeaderAlt';
import { Input, Select, Row, Col, Card, Form, Button, message } from 'antd';

const { Option, OptGroup } = Select

const Create = (props: any) => {

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
	const [submitLoading, setSubmitLoading] = useState(false);

	console.log(allIconsPack);

	const onFinish = () => {
		setSubmitLoading(true)
		form.validateFields().then(values => {
			
		}).catch(info => {
			setSubmitLoading(false)
			message.error("Une erreur est survenue, veuillez réessayer plutard");
		});
	};

	return (
		<React.Fragment>
			<PageHeaderAlt className="border-bottom">
				<Flex className="py-2" mobileFlex={false}>
					<h2>Liste des commodités</h2>
				</Flex>
			</PageHeaderAlt>
			<Form
				form={form}
				layout="vertical"
				className="ant-advanced-search-form"
			>
				<Row gutter={16}>
					<Col xs={24} sm={24} md={24}>
						<Card title={props.intl.formatMessage({ id: 'page.session.create' })}>
							<Form.Item name="name" label={'Nom par défaut'} rules={rules.name}>
								<Input placeholder={'Nom par défaut'} />
							</Form.Item>
							<Form.Item name="french" label={'Nom en français'} rules={rules.french}>
								<Input placeholder={'Nom par français'} />
							</Form.Item>
							<Form.Item name="english" label={'Nom en anglais'} rules={rules.english}>
								<Input placeholder={'Nom par anglais'} />
							</Form.Item>
							<Form.Item name="icon" label={'Icône de la commodité'} rules={rules.icon}>
								<Select
									className="w-100"
									placeholder={'Icône de la commodité'}
								>
									{ allIconsPack.map((iconPack: any, index) => (
										<OptGroup key={index} label={iconPack.title}>
											{ iconPack.icons.map((icon: any, i: number) => (
												<Option key={i} value={icon}>
													<div className={`glyph-icon ${icon}`} />
												</Option>
											))}
										</OptGroup>
									))}
								</Select>
							</Form.Item>
							{/* <Form.Item name="title" label={'Catégorie'} rules={rules.title}>
								<Input placeholder={'Catégorie'} />
							</Form.Item> */}
							<div className='d-flex justify-content-end'>
								<Button type="primary" onClick={() => {}}>
									Enregistrer
								</Button>
							</div>
						</Card>
					</Col>
				</Row>
			</Form>	
		</React.Fragment>
	)
}

export default injectIntl(Create);