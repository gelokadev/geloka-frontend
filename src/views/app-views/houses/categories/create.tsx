
import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { HOUSE } from '../../../../constants/FrontendUrl';
import Flex from '../../../../components/shared-components/Flex';
import { Input, Upload, Row, Col, Card, Form, message, } from 'antd';
import HouseCategoryService from '../../../../services/houses/category';
import GKButton from "../../../../components/shared-components/GKButton";
import CustomIcon from '../../../../components/util-components/CustomIcon';
import PageHeaderAlt from '../../../../components/layout-components/PageHeaderAlt';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';


const { Dragger } = Upload;

// const imageUploadProps = {
// 	name: 'avatar',
//   	multiple: false,
//   	listType: "picture-card",
//   	showUploadList: false,
// }

const Create = () => {

	const imageUploadProps: UploadProps = {
		name: 'file',
		multiple: true,
		action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
		onChange(info) {
		  const { status } = info.file;
		  if (status !== 'uploading') {
			console.log(info.file, info.fileList);
		  }
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
		]
	}

	let history = useHistory();
	const [form] = Form.useForm();
	const [image, setImage] = useState<any>(null);
	const [submitLoading, setSubmitLoading] = useState(false);
	const [uploadLoading, setUploadLoading] = useState(false);

	const onFinish = () => {
		setSubmitLoading(true)
		form.validateFields().then(values => {
			HouseCategoryService.createCategory(values).then(() => {
				history.push(HOUSE.CATEGORY.LIST);
			}).finally(() => {
				setSubmitLoading(false);
			})
		}).catch(() => {
			setSubmitLoading(false);
			message.error("Une erreur est survenue, veuillez réessayer plutard");
		});
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

	const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
		if (info.file.status === 'uploading') {
		  setUploadLoading(true);
		  return;
		}
		if (info.file.status === 'done') {
		  	// Get this url from response in real world.
			setUploadLoading(false);
			setImage(info.file);
		}
	  };

	const uploadButton = (
		<div>
		  {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
		  <div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);

	return (
		<React.Fragment>
			<PageHeaderAlt className="border-bottom">
				<Flex className="py-2" mobileFlex={false}>
					<h2>Créer une nouvelle catégorie</h2>
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
							{/* <Upload
								name="avatar"
								listType="picture-card"
								className="avatar-uploader"
								showUploadList={false}
								action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
								beforeUpload={beforeUpload}
								onChange={handleChange}
							>
								{image ? <img src={URL.createObjectURL(image)} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
							</Upload> */}
							{/* <Dragger {...imageUploadProps} beforeUpload={beforeUpload}>
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
												<p>Déposez votre image ici</p>
											</div>
										}
									</div>
								}
							</Dragger> */}
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