import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateUserDto {

    @IsString({ message: "The name is required type string" })
    readonly name: string;

    @IsString()
    readonly username: string;

    @IsString()
    readonly password: string;

    @IsString({ message: "The store is required type string" })
    readonly role: string;

    @IsBoolean()
    @IsOptional()
    readonly active?: boolean;

}