window.onload = function () {
    renderizarEventos();
    monitorarAtualizacoesEventos(); // Liga o modo ao vivo!
};

function renderizarEventos() {
    const container = document.getElementById('eventosListados');
    container.innerHTML = ''; // Limpa antes de recriar tudo

    let eventosCadastrados = JSON.parse(localStorage.getItem('eventos')) || [];

    if (eventosCadastrados.length === 0) {
        container.innerHTML = '<p>Não há eventos cadastrados.</p>';
        return;
    }

    eventosCadastrados.forEach((evento, index) => {
        const eventoBox = document.createElement('div');
        eventoBox.classList.add('boxEvento');

        // Participantes
        let participantesHTML = '';
        if (evento.participantes && evento.participantes.length > 0) {
            evento.participantes.forEach(participante => {
                // Garante que o nome da equipe seja mostrado corretamente, mesmo se estiver faltando
                const nomeEquipe = participante.equipe ? participante.equipe : 'Equipe desconhecida';
                participantesHTML += `<p><strong>Time:</strong> ${nomeEquipe}</p>`;
            });
        } else {
            participantesHTML = '<p>Sem participantes cadastrados.</p>';
        }

        // Campo SELECT de vencedor
        const vencedorLabel = document.createElement('label');
        vencedorLabel.innerHTML = '<strong>Selecionar Vencedor:</strong>';
        vencedorLabel.style.marginTop = '10px';

        const selectVencedor = document.createElement('select');
        Object.assign(selectVencedor.style, {
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            marginTop: '5px',
            width: '100%',
        });

        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = '-- Selecione o vencedor --';
        selectVencedor.appendChild(defaultOption);

        if (evento.participantes && evento.participantes.length > 0) {
            evento.participantes.forEach(participante => {
                const option = document.createElement('option');
                option.value = participante.equipe;
                option.textContent = `${participante.equipe}`;
                if (evento.resultado === participante.equipe) {
                    option.selected = true;
                }
                selectVencedor.appendChild(option);
            });
        }

        const salvarResultadoBtn = document.createElement('button');
        salvarResultadoBtn.textContent = 'Salvar Resultado';
        Object.assign(salvarResultadoBtn.style, {
            marginTop: '10px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
        });

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

        const btnDeletar = document.createElement('button');
        btnDeletar.textContent = ' Deletar';
        Object.assign(btnDeletar.style, {
            marginTop: '10px',
            backgroundColor: '#e74c3c',
            border: 'none',
            padding: '8px 16px',
            color: 'white',
            borderRadius: '6px',
            cursor: 'pointer',
        });

        btnDeletar.onclick = () => {
            if (confirm(`Tem certeza que quer deletar o evento "${evento.nome}"?`)) {
                eventosCadastrados.splice(index, 1);
                localStorage.setItem('eventos', JSON.stringify(eventosCadastrados));
                renderizarEventos(); // Atualiza sem recarregar
            }
        };

        eventoBox.innerHTML = `
            <h3><strong>[COMPETIÇÃO]</strong> ${evento.nome}</h3>
            <p><strong>Modalidade:</strong> ${evento.modalidade}</p>
            <p class="requisitos"><strong>Requisitos:</strong> ${evento.requisitos}</p>
            <br>
            <h4>Participantes:</h4>
            ${participantesHTML}
        `;

        eventoBox.appendChild(vencedorLabel);
        eventoBox.appendChild(selectVencedor);
        eventoBox.appendChild(salvarResultadoBtn);
        eventoBox.appendChild(res);
        eventoBox.appendChild(btnDeletar);

        container.appendChild(eventoBox);
    });
}

function monitorarAtualizacoesEventos(intervalo = 1000) {
    let cache = localStorage.getItem('eventos');

    setInterval(() => {
        const atual = localStorage.getItem('eventos');
        if (atual !== cache) {
            cache = atual;
            renderizarEventos(); // Atualiza só se mudou
        }
    }, intervalo);
}
