import { Routes } from '@angular/router';
import { Deposito } from './components/deposito/deposito';
import { Prelievo } from './components/prelievo/prelievo';
import { ListaMovimenti } from './components/lista-movimenti/lista-movimenti';
import { ConvertVal } from './components/convert-val/convert-val';
import { ConvertCrypto } from './components/convert-crypto/convert-crypto';
import { Saldo } from './components/saldo/saldo';
import { TransactionManager } from './components/transaction-manager/transaction-manager';

export const routes: Routes = [
    { path: 'deposito', component: Deposito },
    { path: 'prelievo', component: Prelievo },
    { path: 'movimenti', component: ListaMovimenti },
    { path: 'movimenti/:idtransaction', component: ListaMovimenti },
    { path: 'saldo', component: Saldo },
    { path: 'conversione-val', component: ConvertVal },
    { path: 'conversione-crypto', component: ConvertCrypto },
    { path: '', redirectTo: 'saldo', pathMatch: 'full' },
    { path: 'transaction/:id', component: TransactionManager },
    { path: 'history', component: ListaMovimenti },
    { path: '**', redirectTo: 'saldo' }
];
