import ExpenseDisplay from "./expense-display/ExpenseDisplay"
import ExpenseForm from "./expense-form/ExpenseForm"
import ExpenseList from "./expense-list/ExpenseList"

const index = () => {
  return (
    <div className="max-w-[1200px] mx-auto border-2 border-black flex-1 p-10 my-8">
        <ExpenseForm/>
        <div className="flex justify-between items-start gap-4">
          <ExpenseDisplay/>
          <ExpenseList/>
        </div>

    </div>
  )
}

export default index