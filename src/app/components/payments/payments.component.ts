import { Component, OnInit } from '@angular/core';

interface UserData {
  nome: string;
  sobrenome: string;
}

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent implements OnInit {
  data: UserData[] = [
    { nome: 'gabriel', sobrenome: 'rocha' },
    { nome: 'felipe', sobrenome: 'silva' },
    { nome: 'rosana', sobrenome: 'pereira' },
    { nome: 'manoel', sobrenome: 'lopes' },
    { nome: 'chico', sobrenome: 'souza' },
    { nome: 'lucas', sobrenome: 'moura' },
    { nome: 'fred', sobrenome: 'guedes' },
    { nome: 'leandro', sobrenome: 'alves' },
    { nome: 'maria', sobrenome: 'julia' },
    { nome: 'bruno', sobrenome: 'barros' },
    { nome: 'cristiano', sobrenome: 'ronaldo' },
    { nome: 'yasmin', sobrenome: 'nunes' },
    { nome: 'john', sobrenome: 'mike' },
    { nome: 'mateus', sobrenome: 'carlos' },
    { nome: 'Julio', sobrenome: 'Cesar' },
  ];

  filteredData: UserData[] = this.data;
  filterValue = '';
  pageIndex = 0;
  pageSize = 7;

  constructor() {}

  ngOnInit(): void {
    this.data.sort((a, b) => a.nome.localeCompare(b.nome));
    this.applyFilter();
  }

  get maxPageIndex() {
    return Math.ceil(this.filteredData.length / this.pageSize) - 1;
  }

  applyFilter() {
    const filterValue = this.filterValue.trim().toLowerCase();
    this.filteredData = this.data.filter(
      (row) =>
        row.nome.toLowerCase().includes(filterValue) ||
        row.sobrenome.toLowerCase().includes(filterValue)
    );
    this.pageIndex = 0;
  }

  previousPage() {
    this.pageIndex--;
  }

  nextPage() {
    this.pageIndex++;
  }
}
