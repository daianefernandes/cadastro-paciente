var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function(event){
    event.preventDefault();

    var form = document.querySelector("#form-adiciona");
    var paciente = obtemPacienteDoFormulario(form);

    var erros = validaPaciente(paciente);
    console.log(erros);

    if(erros.length > 0 ){
        exibeMensagensDeErro(erros);
        return;
    }

    adicionaPacientesTabela();

    form.reset();

    var mensagemErro = document.querySelector("#mensagens-erro");
    mensagemErro.innerHTML = "";

});

function adicionaPacientesTabela(paciente){
    var novoPaciente = montaTr(paciente);
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(novoPaciente);

}

function exibeMensagensDeErro(erros){
    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = "";

    erros.forEach(function(erro){
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}


function obtemPacienteDoFormulario(form){

    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }

    return paciente;
}


function montaTr(paciente){
    var novoPaciente = document.createElement("tr");
    novoPaciente.classList.add("paciente");

    novoPaciente.appendChild(montaTd(paciente.nome, "info-nome"));
    novoPaciente.appendChild(montaTd(paciente.peso, "info-peso"));
    novoPaciente.appendChild(montaTd(paciente.altura, "info-altura"));
    novoPaciente.appendChild(montaTd(paciente.gordura, "info-gordura"));
    novoPaciente.appendChild(montaTd(paciente.imc, "info-imc"));

    return novoPaciente;
}

function montaTd(dado, classe){
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);

    return td;
}

function validaPaciente(paciente){

    var erros = [];

    if(paciente.nome.length == 0) {
        erros.push("O nome é obrigatório");
    }

    if(paciente.peso.length == 0) {
        erros.push("Peso inválido!");
    }
    
    if(paciente.altura.length == 0) {
        erros.push("Altura inválida");
    }

    if(paciente.gordura.length == 0) {
        erros.push("O campo gordura deve ser preenchido");
    }

    if(!validaPeso(paciente.peso)){
        erros.push("Peso inválido");
    }

    if(!validaAltura(paciente.altura)){
        erros.push("Altura inválida");
    }
    
    return erros;
}