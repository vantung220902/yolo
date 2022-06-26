
export interface ICategory {
    id: string;
    title: string;
}


export class ResponseListCategory implements IResponse {
    code!: number;
    success!: boolean;
    message?: string | undefined;
    categories!: ICategory[]
}