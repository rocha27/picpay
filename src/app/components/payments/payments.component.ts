import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PaymentsService } from './payments.service';
import { CurrencyPipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  date: string;
  title: string;
  isPayed: boolean;
  username: string;
  value: number;
  __v: number;
}

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent implements OnInit {
  dados: UserData[] = [];
  cliente: any;
  filteredDados: UserData[] = this.dados;
  filterDados = '';
  dadosIndex = 0;
  dadosSize = 10;
  displayModalCreate!: boolean;
  displayModalEdit!: boolean;

  username = '';
  firstName = '';
  lastName = '';
  title = '';
  value!: number;

  constructor(
    private service: PaymentsService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe((response) => {
      this.dados = response.items;
      this.filteredDados = [...this.dados];
    });
  }

  get maxPageIndexDados() {
    return Math.ceil(this.filteredDados.length / this.dadosSize) - 1;
  }

  applyFilterDados() {
    const filterDados = this.filterDados.trim().toLowerCase();
    let filterDadosBool: boolean | null = null;
    if (filterDados === 'pago') {
      filterDadosBool = true;
    } else if (filterDados === 'devendo') {
      filterDadosBool = false;
    }
    let datePipe = new DatePipe('en-US');
    let currencyPipe = new CurrencyPipe('pt-BR');
    this.filteredDados = this.dados.filter((row) => {
      let rowDataFormatada = datePipe.transform(row.date, 'dd/MM/yyyy');
      let rowValueStr = currencyPipe.transform(
        row.value,
        'BRL',
        'symbol',
        '1.2-2'
      );
      return (
        row.firstName.toLowerCase().includes(filterDados) ||
        row.isPayed === filterDadosBool ||
        row.title.toLowerCase().includes(filterDados) ||
        rowValueStr?.toLowerCase().includes(filterDados) ||
        rowDataFormatada?.toLowerCase().includes(filterDados)
      );
    });
    this.dadosIndex = 0;
  }

  previousPageDados() {
    this.dadosIndex--;
  }

  nextPageDados() {
    this.dadosIndex++;
  }

  showModalDialogCreate() {
    this.username = '';
    this.firstName = '';
    this.lastName = '';
    this.title = '';
    this.value = 0;
    this.displayModalCreate = true;
  }

  showModalDialogEdit(dados: any) {
    this.cliente = dados._id;
    this.username = dados.username;
    this.firstName = dados.firstName;
    this.lastName = dados.lastName;
    this.title = dados.title;
    this.value = dados.value;
    this.displayModalEdit = true;
  }

  create() {
    let currentDate = new Date();
    let currentDateStr = currentDate.toISOString();
    let requisicao = {
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      title: this.title,
      value: this.value,
      date: currentDateStr,
    };

    if (
      requisicao.username &&
      requisicao.firstName &&
      requisicao.lastName &&
      requisicao.title &&
      requisicao.value
    ) {
      this.service.create(requisicao).subscribe((response) => {
        if(response.message === 'Payment has been created successfully') {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Cliente adicionado',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao adicionar',
            detail: 'Tente mais tarde',
          });
        }
        this.findAll();
      });
      this.displayModalCreate = false;
    } else {
      this.messageService.add({
        severity: 'info',
        summary: 'Preencha os campos',
        detail: 'Todos os campos são obrigatórios',
      });
    }
  }

  edit() {
    let currentDate = new Date();
    let currentDateStr = currentDate.toISOString();
    let requisicao = {
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      title: this.title,
      value: this.value,
      date: currentDateStr,
    };

    this.service.edit(this.cliente, requisicao).subscribe((response) => {
      if (response.message === 'Payment has been successfully updated') {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Cliente editado',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error ao editar',
          detail: 'Teste mais tarde',
        });
      }
      this.findAll();
    });
    this.displayModalEdit = false;
  }

  editPayed(dados: any) {
    let requisicao = {
      username: dados.username,
      firstName: dados.firstName,
      lastName: dados.lastName,
      title: dados.title,
      value: dados.value,
      isPayed: !dados.isPayed,
      date: dados.date,
    };

    this.service.editPayed(dados._id, requisicao).subscribe((response) => {
      this.findAll();
    });
  }

  onIsPayedChange(row: any) {
    // Atualize o valor de isPayed para o item correspondente
    row.isPayed = !row.isPayed;

    // Chame sua função editPayed com o item atualizado
    this.editPayed(row);
  }

  delete(id: any) {
    this.service.delete(id).subscribe((response) => {
      if (response.message === 'Payment has been deleted') {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Cliente excluído',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao excluir',
          detail: 'Tente mais tarde',
        });
      }
      this.findAll();
    });
  }
}
