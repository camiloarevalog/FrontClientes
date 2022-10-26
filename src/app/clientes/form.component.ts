import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  public cliente: Cliente = new Cliente();
  public titulo: string = 'Crear cliente';

  public errores!: string[];

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarCliente();
  }

  public create(): void {
    this.clienteService.create(this.cliente).subscribe(
      (cliente) => {
        this.router.navigate(['/clientes']);
        Swal.fire(
          'Nuevo cliente',
          ` El cliente ${cliente.nombre} ha sido creado con éxito`,
          'success'
        );
      },
      (err) => {
        this.errores = err.error.errors as string[];
        console.error(err.error.errors);
      }
    );
  }

  public cargarCliente(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.clienteService
          .getCliente(id)
          .subscribe((cliente) => (this.cliente = cliente));
      }
    });
  }

  public update(): void {
    this.clienteService.update(this.cliente).subscribe(
      (resp) => {
        this.router.navigate(['/clientes']);
        console.log('actualizado con exito');
        Swal.fire(
          'Cliente actualizado con exito',
          `${resp.mensaje}: ${resp.cliente.nombre}`,
          'success'
        );
      },
      (err) => {
        this.errores = err.error.errors as string[];
        console.error(err.error.errors);
      }
    );
  }
}
