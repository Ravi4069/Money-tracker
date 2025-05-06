let expenses = [];
let totalAmount = 0;

const categoryInput = document.getElementById("Category");
const amountInput = document.getElementById("Amount");
const dateInput = document.getElementById("Date");
const addBtn = document.getElementById("Addbtn");
const expenseList = document.querySelector(".expense_list");
const totalDisplay = document.getElementById("Total");

addBtn.addEventListener("click", function () {
  const category = categoryInput.value;
  const amount = parseFloat(amountInput.value);
  const date = dateInput.value;

  if (!category) {
    alert("Please select a valid category.");
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }
  if (!date) {
    alert("Please select a valid date.");
    return;
  }

  const expense = { category, amount, date };
  expenses.push(expense);
  totalAmount += amount;
  updateTotal();
  addExpenseToTable(expense);
  categoryInput.value = "";
  amountInput.value = "";
  dateInput.value = "";
});

function addExpenseToTable(expense) {
  const newRow = expenseList.insertRow();

  const categoryCell = newRow.insertCell();
  const amountCell = newRow.insertCell();
  const dateCell = newRow.insertCell();
  const deleteCell = newRow.insertCell();

  categoryCell.textContent = expense.category;
  amountCell.textContent = expense.amount;
  dateCell.textContent = expense.date;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", function () {
    const index = expenses.indexOf(expense);
    if (index > -1) {
      expenses.splice(index, 1);
      totalAmount -= expense.amount;
      updateTotal();
      expenseList.removeChild(newRow);
    }
  });

  deleteCell.appendChild(deleteBtn);
}

function updateTotal() {
  totalDisplay.textContent = totalAmount.toFixed(2);
}
