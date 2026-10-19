import {
  IsString,
  IsOptional,
  IsIn,
  Min,
  Max,
  IsInt,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';

export class CreateTripDto {
  @IsString()
  @IsNotEmpty()
  destination: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsIn(['month', 'dateRange'])
  periodType?: 'month' | 'dateRange';

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(12)
  month?: number;

  @IsOptional()
  @IsInt()
  @Min(2026)
  year?: number;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}
