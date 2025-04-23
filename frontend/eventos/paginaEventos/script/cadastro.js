document.getElementById('formEvento').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o comportamento padrão de enviar o formulário

    // Coleta os valores dos campos do formulário
    const nomeEvento = document.getElementById('nomeEvento').value;
    const modalidadeEvento = document.getElementById('modalidadeEvento').value;
    const res = document.getElementById('res');

    // Coleta os requisitos selecionados
    const checkboxes = document.querySelectorAll('#requisitosEvento input[type="checkbox"]');
    const requisitosEvento = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    // Valida se algum requisito foi selecionado
    if (requisitosEvento.length === 0) {
        res.innerHTML = "<span style='color: red;'>Selecione pelo menos um requisito.</span>";
        return;
    }

    // Gera um ID único para o evento
    const eventoId = new Date().getTime();

    // Cria o objeto evento
    const evento = {
        id: eventoId,
        nome: nomeEvento,
        modalidade: modalidadeEvento,
        requisitos: requisitosEvento,
        equipes: [] // Inicializa a lista de equipes vazia
    };

    // Recupera os eventos existentes ou cria um novo array se não houver eventos
    let eventosCadastrados = JSON.parse(localStorage.getItem('eventos')) || [];
    
    // Adiciona o novo evento à lista
    eventosCadastrados.push(evento);

    // Salva os eventos atualizados no localStorage
    localStorage.setItem('eventos', JSON.stringify(eventosCadastrados));

    // Limpa o formulário e exibe uma mensagem de sucesso
    document.getElementById('formEvento').reset();
    res.innerHTML = "<span style='color: green;'>Evento cadastrado com sucesso!</span>";
});

// Função de autoatualização da página
function autoAtualizar(intervalo = 30000) { // 30 segundos por padrão
    setInterval(() => {
        // Recarga os dados sem precisar recarregar a página
        carregarEventos();
    }, intervalo);
}

// Função para carregar os eventos
function carregarEventos() {
    let eventosCadastrados = JSON.parse(localStorage.getItem('eventos')) || [];
    const eventosListados = document.getElementById('eventosListados');

    // Limpa a lista de eventos existentes antes de repovoar
    eventosListados.innerHTML = '';

    if (eventosCadastrados.length === 0) {
        eventosListados.innerHTML = '<p>Não há eventos cadastrados.</p>';
        return;
    }

    // Preenche os eventos na tela
    eventosCadastrados.forEach((evento, index) => {
        const eventoBox = document.createElement('div');
        eventoBox.classList.add('boxEvento');

        // Equipes
        let equipesHTML = '';
        if (evento.equipes.length > 0) {
            evento.equipes.forEach(equipe => {
                equipesHTML += `<p></p> (Membros: ${equipe.membros.join(', ')})</p>`;
            });
        } else {
            equipesHTML = '<p>Sem equipes cadastradas.</p>';
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

        if (evento.equipes.length > 0) {
            evento.equipes.forEach(equipe => {
                const option = document.createElement('option');
                option.value = equipe.nome;
                option.textContent = `${equipe.equipe} (Membros: ${equipe.membros.join(', ')})`;
                if (evento.resultado === equipe.equipe) {
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
            <h3><strong>[COMPETIÇÃO]</strong> ${evento.equipe}</h3>
            <p><strong>Modalidade:</strong> ${evento.modalidade}</p>
            <p class="requisitos"><strong>Requisitos:</strong> ${evento.requisitos.join(', ')}</p>
            <br>
            <h4>Equipes:</h4>
            ${equipesHTML}
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
                carregarEventos(); // Atualiza os eventos
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
}

// Chama a função de autoatualização
autoAtualizar(10000); // Atualiza a cada 10 segundos
