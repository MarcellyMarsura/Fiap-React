import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { useEffect, useState } from "react";
import Lista from './Lista.js';
import 'bootstrap/dist/css/bootstrap.css';
import Cartao from './Cartao';

function App() {


  const [usuarios, setUsuarios] = useState([]);
  const [id,setId] = useState("");
  const [nome,setNome] = useState("");
  const [email,setEmail] = useState("");
  const [senha,setSenha] = useState("");

  
  function salvarFormulario(){
      

      let parametros = {
          name: nome,
          email: email,
          password: senha
      }
      axios.post('https://iot.14mob.com/api-fiap/public/index.php/users', parametros).then(response => {
          if(response.status == 201){
              alert('Ebaaaaa deu certo')
              atualizarLista();
          }else{
              alert('lascou')
          }
      }).catch( error => console.log(error));

  }

  

  function atualizarUsuarioApi(){

      let parametros = {
          name: nome,
          email: email,
          password: senha
      }
      axios.put('https://iot.14mob.com/api-fiap/public/index.php/users/'+ id, parametros).then(response => {
          if(response.status == 200){
              alert('Ebaaaaa deu certo')
              atualizarLista();
          }else{
              alert('lascou')
          }
      }).catch( error => console.log(error));
  }

  function atualizarUsuario(usuario){
      setId(usuario.id);
      setNome(usuario.name);
      setEmail(usuario.email);
      setSenha(usuario.password);
  }

  function atualizarLista(){
    axios.get('https://iot.14mob.com/api-fiap/public/index.php/users').then( response => {
          setUsuarios(response.data.users);
      })
    limpaDados();
  }
  
  function limpaDados(){
    setId("");
    setNome("");
    setEmail("");
    setSenha("");
  }
  
useEffect(() => {
  atualizarLista();
  },[])


return (
    <div className='container'>
      <Cartao titulo="Cadastro de Usuário">
      <form className="formulario" onSubmit={event => {
          event.preventDefault();
          if(id != ''){
              atualizarUsuarioApi()
          }else{
              salvarFormulario();
          }
          
          return false;
      } } > 
        <div id='box'>
          <div class="mb-3">
            <label className="form-label">Nome</label>
            <input name="name" class="form-control" type="text" value={ nome }  onChange={ e => setNome(e.target.value) } />
          </div>
          <div class="mb-3">
            <label className="form-label">E-mail</label>
            <input name="email" class="form-control" type="email" value={ email } onChange={ e => setEmail(e.target.value) } />
          </div>
          <div class="mb-3">
            <label className="form-label">Senha</label>
            <input name="password" class="form-control" type="password" value={ senha } onChange={ e => setSenha(e.target.value) } />
          </div>
        </div>
        <button className="btn btn-primary" type="submit">Cadastrar</button>
      </form>
      </Cartao>
      

      <Cartao titulo="Usuários cadastrados">
        <Lista 
        usuarios={usuarios} 
        atualizarLista = { e => atualizarLista() } 
        onEditar= { usuario => atualizarUsuario(usuario) } ></Lista>
      </Cartao>
      

  </div>
    
    
);

  
}

export default App;