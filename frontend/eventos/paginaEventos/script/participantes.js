
window.onload = function() {
    carregarEventos();
    monitorarAtualizacoes(); // Inicia o "auto refresh"
};

function carregarEventos() {
    const eventosCadastrados = JSON.parse(localStorage.getItem('eventos')) || [];

    // Preencher o SELECT de eventos
    const selectEvento = document.getElementById('eventoParticipante');
    selectEvento.innerHTML = ''; // Evita duplicação
    eventosCadastrados.forEach(evento => {
        const option = document.createElement('option');
        option.value = evento.id;
        option.textContent = evento.nome;
        selectEvento.appendChild(option);
    });

    atualizarTabela(eventosCadastrados);
}

document.getElementById('formInscricao').addEventListener('submit', function(event) {
    event.preventDefault();

    const equipeParticipante = document.getElementById('equipeParticipante').value;
    const eventoId = parseInt(document.getElementById('eventoParticipante').value);

    let eventosCadastrados = JSON.parse(localStorage.getItem('eventos')) || [];
    const eventoSelecionado = eventosCadastrados.find(evento => evento.id === eventoId);

    if (eventoSelecionado) {
        // Garante que a propriedade participantes é um array
        if (!eventoSelecionado.participantes) {
            eventoSelecionado.participantes = [];
        }

        eventoSelecionado.participantes.push({ equipe: equipeParticipante });

        // Salva os eventos atualizados no localStorage
        localStorage.setItem('eventos', JSON.stringify(eventosCadastrados));
        document.getElementById('formInscricao').reset();

        carregarEventos(); // Atualiza a UI dinamicamente
    } else {
        console.error("Evento não encontrado.");
    }
});

function atualizarTabela(eventosCadastrados) {
    const tabela = document.getElementById('tabelaClassificacao').getElementsByTagName('tbody')[0];
    tabela.innerHTML = ''; // Limpa a tabela antes de atualizar

    eventosCadastrados.forEach(evento => {
        if (evento.participantes) {
            evento.participantes.forEach(participante => {
                const row = tabela.insertRow();
                row.innerHTML = `
                    <td>${evento.nome}</td>
                    <td>${participante.equipe || '-'}</td>
                `;
            });
        }
    });
}

function monitorarAtualizacoes(intervalo = 1000) {
    let cache = localStorage.getItem('eventos');

    setInterval(() => {
        const atual = localStorage.getItem('eventos');
        if (atual !== cache) {
            cache = atual;
            carregarEventos();
        }
    }, intervalo);
}
