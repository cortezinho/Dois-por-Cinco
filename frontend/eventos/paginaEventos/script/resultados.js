window.onload = function () {
    renderizarResultados();
    monitorarAtualizacoesResultados(); // 🚀 Ativa o auto refresh
};

function renderizarResultados() {
    const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
    const container = document.getElementById('resultados');
    container.innerHTML = ''; // Limpa antes de renderizar de novo

    if (eventos.length === 0) {
        container.innerHTML = '<p>Não há resultados cadastrados.</p>';
        return;
    }

    eventos.forEach(evento => {
        const resultadoBox = document.createElement('div');
        resultadoBox.classList.add('boxEvento');

        const status = evento.resultado ? 'CAMPEONATO ENCERRADO' : 'EM ANDAMENTO';
        const resultadoTexto = evento.resultado
            ? `<strong>Resultado:</strong> ${evento.resultado} <strong>Campeão</strong>`
            : '<strong>Resultado:</strong> Ainda não informado.';

        const statusSpan = document.createElement('span');
        statusSpan.textContent = ` - ${status}`;
        statusSpan.classList.add('status', evento.resultado ? 'encerrado' : 'andamento');

        resultadoBox.innerHTML = `
            <h3>[CAMPEONATO] ${evento.nome}</h3>
            <p><strong>Modalidade:</strong> ${evento.modalidade}</p>
            <p>${resultadoTexto}</p>
        `;

        resultadoBox.querySelector('h3').appendChild(statusSpan);
        container.appendChild(resultadoBox);
    });
}

function monitorarAtualizacoesResultados(intervalo = 1000) {
    let cache = localStorage.getItem('eventos');

    setInterval(() => {
        const atual = localStorage.getItem('eventos');
        if (atual !== cache) {
            cache = atual;
            renderizarResultados(); // Só atualiza se os dados mudarem
        }
    }, intervalo);
}
