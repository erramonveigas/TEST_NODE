export interface MocResponse {
    items: Item[];
}

export interface Item {
    index:          number;
    index_start_at: number;
    integer:        number;
    float:          number;
    name:           string;
    surname:        string;
    fullname:       string;
    email:          string;
    bool:           boolean;
}

export const CONSTANT = {
    MAX_LENGTH: 999,
    OUTPUT_DIR: 'src/outputs',
}