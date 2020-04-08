import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import './styles.css'
import api from '../../services/api';
 

export default function Profile(){
    const [incidents, setIncidents] = useState([]);
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers:{
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]); // todas as vezes que o valor dentro da array mudar ele vai executar a função essa função vai carregar os casos


    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            //Verifica se todos os ids dos casos, o que não estiver ele ignora e deixa sempre atualizado na tela
            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch(err){
            alert('Erro ao deletar o caso, tente novamente.')
        }
    }

    //Logout do user, ele vai limpar tudo que gravamos do usuário no navegador e vai mandar ele para a página inicial
    function handleLogout(){
        localStorage.clear();

        history.push('/')
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <ul>
                {incidents.map(incident => (
                    <li key={ incident.id }>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        {/* muito importante se colocarmos apenas a função dentro do onclick ele vai apagar todos os caso pois ele estará retornando todos os casos que esse id publicou, portanto passamos uma arrow function que de fato vai executar a função */}
                        <button onClick={() => handleDeleteIncident(incident.id)} type="button"> 
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}