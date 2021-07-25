const tbequipamentos = document.querySelector('.table')

const url = "http://localhost:3000/equipamentos/"

const inserirLinha = (...campos) => {
    const linha = tbequipamentos.insertRow(-1);

    const estilos = ["text-center", "", "", "text-center", "text-center", "text-center"];
    campos.forEach((campo, i) => {
        const coluna = linha.insertCell(-1);
        coluna.innerHTML = campo
        coluna.className = estilos[i];
    })
}

window.addEventListener("load", async () => {
    const response = await fetch(url, {
        method: "GET",
    });

    const equipamentos = await response.json();
    console.log(equipamentos)

    if (response.status == 200) {
        const acoes = '<i class="fas fa-edit mr-2" title="Alterar"></i> <i class="fas fa-trash-alt" title="Excluir"></i>'

        for (const equipamento of equipamentos) {
            const foto = `<img src="${equipamento.foto}" class="imgFoto">`
            inserirLinha(equipamento.os, equipamento.nome, equipamento.equipamento, equipamento.modelo, foto, acoes);
        }
    }
    else {
        alert(`Erro: ${equipamentos.msg}`);
    }
})

tbequipamentos.addEventListener("click", async (e) => {
    if (e.target.classList.contains("fa-trash-alt")) {
        const nome = e.target.parentElement.parentElement.children[1].innerText
        if (confirm(`Confirma exclusão da OS referente ao Cliente "${nome}"?`)) {
            const os = e.target.parentElement.parentElement.children[0].innerText

            const response = await fetch(url + os, {
                method: "delete",
            });

            if (response.status == 200) {
                e.target.parentElement.parentElement.remove()
            } else {
                const erro = await response.json()
                alert(`Erro: ${erro.msg}`)
            }
        }
    } else if (e.target.classList.contains("fa-edit")) {
        const nome = e.target.parentElement.parentElement.children[1].innerText;
        const novomodelo =(prompt(`Qual o modelo da maquina do "${nome}" correto?`));


        const os = e.target.parentElement.parentElement.children[0].innerText;

        const response = await fetch(url + os, {
            method: "put",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ modelo: novomodelo }),
        });

        if (response.status == 200) {
            e.target.parentElement.parentElement.children[3].innerText = novomodelo.toLocaleString("pt-br")
        } else {
            const erro = await response.json();
            alert(`Erro: ${erro.msg}`);
        }

    }
})