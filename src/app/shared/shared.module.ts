import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {QuillModule} from "ngx-quill";
import {FilterPipe} from "../pipes/filter.pipe";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {LoadingComponent} from "../loading/loading.component";

@NgModule({
    declarations: [
      FilterPipe,
      LoadingComponent,
    ],
    imports: [
      HttpClientModule,
      QuillModule.forRoot(),
      MatProgressSpinnerModule,
    ],
  exports: [
    HttpClientModule,
    QuillModule,
    FilterPipe,
    MatProgressSpinnerModule,
    LoadingComponent,
  ]
})
export  class SharedModule {}
