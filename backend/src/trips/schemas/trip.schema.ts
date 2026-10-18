import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TripDocument = HydratedDocument<Trip>;

@Schema({ timestamps: true })
export class Trip {
  @Prop({ required: true })
  destination: string;

  @Prop()
  name?: string;

  @Prop()
  notes?: string;

  @Prop({ enum: ['month', 'dateRange'] })
  periodType: 'month' | 'dateRange';

  @Prop()
  month?: number;

  @Prop()
  year?: number;

  @Prop()
  startDate?: Date;

  @Prop()
  endDate?: Date;
}

export const TripSchema = SchemaFactory.createForClass(Trip);
