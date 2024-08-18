
import { injectIntl } from 'react-intl';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { ONBOARDING } from '../../../constants/FrontendUrl';
import type { UploadProps } from 'antd/es/upload/interface';
import Flex from '../../../components/shared-components/Flex';
import { Input, Row, Col, Card, Form, message, Upload } from 'antd';
import GKButton from "../../../components/shared-components/GKButton";
import PageHeaderAlt from '../../../components/layout-components/PageHeaderAlt';
import SystemService from '../../../services/systems';

const { Dragger } = Upload;

const Update = () => {

	const rules = {
		position: [
			{
				required: true,
				message: 'La position est obligatoire',
			}
		],
		titleFr: [
			{
				required: true,
				message: 'Le titre en français est obligatoire',
			}
		],
		titleEn: [
			{
				required: true,
				message: 'Le titre en anglais est obligatoire',
			}
		],
		descriptionFr: [
			{
				required: true,
				message: 'La description en français est obligatoire',
			}
		],
		descriptionEn: [
			{
				required: true,
				message: 'La description en anglais est obligatoire',
			}
		]
	}

	const imageUploadProps: UploadProps = {
		name: 'file',
		multiple: true,
		action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
		onChange(info) {
		  const { status } = info.file;
		  if (status === 'done') {
			message.success(`${info.file.name} file uploaded successfully.`);
		  } else if (status === 'error') {
			message.error(`${info.file.name} file upload failed.`);
		  }
		},
		onDrop(e) {
		  console.log('Dropped files', e.dataTransfer.files);
		},
	};

	let history = useHistory();
	const [form] = Form.useForm();
	const { reference }: any = useParams();
	const [image, setImage] = useState<any>(null);
	const [submitLoading, setSubmitLoading] = useState(false);
	const [uploadLoading, setUploadLoading] = useState(false);

	useEffect(() => {
		findData();
  	}, []);

	const findData = () => {
		SystemService.findOnboarding(reference).then((response) => {
			console.log(response.data)
			form.setFieldsValue({
				title_fr: response.data.titleFr,
				title_en: response.data.titleEn,
				description_fr: response.data.descriptionFr,
				description_en: response.data.descriptionEn,
				position: response.data.position,
			});
		}).catch((error) => {
			history.push(ONBOARDING.LIST);
		})
	};

	const beforeUpload = (file: any) => {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJpgOrPng) {
			message.error("Unique les formats JPG et PNG sont autorisés");
			return false;
		}
		setImage(file);
		return false;
	}

	const onFinish = () => {
		setSubmitLoading(true)
		form.validateFields().then(values => {
			if(image) {
				SystemService.updateOnboarding(reference, {...values, file: image}).then(() => {
					history.push(ONBOARDING.LIST);
				}).finally(() => {
					setSubmitLoading(false);
				})
			} else {
				SystemService.updateOnboarding(reference, values).then(() => {
					history.push(ONBOARDING.LIST);
				}).finally(() => {
					setSubmitLoading(false);
				})
			}
		}).catch(() => {
			setSubmitLoading(false);
			message.error("Une erreur est survenue, veuillez réessayer plutard");
		});
	};

	return (
		<React.Fragment>
			<PageHeaderAlt className="border-bottom">
				<Flex className="py-2" mobileFlex={false}>
					<h2>Créer un onboarding</h2>
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
							<Form.Item name="position" label={'Position'} rules={rules.position}>
								<Input placeholder={'Position'} />
							</Form.Item>
							<Form.Item name="title_fr" label={'Titre en français'} rules={rules.titleFr}>
								<Input placeholder={'Titre en français'} />
							</Form.Item>
							<Form.Item name="title_en" label={'Titre en anglais'} rules={rules.titleEn}>
								<Input placeholder={'Titre en anglais'} />
							</Form.Item>
							<Form.Item name="description_fr" label={'Description en français'} rules={rules.descriptionFr}>
								<Input placeholder={'Description en français'} />
							</Form.Item>
							<Form.Item name="description_en" label={'Description en anglais'} rules={rules.descriptionEn}>
								<Input placeholder={'Description en anglais'} />
							</Form.Item>

							<Dragger {...imageUploadProps} beforeUpload={beforeUpload}>
								{
									image ? 
										<img src={URL.createObjectURL(image)} alt="avatar" className="img-fluid" /> 
									: 
									<div>
										{
											uploadLoading ? 
											<div>
												<LoadingOutlined className="font-size-xxl text-primary"/>
												<div className="mt-3">En cours...</div>
											</div> 
											: 
											<div>
												<p>Déposez l'image ici</p>
											</div>
										}
									</div>
								}
							</Dragger>
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