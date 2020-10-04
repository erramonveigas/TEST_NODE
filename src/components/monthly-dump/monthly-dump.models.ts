export interface ApiResponse {
    items: Items[];
}

export interface Items {
    index: number;
    index_start_at: number;
    integer: number;
    float: number;
    name: string;
    surname: string;
    fullname: string;
    email: string;
    bool: boolean;
}

/**
    {
    "items": [
        {
            "index": 1,
            "index_start_at": 56,
            "integer": 7,
            "float": 12.3075,
            "name": "Judy",
            "surname": "Eason",
            "fullname": "Ralph Adkins",
            "email": "wesley@mcmahon.pk",
            "bool": false
        },
        {...
        ...]
 */