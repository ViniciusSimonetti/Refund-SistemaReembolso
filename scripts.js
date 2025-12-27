//Seleciona os elementos do Formulario.
const form = document.querySelector("form");
const amount = document.getElementById("amount"); 
const expense = document.getElementById("expense");
const category = document.getElementById("category");




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
       
    } catch (error) {
        alert("Nao foi possivel adicionar uma nova despesa")
        console.log(error)
    }
}