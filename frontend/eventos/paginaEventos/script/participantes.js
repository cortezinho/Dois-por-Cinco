window.onload = function() {
    let eventosCadastrados = JSON.parse(localStorage.getItem('eventos')) || [];
    const selectEvento = document.getElementById('eventoParticipante');

    // Preencher o select de eventos
    eventosCadastrados.forEach(evento => {
        const option = document.createElement('option');
        option.value = evento.id;
        option.textContent = evento.nome;
        selectEvento.appendChild(option);
    });
};

document.getElementById('formInscricao').addEventListener('submit', function(event) {
    event.preventDefault();

    const nomeParticipante = document.getElementById('nomeParticipante').value;
    const equipeParticipante = document.getElementById('equipeParticipante').value || 'Independente';
    const eventoId = parseInt(document.getElementById('eventoParticipante').value);

    let eventosCadastrados = JSON.parse(localStorage.getItem('eventos')) || [];
    const eventoSelecionado = eventosCadastrados.find(evento => evento.id === eventoId);

    if (eventoSelecionado) {
        eventoSelecionado.participantes.push({ nome: nomeParticipante, equipe: equipeParticipante });

        // Salva os eventos atualizados no localStorage
        localStorage.setItem('eventos', JSON.stringify(eventosCadastrados));
        alert('Inscrição realizada com sucesso!');
        document.getElementById('formInscricao').reset();
        atualizarTabela(eventosCadastrados);
    }
});

function atualizarTabela(eventosCadastrados) {
    const tabela = document.getElementById('tabelaClassificacao').getElementsByTagName('tbody')[0];
    tabela.innerHTML = '';

    eventosCadastrados.forEach(evento => {
        evento.participantes.forEach(participante => {
            const row = tabela.insertRow();
            row.innerHTML = `
                <td>${evento.nome}</td>
                <br/>
                <td>${participante.equipe}</td>
                <br/>
                <td>${participante.nome}</td>
            `;
        });
    });
}
