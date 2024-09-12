import {useDispatch, useSelector} from "react-redux"
import {Typography} from "antd"
import {ITransaction} from "../../../types"
import currencyFormatter from "currency-formatter";
import {MdDelete} from "react-icons/md";
import {AppDispatch} from "../../../redux/store";
import {removeTransaction} from "../../../redux/slices/transactionHistory.ts";

const {Title} = Typography

declare global {
  interface String {
    capitalize(): string;
  }
}

String.prototype.capitalize = function () {
  return this[0]?.toUpperCase() + this?.slice(1)
}

const ExpenseList = () => {
  const {transactionHistory: {income, expense}} = useSelector((state: never) => state.transaction)
  const dispatch = useDispatch<AppDispatch>()

  const removeTransactions = (item) => {
    dispatch(removeTransaction(item))
  }

  return (
      <div className="min-w-[600px] flex gap-4">
        <div className="flex flex-1 flex-col gap-1">
          <Title level={3}>Income</Title>
          {
            income.length === 0 ? <div>Not income</div> : income.map((item: ITransaction, index: number) => (
                <div className="flex justify-between items-center p-1" key={index}>
                  <div className="flex justify-between items-center">
                    <button className="text-red-500 active:scale-95 px-1" onClick={() => removeTransactions(item)}>
                      <MdDelete/></button>
                    {item.name.capitalize()}</div>
                  <p className="text-green-500">+{currencyFormatter.format(item.amount, {code: 'UZS'}).replace("сўм", "UZS")}</p>
                </div>
            ))
          }
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <Title level={3}>Expense {}</Title>
          {
            expense.length === 0 ? <div>Not expense</div> : expense.map((item: ITransaction, index: number) => (
                <div className="flex justify-between items-center p-1" key={index}>

                  <div className="flex justify-between items-center">
                    <button className="text-red-500 active:scale-95 px-1" onClick={() => removeTransactions(item)}>
                      <MdDelete/></button>
                    {item.name.capitalize()}</div>
                  <p className="text-red-500">-{currencyFormatter.format(item.amount, {code: 'UZS'}).replace("сўм", "UZS")}</p>
                </div>
            ))
          }
        </div>
      </div>
  )
}

export default ExpenseList