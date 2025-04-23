window.onload = function () {
    let eventosCadastrados = JSON.parse(localStorage.getItem('eventos')) || [];

    if (eventosCadastrados.length === 0) {
        document.getElementById('eventosListados').innerHTML = '<p>Não há eventos cadastrados.</p>';
        return;
    }

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

        // Campo SELECT de vencedor
        const vencedorLabel = document.createElement('label');
        vencedorLabel.innerHTML = '<strong>Selecionar Vencedor:</strong>';
        vencedorLabel.style.marginTop = '10px';

        const selectVencedor = document.createElement('select');
        selectVencedor.style.padding = '8px';
        selectVencedor.style.border = '1px solid #ccc';
        selectVencedor.style.borderRadius = '4px';
        selectVencedor.style.marginTop = '5px';
        selectVencedor.style.width = '100%';

        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = '-- Selecione o vencedor --';
        selectVencedor.appendChild(defaultOption);

        if (evento.participantes && evento.participantes.length > 0) {
            evento.participantes.forEach(participante => {
                const option = document.createElement('option');
                option.value = participante.nome;
                option.textContent = `${participante.nome} (${participante.equipe})`;
                if (evento.resultado === participante.nome) {
                    option.selected = true;
                }
                selectVencedor.appendChild(option);
            });
        }

        const salvarResultadoBtn = document.createElement('button');
        salvarResultadoBtn.textContent = 'Salvar Resultado';
        salvarResultadoBtn.style.marginTop = '10px';
        salvarResultadoBtn.style.backgroundColor = '#3498db';
        salvarResultadoBtn.style.color = 'white';
        salvarResultadoBtn.style.border = 'none';
        salvarResultadoBtn.style.padding = '8px 16px';
        salvarResultadoBtn.style.borderRadius = '6px';
        salvarResultadoBtn.style.cursor = 'pointer';

        const res = document.createElement('div');
        res.id = `res-${index}`;
        res.style.marginTop = '8px';
        res.style.color = 'green';

        salvarResultadoBtn.onclick = () => {
            const vencedorSelecionado = selectVencedor.value;
            if (!vencedorSelecionado) {
                res.innerHTML = "Por favor, selecione um vencedor.";
                return;
            }

            eventosCadastrados[index].resultado = vencedorSelecionado;
            localStorage.setItem('eventos', JSON.stringify(eventosCadastrados));
            res.innerHTML = `Vencedor salvo: <strong>${vencedorSelecionado}</strong>`;
        };

        // Preenche o HTML do evento
        eventoBox.innerHTML = `
            <h3><strong>[COMPETIÇÃO]</strong> ${evento.nome}</h3>
            <p><strong>Modalidade:</strong> ${evento.modalidade}</p>
            <p class="requisitos"><strong>Requisitos:</strong> ${evento.requisitos}</p>
            <h4>Participantes:</h4>
            ${participantesHTML}
        `;

        // Botão de deletar
        const btnDeletar = document.createElement('button');
        btnDeletar.textContent = ' Deletar';
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
                location.reload();
            }
        };

        // Adiciona elementos ao evento
        eventoBox.appendChild(vencedorLabel);
        eventoBox.appendChild(selectVencedor);
        eventoBox.appendChild(salvarResultadoBtn);
        eventoBox.appendChild(res);
        eventoBox.appendChild(btnDeletar);

        // Mostra na tela
        document.getElementById('eventosListados').appendChild(eventoBox);
    });
};
