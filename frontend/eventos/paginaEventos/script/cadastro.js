document.getElementById('formEvento').addEventListener('submit', function(event) {
    event.preventDefault();

    const nomeEvento = document.getElementById('nomeEvento').value;
    const modalidadeEvento = document.getElementById('modalidadeEvento').value;
    const requisitosEvento = document.getElementById('requisitosEvento').value;
    const res = document.getElementById('res');

    const eventoId = new Date().getTime();  // ID único para o evento

    const evento = {
        id: eventoId,
        nome: nomeEvento,
        modalidade: modalidadeEvento,
        requisitos: requisitosEvento,
        participantes: []  // Inicializa a lista de participantes
    };

    let eventosCadastrados = JSON.parse(localStorage.getItem('eventos')) || [];
    eventosCadastrados.push(evento);
    localStorage.setItem('eventos', JSON.stringify(eventosCadastrados));

    //alert('Evento cadastrado com sucesso!');
    document.getElementById('formEvento').reset();
    res.innerHTML = "Evento cadastrado com sucesso"
});
