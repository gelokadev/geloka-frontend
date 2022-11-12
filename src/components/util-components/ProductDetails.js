import React, { useState } from 'react';
import { ImageSvg } from 'assets/svg/icon';
import { Row, Col, Card, Upload, Button, Modal } from 'antd';
import CustomIcon from 'components/util-components/CustomIcon';
import Utils from 'utils';
import { setAuthUser } from 'redux/actions/Auth';
import { connect } from 'react-redux';
import Item from 'antd/lib/list/Item';
import { injectIntl } from 'react-intl';

const { Dragger } = Upload;

const Details = (props) => {

    const imageToUpload = props.product?.image;
    const user = props.user;
    const [previewImage, setPreviewImage] = useState('');
    const [previewVisible, setPreviewVisible] = useState('');

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await Utils.getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
    };

    const handleCancel = () => {
        setPreviewVisible(false);
    };

    return (
        <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
                <Card>
                    <Row>
                        <Col xs={24} sm={24} md={7}>
                            <Dragger disabled>
                                {
                                    imageToUpload ?
                                        <div>
                                            <img src={Utils.getFilePath(imageToUpload)} alt="avatar" className="img-fluid"
                                                onPreview={() => handlePreview()} />
                                            <Modal visible={previewVisible} footer={null} onCancel={() => handleCancel()}>
                                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                            </Modal>
                                        </div>

                                        :
                                        <div>
                                            <div>
                                                <CustomIcon className="display-3" svg={ImageSvg} />
                                            </div>
                                        </div>
                                }
                            </Dragger>
                        </Col>
                        <Col xs={24} sm={24} md={{ span: 15, offset: 2 }}>
                            <div>
                                <div>
                                    {/* <p className='mb-0'>{props.product?.category?.name}</p> */}
                                    <h1 className='font-weight-bold'>{props.product?.name}</h1>
                                </div>
                            </div>
                            <div className='mt-4'>
                                <h4>{props.intl.formatMessage({ id: 'form.productCategory' })}</h4>
                                {
                                    props.product?.interests.lenght !== 0 ?
                                        <div>
                                            <p>
                                                <span className='font-weight-bold mr-1'>
                                                    {
                                                        props.product?.interests[0]?.type.name
                                                    }
                                                </span>
                                                
                                                <span className='ml-1'>
                                                    {
                                                        props.product?.interests[0]?.name
                                                    }
                                                </span>

                                            </p>
                                        </div>
                                        :
                                        ''
                                }
                            </div>
                            <div className='mt-4'>
                                <h4>{props.intl.formatMessage({ id: 'form.productUrl' })}</h4>
                                <p className={'cursor-pointer'} onClick={() => window.open(props.product?.url, 'blank')}>
                                    {props.product?.url}
                                </p>
                            </div>
                            <div className='d-flex align-items-center justify-content-between mt-5'>
                                <h2 className='font-weight-bold'>Price: €{props.product?.price}</h2>
                                {props.isAdmin ?
                                    <div>
                                        {props.status === 'PENDING' ?
                                            <div>
                                                <Button type="danger" onClick={() => props.showModal('REJECTED')}>
                                                    {props.intl.formatMessage({ id: 'button.rejectOrder' })}
                                                </Button>
                                                <Button className='ml-3' type="primary" onClick={() => props.updatePurchase()}>
                                                    {props.intl.formatMessage({ id: 'button.approveOrder' })}
                                                </Button>
                                            </div>
                                            :
                                            props.status === 'APPROVED' ?
                                                !props.isClosed ?
                                                    <Button className='ml-3' type="primary" onClick={() => props.closePurchase()}>
                                                        {props.intl.formatMessage({ id: 'button.closeOrder' })}
                                                    </Button>
                                                    :
                                                    <Item style={{ fontStyle: 'italic' }}>
                                                        {props.intl.formatMessage({ id: 'page.purchase.close.status' })}
                                                    </Item>
                                                :
                                                ''
                                        }
                                    </div>
                                    :
                                    user.id !== props.userId ?
                                        !props.isParticipant ?
                                            !props.isClosed ?
                                                <Button type="primary" onClick={() => props.showModal()}>
                                                    {props.intl.formatMessage({ id: 'button.joinOrder' })}
                                                </Button>
                                                :
                                                <Item style={{ fontStyle: 'italic' }}>
                                                    {props.intl.formatMessage({ id: 'page.purchase.close.status' })}
                                                </Item>
                                            :
                                            <Item style={{ fontStyle: 'italic' }}>
                                                {props.intl.formatMessage({ id: 'page.purchase.joined' })}
                                            </Item>
                                        :
                                        ''
                                }
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    )
}


const mapStateToProps = ({ auth }) => {
    const { user } = auth;
    return { user }
}
export default connect(mapStateToProps, { setAuthUser })(injectIntl(Details));
