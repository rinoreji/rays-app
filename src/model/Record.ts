export class Record {
    category: string = '';
    Field1: string = '';
    Field2: string = '';
    Field3: string = '';
    Field4: string = '';
    key: string = '';
}

export class RecordWithoutKey {
    category: string = '';
    Field1: string = '';
    Field2: string = '';
    Field3: string = '';
    Field4: string = '';

    constructor(record: Record) {
        this.category = record.category;
        this.Field1 = record.Field1;
        this.Field2 = record.Field2;
        this.Field3 = record.Field3;
        this.Field4 = record.Field4;
    }
}