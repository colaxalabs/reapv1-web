import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import {
  Modal,
  message,
  Form,
  Input,
  Typography,
} from 'antd'
import Validator from 'validator'

const { Text } = Typography

function MarketModal({
  visible,
  onCreate,
  cancel,
  tokenId,
  harvestSupply,
  supplyUnit,
  ethusd,
}) {

  const [form] = Form.useForm()

  return (
    <Modal
      visible={visible}
      centered
      title='Go to market'
      okText='Proceed'
      cancelText='Cancel'
      onCancel={cancel}
      onOk={() => {
        form.validateFields()
          .then((values) => {
            const _price = Number(values.price) / Number(ethusd)
            values.price = _price.toFixed(4)
            onCreate(tokenId, values, message)
            cancel()
          })
          .catch((info) => {
            console.log('validate Failed:', info)
          })
      }}
    >
      <Form
        form={form}
        layout='vertical'
        name='form_in_modal'
        initialValues={{
          supply: harvestSupply,
          unit: supplyUnit,
          price: 0,
        }}
      >
        <Form.Item
          name='supply'
          label='Supply'
          extra={<Text type='secondary'>Season supply</Text>}
        >
          <Input value={harvestSupply} disabled={true} />
        </Form.Item>
        <Form.Item
          name='unit'
          label='Supply Unit'
          extra={<Text type='secondary'>Season supply unit</Text>}
        >
          <Input value={supplyUnit} disabled={true} />
        </Form.Item>
        <Form.Item
          name='price'
          label='Price'
          extra={<Text type='secondary'>price per unit of the supply</Text>}
          rules={[
            {
              validator: (rule, value) => {
                if (Number(value) !== 0 && Validator.isFloat(value)) {
                  return Promise.resolve()
                } else {
                  return Promise.reject('Invalid price')
                }
              }
            }
          ]}
        >
          <Input addonBefore={<Text>$</Text>} type='number' addonAfter={<Text>per {supplyUnit}</Text>} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

MarketModal.propTypes = {
  visible: PropTypes.bool,
  onCreate: PropTypes.func,
  cancel: PropTypes.func,
  tokenId: PropTypes.string,
  harvestSupply: PropTypes.string,
  supplyUnit: PropTypes.string,
  ethusd: PropTypes.string,
}

function mapStateToProps(state) {
  return {
    ethusd: String(state.currency.ethusd),
  }
}

export default connect(mapStateToProps)(MarketModal)
