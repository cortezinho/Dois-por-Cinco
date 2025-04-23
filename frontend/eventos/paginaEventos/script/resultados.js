window.onload = function () {
    const eventos = JSON.parse(localStorage.getItem('eventos')) || [];

    const container = document.getElementById('resultados');

    if (eventos.length === 0) {
        container.innerHTML = '<p>Não há resultados cadastrados.</p>';
        return;
    }

    eventos.forEach(evento => {
        const resultadoBox = document.createElement('div');
        resultadoBox.classList.add('boxEvento'); // Pode reaproveitar o estilo

        resultadoBox.innerHTML = `
            <h3>${evento.nome}</h3>
            <p><strong>Modalidade:</strong> ${evento.modalidade}</p>
            <p><strong>Resultado:</strong> ${evento.resultado || 'Resultado ainda não informado.'}</p>
        `;

        container.appendChild(resultadoBox);
    });
};
