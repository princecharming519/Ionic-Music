import { NgModule } from '@angular/core';
import { DateConvertorPipe } from './date-convertor/date-convertor';
import {CalanderConvertorPipe} from "./date-convertor/calander";
@NgModule({
	declarations: [DateConvertorPipe,CalanderConvertorPipe],
	imports: [],
	exports: [DateConvertorPipe,CalanderConvertorPipe]
})
export class PipesModule {}
