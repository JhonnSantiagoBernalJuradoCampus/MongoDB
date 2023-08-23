import { Expose } from "class-transformer";
import { IsDefined, IsInt, IsString, Matches} from "class-validator";

export default class AutomovilDto {
    @Expose({name : '_id'})
    @IsInt()
    @IsDefined({ message: 'El _id es obligatorio'})
    _id: number;
    
    @Expose({name: 'ID_Automovil'})
    @IsInt()
    @IsDefined({ message: 'El ID_Automovil es obligatorio'})
    ID_Automovil: number;

    @Expose({name: 'Marca'})
    @IsString()
    @IsDefined({message: 'La Marca es obligatoria'})
    Marca: string;

    @Expose({name: 'Modelo'})
    @IsString()
    @IsDefined({message: 'El Modelo es obligatorio'})
    Modelo: string;

    @Expose({name: 'Anio'})
    @IsInt()
    @IsDefined({message: 'El Anio es obligatorio'})
    Anio: number;

    @Expose({name: 'Tipo'})
    @IsString()
    @IsDefined({message: 'El Tipo es obligatorio'})
    Tipo: string;

    @Expose({name: "Capacidad"})
    @IsInt()
    @IsDefined({message: 'La Capacidad es obligatoria'})
    Capacidad: number;

    @Expose({name: 'Precio_Diario'})
    @IsString()
    @IsDefined({message: 'Precio_Diario'})
    Precio_Diario: string;
}

_id
"ID_Automovil"
"Marca"
"Modelo"
"Anio"
"Tipo"
"Capacidad"
"Precio_Diario"