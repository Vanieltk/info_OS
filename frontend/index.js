const frm =document.querySelector("form")
const divAlert = document.querySelector('.alert')

frm.addEventListener("submit", async(e)=>{
    e.preventDefault()

    const url ="http://localhost:3000/equipamentos"

    const formData = new FormData()

    formData.append("equipamento", frm.equipamento.value)
    formData.append("nome", frm.nome.value)
    formData.append("modelo", frm.modelo.value)
    formData.append("foto", frm.foto.files[0])

    const response = await fetch(url,{
        method: "POST",
        body:formData

    })
    const resposta = await response.json 
    console.log (resposta)
   if(response.status =201){
       divAlert.className ="alert alert-success mt-3"
       divAlert.innerText ="Feito, OS Cadastrada Com Sucesso"
   }else{
       divAlert.className = "alert alert-danger mt-3";
       divAlert.innerText = "Erro"
   }
    frm.reset();
    frm.nome.focus();
})



