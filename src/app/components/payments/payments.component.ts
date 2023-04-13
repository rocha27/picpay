import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PaymentsService } from './payments.service';
import { CurrencyPipe } from '@angular/common';

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
  filteredDados: UserData[] = this.dados;
  filterDados = '';
  dadosIndex = 0;
  dadosSize = 10;
  constructor(private service: PaymentsService) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe((response) => {
      this.dados = response.items;
      this.filteredDados = [...this.dados];
      console.log(this.dados);
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
}
