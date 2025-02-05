if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js")
        .then(() => console.log("Service Worker registrado com sucesso!"))
        .catch((error) => console.log("Erro ao registrar Service Worker:", error));
}

document.addEventListener("DOMContentLoaded", function () {
    const listaLanches = document.getElementById("listaLanches");
    const listaDescartaveis = document.getElementById("listaDescartaveis");
    const ultimaModificacao = document.getElementById("ultimaModificacao");

    const itensLanches = [
        "Empada de charque", "Empada de Camarão", "Empada de Frango", "Creme de frango", "Empanada de frango", "Empanada de queijo", "Empanada de carne", 
        "Coxinha de frango", "Coxinha de camarão", "Coxinha de frango com requeijão", 
        "Risole de carne", "Empadão de frango", "Croissant", "Fatia de torta chocolate", 
        "Fatia de torta bem casado", "Fatia de torta redvelvet", "Fatia de torta ninho com Nutella",
        "Tortilete", "Base de brownie", "Brigadeiro branco", "Brigadeiro preto",
        "Massa de surpresa de uva", "Copo da felicidade ninho com Nutella", 
        "Copo da felicidade chocolate", "Copo da felicidade bem casado",
        "Bolo no pote napolitano", "Bolo no pote bem casado", "Bolo no pote chocolate",
        "Torta crocante", "Torta bem casado", "Torta chocolate", "Torta prestígio",
        "Cola coca 1 litro", "Coca cola zero lata", "Coca cola lata", "Coca de 500 ml",
        "Coca de 500 zero", "Guarana de 1 litro", "Guarana zero lata", "Guarana lata", 
        "Sprit", "Fanta lata", "H20 limonete", "H20", "Água mineral", "Água com gás", "ketchup", "Maioneze", "Mostarda", "Sal", "Açucar", "Leite", "Gelatines banana",
        "Amoras", "Cobrinhas cítricas",      "Granulado chocolate", "Gotas de chocolate", "M&M", "Jazam coloreti", "Jujuba", "Nutella", "Farinha láctea", "Caldas",
        "Morango", "Chocolate", "Kiwi", "Amora", "Frutas vermelhas", "Leite condensado", "Mel de abelha", "Mel de engenho", "Café em grãos", "Achocolatado Alpino", "Nescau", "Capuccino", "Achocolatado dois frades"
    ];

    const itensDescartaveis = [
        "Hamburguera de 300", "Hamburguera de 500", "Hamburguera grande",
        "Garfo Descartável", "Faca descartável", "Colher descartável", "Copo de água descartável",
        "Copo para suco descartável", "Copo de café pequeno", "Copo de isopor de café",
        "Tampa de suco", "Luva descartável", "Copo de sorvete", "Bolsa P", "Bolsa M",
        "Saco de lixo", "Saco azul", "Bolsa para colher", "Tampa de hamburgueira", 
        "Palito", "Canudo", "Bolsa para tapioca", "Forminhas de papel para coxinha",
        "Forminhas de papel para docinhos", "Colher de café", "Papel toalha", "Embalagem de papel pequeno", "Embalagem de papel grande", "guardanapo"
    ];

    function criarLista(itens, lista, categoria) {
        database.ref(`estoque/${categoria}`).once("value", (snapshot) => {
            const dados = snapshot.val() || {};
            lista.innerHTML = "";

            itens.forEach((item) => {
                let quantidade = dados[item] ? dados[item].quantidade : 0;
                const li = document.createElement("li");

                li.innerHTML = `
                    <span>${item}</span>
                    <input type="number" class="quantidade" value="${quantidade}" min="0" data-item="${item}" data-categoria="${categoria}">
                `;

                lista.appendChild(li);
            });

            document.querySelectorAll(".quantidade").forEach((input) => {
                input.addEventListener("change", atualizarQuantidade);
            });
        });
    }

    function atualizarQuantidade(event) {
        const input = event.target;
        const item = input.dataset.item;
        const categoria = input.dataset.categoria;
        const quantidade = parseInt(input.value) || 0;

        database.ref(`estoque/${categoria}/${item}`).set({ quantidade });

        atualizarDataModificacao();
    }

    function atualizarDataModificacao() {
        const dataHora = new Date().toLocaleString("pt-BR");
        database.ref("ultimaModificacao").set(dataHora);
    }

    database.ref("ultimaModificacao").on("value", (snapshot) => {
        ultimaModificacao.textContent = `Última modificação: ${snapshot.val() || "Nenhuma"}`;
    });

    criarLista(itensLanches, listaLanches, "lanches");
    criarLista(itensDescartaveis, listaDescartaveis, "descartaveis");
});
