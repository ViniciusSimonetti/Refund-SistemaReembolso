//Seleciona os elementos do Formulario.
const form = document.querySelector("form");
const amount = document.getElementById("amount"); 
const expense = document.getElementById("expense");
const category = document.getElementById("category");

//Seleciona os elementos da lista
const expenseList = document.querySelector("ul");


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

function ExpenseAdd(newExpense){
    try {
    //cria um elemento para adicionar o item na lista.
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense")

     //Cria o icone da categoria 
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name)

    // Cria a informacao da despesa 
    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info")   

    //Cria o nome da despesa
    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;

    //Cria a categoria da despesa
    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;
    
    //Adiciona o nome e a categoria na div das informacoes da despesa 
    expenseInfo.append(expenseName, expenseCategory);

   //Cria o valor da despesa
    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML = `<small>R$</small> ${newExpense.amount.
     toUpperCase().
     replace("R$", "")}`

    //adiciona as informacoes do item
     expenseItem.append(expenseIcon, expenseInfo, expenseAmount);

    //Adiciona o item na lista 
     expenseList.append(expenseItem)
    } catch (error) {
        alert("Nao foi possivel adicionar uma nova despesa")
        console.log(error)
    }
}

