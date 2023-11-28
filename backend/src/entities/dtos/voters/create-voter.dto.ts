import { IsString } from "class-validator";

export class CreateVoterDto {

    @IsString()
    readonly full_name: string;

    @IsString()
    readonly identification_card: string;

    @IsString()
    readonly address: string;

    @IsString()
    readonly ecid: string;

    readonly uid?: any;
}