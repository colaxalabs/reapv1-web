import PropTypes from 'prop-types'
import React, { useState } from 'react'
import {
  Form,
  Modal,
  Input,
  Switch,
  Select,
  Typography,
  message,
} from 'antd'
import Validator from 'validator'

// Utils
import { handleUpload } from '../../utils'

const { Option } = Select
const { Text } = Typography

function Preparation({ visible, tokenId, onCreate, onCancel }) {
  const [form] = Form.useForm()
  const [isChecked, setIsChecked] = useState(false)
  const [type, setType] = useState('')
  const [fertilizerProof, setFertilizerProof] = useState('')

  const onChange = checked => {
    setIsChecked(checked)
  }

  const handleSelect = value => {
    setType(value)
  }

  return (
    <Modal
      visible={visible}
      centered
      title='Confirm season preparation'
      okText='Confirm'
      cancelText='Close'
      onCancel={onCancel}
      onOk={() => {
        form.validateFields()
          .then((values) => {
            values.fertilizerProof = fertilizerProof
            onCreate(tokenId, values, message)
            onCancel()
            form.resetFields()
          })
          .catch((info) => {
            console.log('Validate Failed:', info)
          })
      }}
    >
      <Form
        form={form}
        layout='vertical'
        name='form_in_modal'
        initialValues={{
          crop: '',
          fertilizerCheck: false,
          fertilizerType: '',
          fertilizerUsed: '',
          fertilizerSupplier: '',
        }}
      >
        <Form.Item
          name='crop'
          label='Crop'
          extra={<Text type='secondary'>Which crop are you preparing for this season?</Text>}
          rules={[
            {
              validator: (rule, value) => {
                if (!Validator.isEmpty(value) && Validator.isAlphanumeric(String(value).replace(/\s+/g, ''))) {
                  return Promise.resolve()
                } else {
                  return Promise.reject('Invalid name')
                }
              }
            }
          ]}
        >
          <Input type='text' />
        </Form.Item>
        <Form.Item
          name='fertilizerCheck'
          valuePropName='checked'
        >
          <Switch
            checked={isChecked}
            disabled={isChecked}
            onChange={onChange}
            unCheckedChildren={<Text>Did you use any fertilizer during preparation?</Text>}
          />
        </Form.Item>
        {isChecked ? (
          <Form.Item
            name='fertilizerType'
            label='Type'
            extra={<Text type='secondary'>Did you use artificial or organic fertilizer?</Text>}
            rules={[
              {
                validator: (rule, value) => {
                  if (isChecked) {
                    if (!Validator.isEmpty(value) && Validator.isAlphanumeric(String(value).replace(/\s+/g, ''))) {
                      return Promise.resolve()
                    } else {
                      return Promise.reject('Select type')
                    }
                  }
                }
              }
            ]}
          >
            <Select placeholder='Artificial/Organic' onChange={handleSelect}>
              <Option value='Artificial'>Artificial</Option>
              <Option value='Organic'>Organic</Option>
            </Select>
          </Form.Item>
        ) : null}
        {type === 'Artificial' && isChecked ? (
          <>
            <Form.Item
              name='fertilizerUsed'
              label='Name'
              extra={<Text type='secondary'>Name of the fertilizer used?</Text>}
              rules={[
                {
                  validator: (rule, value) => {
                    if (isChecked && type === 'Artificial') {
                      if (!Validator.isEmpty(value) && Validator.isAlphanumeric(String(value).replace(/\s+/g, ''))) {
                        return Promise.resolve()
                      } else {
                        return Promise.reject('Invalid name')
                      }
                    }
                  }
                }
              ]}
            >
              <Input type='text' />
            </Form.Item>
            <Form.Item
              name='fertilizerSupplier'
              label='Supplier'
              extra={<Text type='secondary'>Who supplied your the fertilizer?</Text>}
              rules={[
                {
                  validator: (rule, value) => {
                    if (isChecked && type === 'Artificial') {
                      if (!Validator.isEmpty(value) && Validator.isAlphanumeric(String(value).replace(/\s+/g, ''))) {
                        return Promise.resolve()
                      } else {
                        return Promise.reject('Invalid name')
                      }
                    }
                  }
                }
              ]}
            >
              <Input type='text' />
            </Form.Item>
            <Form.Item
              label='Proof Of Transaction with Supplier'
              name='proofFertilizer'
              extra={<Text type='secondary'>Upload a proof that you transacted with Supplier. i.e., receipt image</Text>}
              rules={[
                {
                  required: true,
                  message: 'Required!'
                }
              ]}
            >
              <Input type='file' onChange={(e) => handleUpload(e, setFertilizerProof)} bordered={false} />
            </Form.Item>
          </>
        ) : null}
        {type === 'Organic' && isChecked ? (
          <>
            <Form.Item
              name='fertilizerUsed'
              label='Name of the fertilizer'
              rules={[
                {
                  validator: (rule, value) => {
                    if (isChecked && type === 'Organic') {
                      if (!Validator.isEmpty(value) && Validator.isAlphanumeric(String(value).replace(/\s+/g, ''))) {
                        return Promise.resolve()
                      } else {
                        return Promise.reject('Invalid name')
                      }
                    }
                  }
                }
              ]}
            >
              <Input type='text' />
            </Form.Item>
            <Form.Item
              name='fertilizerSupplier'
              label='Your fertilizer supplier'
              rules={[
                {
                  validator: (rule, value) => {
                    if (isChecked && type === 'Organic') {
                      if (!Validator.isEmpty(value) && Validator.isAlphanumeric(String(value).replace(/\s+/g, ''))) {
                        return Promise.resolve()
                      } else {
                        return Promise.reject('Invalid supplier')
                      }
                    }
                  }
                }
              ]}
            >
              <Input type='text' />
            </Form.Item>
            <Form.Item
              label='Proof Of Transaction with Supplier'
              name='proofFertilizer'
              extra={<Text type='secondary'>Upload a proof that you transacted with Supplier. i.e., receipt image</Text>}
              rules={[
                {
                  required: true,
                  message: 'Required!'
                }
              ]}
            >
              <Input type='file' onChange={(e) => handleUpload(e, setFertilizerProof)} bordered={false} />
            </Form.Item>
          </>
        ) : null}
      </Form>
    </Modal>
  )
}

Preparation.propTypes = {
  visible: PropTypes.bool,
  onCreate: PropTypes.func,
  onCancel: PropTypes.func,
  tokenId: PropTypes.string,
}

export default Preparation

