
import City from '../../../models/City';
import { injectIntl } from 'react-intl';
import Country from '../../../models/Country';
import React, { useEffect, useState } from 'react';
import PlaceService from '../../../services/places';
import { LoadingOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'react-router-dom';
import type { UploadProps } from 'antd/es/upload/interface';
import Flex from '../../../components/shared-components/Flex';
import { POPULAR_PLACE } from '../../../constants/FrontendUrl';
import { PopularPlaceType } from '../../../models/PopularPlace';
import GKButton from "../../../components/shared-components/GKButton";
import { Input, Upload, Row, Col, Card, Form, message, Select } from 'antd';
import PageHeaderAlt from '../../../components/layout-components/PageHeaderAlt';
const { Option } = Select;

const { Dragger } = Upload;

const Update = ({type}: {type: PopularPlaceType}) => {

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
		country: [
			{
				required: true,
				message: 'Le pays est obligatoire',
			}
		],
		city: [
			{
				required: true,
				message: 'La ville est obligatoire',
			}
		],
		radius: [
			{
				required: true,
				message: 'Le rayon est obligatoire',
			}
		],
		longitude: [
			{
				required: true,
				message: 'La longitude est obligatoire',
			}
		],
		latitude: [
			{
				required: true,
				message: 'La latitude est obligatoire',
			}
		]
	}

	let history = useHistory();
	const [form] = Form.useForm();
	const { reference }: any = useParams();
	const [image, setImage] = useState<any>(null);
	const [cities, setCities] = useState<City[]>([]);
	const [submitLoading, setSubmitLoading] = useState(false);
	const [uploadLoading, setUploadLoading] = useState(false);
	const [countries, setCountries] = useState<Country[]>([]);
	const [country, setCountry] = useState<string|null>(null);

	useEffect(() => {
    	getCountries();
		findData();
  	}, []);

	  useEffect(() => {
		if(country) {
    		getCities();
		}
  	}, [country]);

	const findData = () => {
		PlaceService.findPopular(reference).then((response) => {
			console.log(response.data)
			form.setFieldsValue({
				name: response.data.name,
				radius: response.data.radius,
				longitude: response.data.coordinate.longitude,
				latitude: response.data.coordinate.latitude,
				city_id: response.data.cityId,
				country: response.data.country,
				description: response.data.description
			});
			setCountry(response.data.country);
		}).catch((error) => {
			history.push(type === PopularPlaceType.CITY ? POPULAR_PLACE.CITY.LIST : POPULAR_PLACE.POINT.LIST);
		})
	};

	const getCities = () => {
		PlaceService.getCountryCities({country_iso2: country}).then((response) => {
			setCities(response.data)
		}).catch(() => {
			setCities([]);
		})
	};

	const getCountries = () => {
		PlaceService.getCountries().then((response) => {
			setCountries(response.data.map((c: any) => new Country(c)))
		}).catch(() => {
			setCountries([]);
			setCities([]);
			setCountry(null);
		})
	};

	const onFinish = () => {
		setSubmitLoading(true)
		form.validateFields().then(values => {
			PlaceService.updatePopular(reference, {...values, files: image ? [{file: image, name: 'image'}] : []}).then(() => {
				history.push(type === PopularPlaceType.CITY ? POPULAR_PLACE.CITY.LIST : POPULAR_PLACE.POINT.LIST);
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

	return (
		<React.Fragment>
			<PageHeaderAlt className="border-bottom">
				<Flex className="py-2" mobileFlex={false}>
					<h2>{type === PopularPlaceType.CITY ? 'Editer la ville' : 'Editer le lieu' }</h2>
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
							<Form.Item name="name" label={'Nom du lieu'} rules={rules.title}>
								<Input placeholder={'Nom du lieu'} />
							</Form.Item>
							<Form.Item name="description" label={'Description du lieu'} rules={rules.description}>
								<Input placeholder={'Description du lieu'} />
							</Form.Item>
							<Form.Item name="country" label={'Pays de la ville'} rules={rules.country}>
								<Select
									className="w-100"
									placeholder={'Pays de la ville'}
									onChange={(e: any) => {
										setCountry(e);
									}}
								>
									{ countries.map((c: Country, index: number) => (
										<Option key={index} value={c.id}>
											{c.name}
										</Option>
									))}
								</Select>
							</Form.Item>
							{ country && (
								<Form.Item name="city_id" label={"Ville"} rules={rules.city}>
									<Select
										showSearch
										className="w-100"
										placeholder={'Ville'}
										filterOption={(input, option) =>
											option?.props.children.toLowerCase().includes(input.toLowerCase())
										}
									>
										{ cities.map((c: City, index: number) => (
											<Option key={index} value={c.id}>
												{c.name}
											</Option>
										))}
									</Select>
								</Form.Item>
							)}
							{ type === PopularPlaceType.CITY ? (
								<Form.Item name="radius" label={'Rayon (en KM)'} rules={rules.radius}>
									<Input type='number' placeholder={'Rayon (en KM)'} />
								</Form.Item>
							) : (
								<>
									<Form.Item name="longitude" label={'Longitude'} rules={rules.longitude}>
										<Input type='number' placeholder={'Longitude'} />
									</Form.Item>
									<Form.Item name="latitude" label={'Latitude'} rules={rules.latitude}>
										<Input type='number' placeholder={'Latitude'} />
									</Form.Item>
								</>
							)}
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
							<div className='d-flex justify-content-end mt-3'>
								<GKButton label='Sauvegarder' type="primary" loading={submitLoading} onClick={() => onFinish()} />
							</div>
						</Card>
					</Col>
				</Row>
			</Form>	
		</React.Fragment>
	)
}

export default Update;