

export class Category implements ICategory {
    name: string;
    field1: IField;
    field2: IField;
    field3: IField;
    field4: IField;

    constructor() {
        this.name = '';
        this.field1 = { name: '', value: '' };
        this.field2 = { name: '', value: '' };
        this.field3 = { name: '', value: '' };
        this.field4 = { name: '', value: '' };
    }
}