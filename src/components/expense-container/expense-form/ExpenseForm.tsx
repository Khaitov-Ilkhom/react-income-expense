import React from 'react';
import type {FormProps} from 'antd';
import {Button, Form, Input, InputNumber, Modal, Select, Typography} from 'antd';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../redux/store';
import {createTransaction} from '../../../redux/slices/transactionHistory';
import {ITransaction} from '../../../types';
import {useForm} from 'antd/es/form/Form';

const {Option} = Select;
const {Title} = Typography;

type FieldType = {
  name?: string;
  amount?: number;
  expense_or_income?: string;
  type?: string;
};

declare global {
  interface String {
    capitalize(): string;
  }
}

String.prototype.capitalize = function () {
  return this[0]?.toUpperCase() + this?.slice(1)
}

const ExpenseForm: React.FC = () => {
  const [form] = useForm();
  const dispatch = useDispatch<AppDispatch>();
  const [actionType, setActionType] = React.useState<'income' | 'expense'>('income');

  const [open, setOpen] = React.useState<boolean>(false);

  const openModal = () => {
    setOpen(true)
  }

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    const id = Math.floor(Math.random() * 1000000)
    const transaction = {...values, id: id} as ITransaction
    dispatch(createTransaction(transaction))
    form.resetFields();
    setOpen(false)
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
      <div>
        <Button onClick={openModal}>Create</Button>
        <Modal
            footer={null}
            open={open}
            onCancel={() => setOpen(false)}
        >
          <Form
              form={form}
              name="basic"
              layout='vertical'
              initialValues={{remember: true}}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
          >
            <Title level={2}>Create an income or expense</Title>
            <Form.Item<FieldType>
                style={{marginBottom: "6px"}}
                label="Income or Expense"
                name="expense_or_income"
                rules={[{required: true, message: 'Please input your income or expense!'}]}
            >
              <Select onChange={(value) => setActionType(value)} placeholder="Select income or expense">
                <Option value="income">Income</Option>
                <Option value="expense">Expense</Option>
              </Select>
            </Form.Item>
            <Form.Item<FieldType>
                style={{marginBottom: "6px"}}
                label={`${actionType.capitalize()} name`}
                name="name"
                rules={[{required: true, message: 'Please input your expense name!'}]}
            >
              <Input placeholder="Enter income or expense name"/>
            </Form.Item>

            <Form.Item<FieldType>
                style={{marginBottom: "6px"}}
                label={`${actionType.capitalize()} amount`}
                name="amount"
                rules={[{required: true, message: 'Please input your expense amount!'}]}
            >
              <InputNumber className='w-full' placeholder="Enter your amount"/>
            </Form.Item>

            {
              actionType && actionType === "income" ? <Form.Item<FieldType>
                      style={{marginBottom: "12px"}}
                      label={`${actionType.capitalize()} type`}
                      name="incomeType"
                      rules={[{required: true, message: 'Please select your income type!'}]}
                  >
                    <Select placeholder="Select income type">
                      <Option value="salary">Salary</Option>
                      <Option value="bonus">Bonus</Option>
                      <Option value="freelance">Freelance</Option>
                      <Option value="investment">Investment</Option>
                      <Option value="rental">Rental Income</Option>
                      <Option value="dividends">Dividends</Option>
                      <Option value="interest">Interest</Option>
                      <Option value="royalties">Royalties</Option>
                      <Option value="business">Business Income</Option>
                      <Option value="pension">Pension</Option>
                      <Option value="social-security">Social Security</Option>
                      <Option value="inheritance">Inheritance</Option>
                      <Option value="capital-gains">Capital Gains</Option>
                      <Option value="alimony">Alimony</Option>
                      <Option value="child-support">Child Support</Option>
                      <Option value="grants">Grants</Option>
                      <Option value="scholarships">Scholarships</Option>
                      <Option value="gifts">Gifts</Option>
                      <Option value="lottery">Lottery Winnings</Option>
                      <Option value="refunds">Refunds</Option>
                      <Option value="stipend">Stipend</Option>
                      <Option value="trust-fund">Trust Fund</Option>
                      <Option value="severance">Severance Pay</Option>
                      <Option value="insurance-claim">Insurance Claim</Option>
                      <Option value="other">Other</Option>
                    </Select>
                  </Form.Item> :
                  <Form.Item<FieldType>
                      style={{marginBottom: "12px"}}
                      label={`${actionType.capitalize()} type`}
                      name="type"
                      rules={[{required: true, message: 'Please input your expense type!'}]}
                  >
                    <Select placeholder="Select expense type">
                      <Option value="food">Food</Option>
                      <Option value="travel">Travel</Option>
                      <Option value="entertainment">Entertainment</Option>
                      <Option value="utilities">Utilities</Option>
                      <Option value="rent">Rent</Option>
                      <Option value="education">Education</Option>
                      <Option value="medical">Medical</Option>
                      <Option value="groceries">Groceries</Option>
                      <Option value="insurance">Insurance</Option>
                      <Option value="clothing">Clothing</Option>
                      <Option value="transportation">Transportation</Option>
                      <Option value="subscriptions">Subscriptions</Option>
                      <Option value="gifts">Gifts</Option>
                      <Option value="savings">Savings</Option>
                      <Option value="charity">Charity</Option>
                      <Option value="household">Household</Option>
                      <Option value="loan">Loan</Option>
                      <Option value="furniture">Furniture</Option>
                      <Option value="maintenance">Maintenance</Option>
                      <Option value="electronics">Electronics</Option>
                      <Option value="pets">Pets</Option>
                      <Option value="investments">Investments</Option>
                      <Option value="beauty">Beauty</Option>
                      <Option value="health">Health</Option>
                      <Option value="entertainment">Entertainment</Option>
                      <Option value="recreation">Recreation</Option>
                      <Option value="taxes">Taxes</Option>
                      <Option value="miscellaneous">Miscellaneous</Option>
                      <Option value="hobbies">Hobbies</Option>
                      <Option value="childcare">Childcare</Option>
                      <Option value="grooming">Grooming</Option>
                      <Option value="debt">Debt</Option>
                      <Option value="home-improvement">Home Improvement</Option>
                      <Option value="other">Other</Option>
                    </Select>
                  </Form.Item>
            }
            <Form.Item wrapperCol={{offset: 8, span: 16}}>
              <Button type="primary" htmlType="submit">
                Create an {actionType}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
  )
};

export default ExpenseForm;