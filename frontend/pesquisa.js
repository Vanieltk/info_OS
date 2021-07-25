const frmPalavra = document.querySelector("#formPalavra");
const frmos = document.querySelector("#formos");
const divResposta = document.querySelector("#resposta");

const url = "http://localhost:3000/equipamentos/"


const exibeequipamento = ({ nome,equipamento,modelo,foto }) => {


    const html = `
  <div class="card mb-1">
    <div class="card-horizontal">
      <div>
        <img src="${foto}" alt="Equipamento ${modelo}" class="img-card">
      </div>
      <div class="card-body">
        <h4 class="card-title"> ${nome} </h4>
        <p class="card-text"> ${equipamento} </p>
        <p class="card-text">${modelo} </p>
      </div>    
    </div>
  </div>`;
    divResposta.innerHTML += html;
}

frmPalavra.addEventListener("submit", async (e) => {
    e.preventDefault(); 

    divResposta.innerHTML = "";  
    //frm.reset(); 

    const palavra = frmPalavra.palavra.value;

    const response = await fetch(url + "pesq/" + palavra, { method: "GET" });

    const equipamentos = await response.json();

    if (response.status == 200) {
        if (equipamentos.length == 0) {
            alert("Não há clinte com esse nome");
            return;
        }
        for (const equipamento of equipamentos) {
            exibeequipamento(equipamento);
        }
    } else {
        alert(`Erro: ${equipamento.msg}`);
    }
})
