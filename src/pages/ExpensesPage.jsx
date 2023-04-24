import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Table } from '../components/Table';
import { deleteItem, fetchData, waait } from '../helpers';

// loader
export function expensesLoader() {
  const expenses = fetchData('expenses');
  return { expenses };
}

// action
export async function expensesAction({ request }) {
  await waait();

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  // Delete Expense
  if (_action === 'deleteExpense') {
    try {
      // create budget
      deleteItem({
        key: 'expenses',
        id: values.expenseId,
      });
      return toast.success('Expense deleted!');
    } catch (e) {
      throw new Error('There was a problem deleting your expense.');
    }
  }
}

export const ExpensesPage = () => {
  const { expenses } = useLoaderData();

  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <small>({expenses.length} total)</small>
          </h2>
          <Table
            expenses={expenses.sort((a, b) => b.createdAt - a.createdAt)}
          />
        </div>
      ) : (
        <p>No Expenses to show</p>
      )}
    </div>
  );
};
