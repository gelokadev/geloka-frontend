
import { injectIntl } from 'react-intl';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import allIconsPack from '../../../../datas/icons';
import { HOUSE } from '../../../../constants/FrontendUrl';
import Flex from '../../../../components/shared-components/Flex';
import { Input, Select, Row, Col, Card, Form, message } from 'antd';
import CommodityService from '../../../../services/houses/commodities';
import GKButton from "../../../../components/shared-components/GKButton";
import PageHeaderAlt from '../../../../components/layout-components/PageHeaderAlt';
import CommodityCategory from '../../../../models/house/CommodityCategory';

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
	const [categories, setCategories] = useState<CommodityCategory[]>([]);

	useEffect(() => {
    	getCategories();
  	}, []);

  	const getCategories = () => {
    	CommodityService.getCategories().then(response => {
			setCategories(response.data.map(elt => new CommodityCategory(elt)));
    	}).finally(() => {

    	});
  	};

	const onFinish = () => {
		setSubmitLoading(true)
		form.validateFields().then(values => {
			CommodityService.createCommodity(values).then(() => {
				history.push(HOUSE.COMMODITY.LIST);
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
					<h2>Créer une nouvelle commodité</h2>
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
							<Form.Item name="category_reference" label={'Catégorie de la commodité'} rules={rules.icon}>
								<Select
									className="w-100"
									placeholder={'Catégorie de la commodité'}
								>
									{ categories.map((category: CommodityCategory, index: number) => (
										<Option key={index} value={category.reference}>
											{category.name}
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

export default injectIntl(Create);