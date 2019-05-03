import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {


  cliente: any = {
    nome: null,
    email: null,
    senha: null,
    confirmarSenha: null,
    dataNascimento: null,
    rua: "",
    bairro: "",
    numero: "",
    estado: "",
    cidade: "",
    complemento: ""
  }

  onSubmit(form){
    //console.log(form);

    this.http.post('https://httpbin.org/post', JSON.stringify(form.value));
      .map(res => res)
      .subscribe(dados => console.log(dados))
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  verificaValidTouched(campo){
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo){
    return{
        'has-error': this.verificaValidTouched(campo),
        'has-feedback': this.verificaValidTouched(campo)
    }
  }

  consultaCEP(cep, form){
    //Variável "cep" somente com dígitos
    var cep = cep.replace(/\D/g,'');

    //Verifica se o campo cep possui valor informado
    if(cep != ""){
      //Expressão regular para validar o CEP
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP
      if(validacep.test(cep)){
        //Reseta os dados do formulario ao inserir novo CEP
        this.resetaDadosForm(form);

        this.http.get(`//viacep.com.br/ws/${cep}/json`)
          .map(dados => dados)
          .subscribe(dados => this.populaDadosForm(dados, form));
      }

    }
  }
  populaDadosForm(dados, formulario){
    /*form.setValue({
      nome: formulario.value.nome,
      email: formulario.value.email,
      senha: formulario.value.senha,
      confirmarSenha: formulario.value.confirmarSenha,
      dataNascimento: formulario.value.dataNascimento,
      cep: dados.cep,
      numero: null,
      complemento: dados.complemento,
      rua: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
    });*/

    formulario.form.patchValue({
      cep: dados.cep,
      complemento: dados.complemento,
      rua: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
    })
  }

  resetaDadosForm(formulario){
    formulario.form.patchValue({
      cep: null,
      complemento: null,
      rua: null,
      bairro: null,
      cidade: null,
      estado: null
    })
  }



}
