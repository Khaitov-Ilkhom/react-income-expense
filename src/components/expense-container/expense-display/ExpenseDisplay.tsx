import {useSelector} from "react-redux";
import {Typography} from "antd";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import currencyFormatter from 'currency-formatter';
import {Doughnut} from 'react-chartjs-2';
import type {ITransaction} from "../../../types";

const {Title} = Typography;

ChartJS.register(ArcElement, Tooltip, Legend);


const ExpenseDisplay = () => {
  const {totalAmount} = useSelector((state: any) => state.transaction)
  const {transactionHistory: {income, expense}} = useSelector((state: never) => state.transaction)
  const incomes: number = income.reduce((acc: number, b: ITransaction) => acc + b.amount, 0)
  const expenses: number = expense.reduce((acc: number, b: ITransaction) => acc + b.amount, 0)

  const data = {
    labels: [`Expense -${currencyFormatter.format(expenses, {code: 'UZS'}).replace("сўм", "UZS")}`,
      `Income +${currencyFormatter.format(incomes, {code: 'UZS'}).replace("сўм", "UZS")}`],
    datasets: [
      {
        label: '# of Votes',
        data: [expenses, incomes],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
      <div>
        <Doughnut data={data}/>
        <Title className="text-center mt-8"
               level={3}>{currencyFormatter.format(totalAmount, {code: 'UZS'}).replace("сўм", "UZS")}</Title>
      </div>
  )
}

export default ExpenseDisplay