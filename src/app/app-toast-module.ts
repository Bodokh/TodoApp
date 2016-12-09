import { NgModule } from '@angular/core';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';

 let options: ToastOptions = new ToastOptions(
    { positionClass: 'toast-bottom-right' }
  );


@NgModule({
  imports: [ ToastModule ],
  exports: [ ToastModule ]
})
export class AppToastModule {}