import axios from "axios";
//import { useEffect, useState } from "react";

function Lista(props){
    
    function removerUsuario(id){
        axios.delete("https://iot.14mob.com/api-fiap/public/index.php/users/" + id).then( response => {
            alert('Deu certo removi o usuario')
            props.atualizarLista()
        }).catch( error => console.log(error));
  
    }

    return(
        <table className='minhaTabela table'>
          <thead>
              <tr>
              <th itemScope="col">ID</th>
              <th itemScope="col">Nome</th>
              <th itemScope="col">Email</th>
              <th itemScope="col">Ações</th>
              </tr>
          
          </thead>  
          <tbody> 
              { props.usuarios.map( usuario => {
                  return (
                      <tr key={usuario.id} itemScope="row">
                          <td>{usuario.id}</td>
                          <td>{usuario.name}</td>
                          <td>{usuario.email}</td>
                          <td>
                              <button className="btn btn-secondary" onClick={ event => props.onEditar(usuario) } > Editar </button>
                              <button className="btn btn-danger" onClick={ event => removerUsuario(usuario.id) } > Deletar </button>
                          </td>
                          
                      </tr>
                      )
              } ) }
          </tbody>
      </table>
    )
}

export default Lista;