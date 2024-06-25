let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
    //só foi possivel usar o responsiveVoice pq foi importado no html pelo script   
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1','jogo do número secreto');
    exibirTextoNaTela('p','Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;

    if(chute == numeroSecreto){
        exibirTextoNaTela('h1', 'acertou');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if(chute > numeroSecreto){
            exibirTextoNaTela('p', 'o número secreto é menor');
        }else{
            exibirTextoNaTela('p', 'o número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio(){//includes verifica se tem algo dentro da lista
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElemtosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElemtosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido);//push pega e coloca o elemento ao final da 
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}



//let titulo = document.querySelector('h1'); //cria a variavel titulo e seleciona o h1 do html 
//titulo.innerHTML = 'jogo do número secreto';//add um texto para o h1

//let paragrafo = document.querySelector('p');//seleciona o paragrafo do html
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10'; //add um texto no paragrafo
