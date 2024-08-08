import React, { useState, useEffect } from 'react';
import TransactionTable from './components/TransactionTable';
import AddTransactionForm from './components/AddTransactionForm';
import SearchBar from './components/SearchBar';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("description");

  useEffect(() => {
    fetch('http://localhost:8001/transactions')
      .then(response => response.json())
      .then(data => setTransactions(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleAddTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleDeleteTransaction = (id) => {
    // Update the state to remove the deleted transaction
    setTransactions(transactions.filter(transaction => transaction.id !== id));

    // Optionally, send a DELETE request to the server
    fetch(`http://localhost:8001/transactions/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          console.log('Transaction deleted');
        } else {
          console.error('Error deleting transaction');
        }
      })
      .catch(error => console.error('Error deleting transaction:', error));
  };

  // Filter transactions based on search term
  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return -1;
    if (a[sortBy] > b[sortBy]) return 1;
    return 0;
  });

  return (
    <div>
      <h1>Bank Transactions</h1>
      <SearchBar onSearch={handleSearch} />
      <AddTransactionForm onAdd={handleAddTransaction} />
      <select onChange={handleSortChange} value={sortBy}>
        <option value="description">Description</option>
        <option value="category">Category</option>
      </select>
      <TransactionTable transactions={sortedTransactions} onDelete={handleDeleteTransaction} />
    </div>
  );
}

export default App;

