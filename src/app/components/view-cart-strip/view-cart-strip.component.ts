import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/models/app-state.model';
import { Observable } from 'rxjs/index';
import { ShoppingItem, ShoppingCart } from '../../store/models/shopping.model';
import { ClearCartAction } from './../../store/actions/shopping.actions';

@Component({
  selector: 'app-view-cart-strip',
  templateUrl: './view-cart-strip.component.html',
  styleUrls: ['./view-cart-strip.component.scss'],
})
export class ViewCartStripComponent implements OnInit {

  showStrip: boolean = false;
  totalValue: number;
  count: number;
  constructor(private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.store.select(store => store.shopping.cartItems).subscribe((items: ShoppingItem[]) => {
      if (items.length) {
        this.showStrip = true;
        this.count = items.length;
        this.totalValue = Object.entries(items).reduce(function (total, pair) {
          const [key, value] = pair;
          return total + value.count * value.unit_price;
        }, 0);
      } else {
        this.showStrip = false;
        this.count = 0;
        this.totalValue = 0;
      }
    });
  }

  clear() {
    this.store.dispatch(new ClearCartAction());
  }
}
