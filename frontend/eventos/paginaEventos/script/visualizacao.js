window.onload = function () {
    // Recupera os eventos cadastrados do localStorage
    let eventosCadastrados = JSON.parse(localStorage.getItem('eventos')) || [];

    // Se não houver eventos cadastrados, exibe uma mensagem informando
    if (eventosCadastrados.length === 0) {
        document.getElementById('eventosListados').innerHTML = '<p>Não há eventos cadastrados.</p>';
        return;
    }

    // Exibe os eventos em caixas
    eventosCadastrados.forEach((evento, index) => {
        const eventoBox = document.createElement('div');
        eventoBox.classList.add('boxEvento');

        // Participantes
        let participantesHTML = '';
        if (evento.participantes && evento.participantes.length > 0) {
            evento.participantes.forEach(participante => {
                participantesHTML += `<p><strong>${participante.nome}</strong> (${participante.equipe})</p>`;
            });
        } else {
            participantesHTML = '<p>Sem participantes cadastrados.</p>';
        }

        // Preenche a caixa com as informações do evento
        eventoBox.innerHTML = `
            <h3>${evento.nome}</h3>
            <p><strong>Modalidade:</strong> ${evento.modalidade}</p>
            <p class="requisitos"><strong>Requisitos:</strong> ${evento.requisitos}</p>
            <h4>Participantes:</h4>
            ${participantesHTML}
        `;

        // Botão de deletar
        const btnDeletar = document.createElement('button');
        btnDeletar.textContent = '🗑️ Deletar';
        btnDeletar.style.marginTop = '10px';
        btnDeletar.style.alignSelf = 'flex-start';
        btnDeletar.style.backgroundColor = '#e74c3c';
        btnDeletar.style.border = 'none';
        btnDeletar.style.padding = '8px 16px';
        btnDeletar.style.color = 'white';
        btnDeletar.style.borderRadius = '6px';
        btnDeletar.style.cursor = 'pointer';

        btnDeletar.onclick = () => {
            if (confirm(`Tem certeza que quer deletar o evento "${evento.nome}"?`)) {
                eventosCadastrados.splice(index, 1);
                localStorage.setItem('eventos', JSON.stringify(eventosCadastrados));
                location.reload(); // recarrega a página pra refletir a mudança
            }
        };

        eventoBox.appendChild(btnDeletar);

        // Adiciona o evento à lista de eventos na página
        document.getElementById('eventosListados').appendChild(eventoBox);
    });
};
