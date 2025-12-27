// Seleciona os elementos do Formulario.
const form = document.querySelector("form");
const amount = document.getElementById("amount"); 
const expense = document.getElementById("expense");
const category = document.getElementById("category");

// Seleciona os elementos da lista
const expenseList = document.querySelector("ul");
const expenseQuantity = document.querySelector("aside header p span");

// Captura o evento de input no campo de valor
amount.oninput = () => {
    // Remove letras e caracteres especiais, permitindo apenas números
    let value = amount.value.replace(/\D/g, "");

    //Transforma o valor em centavos (Exemplo: 150/100 = 1.50 que é equivalente a R$1,50)
    value = Number(value) / 100;

    // Atualiza o valor do input 
    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {  
    //formata o valor para o padrão BRL
    value = value.toLocaleString("pt-BR", {
        style : "currency", 
        currency : "BRL"
    })

    //Retorna o valor Formatado 
    return value; 
}

// Captura o evento de submit do formulario para obter os valores
form.onsubmit = (event) => { 
    //Previne o comportamento padrao do formulario de recarregar a pagina
    event.preventDefault();

    //Cria um objeto com os detalhes na nova despesa
    const newExpense = { 
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount : amount.value,
        created_at: new Date()

    }
    //Chama a funcao para adicionar a nova despesa
    ExpenseAdd(newExpense);
}

// Funcao para adicionar uma nova despesa na lista
function ExpenseAdd(newExpense){
    try {
    // Cria um elemento para adicionar o item na lista.
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense")

     // Cria o icone da categoria 
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name)

    // Cria a informacao da despesa 
    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info")   

    // Cria o nome da despesa
    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;

    // Cria a categoria da despesa
    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;
    
    // Adiciona o nome e a categoria na div das informacoes da despesa 
    expenseInfo.append(expenseName, expenseCategory);

   // Cria o valor da despesa
    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML = `<small>R$</small> ${newExpense.amount.
     toUpperCase().
     replace("R$", "")}`

    // Cria o Icone de Remover
    const removeIcon = document.createElement("img");
    removeIcon.classList.add("remove-icon")
    removeIcon.setAttribute("src", "img/remove.svg");  
    removeIcon.setAttribute("alt", "remover");


    // Adiciona as informacoes do item
     expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);

    // Adiciona o item na lista 
     expenseList.append(expenseItem)

     // Atualiza os totais
         updateTotals()

    } catch (error) {
        alert("Nao foi possivel adicionar uma nova despesa")
        console.log(error)
    }
}

//Funcao para atualizar os totais de despesas
function updateTotals() {
    //Implementar a logica para atualizar os totais
    try {
       //Recupera todos os itens (li) da lista (ul)
       const items = expenseList.children 
      
       //Atualiza a quantidade de despesas
       expenseQuantity.textContent = `${items.length} ${
        items.length > 1 ? "despesas" : "despesa"
 }`
    } catch (error) {
        console.log(error)
        alert("Nao foi possivel atualizar os totais")
    }
}
