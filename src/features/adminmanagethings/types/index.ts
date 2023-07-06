export type ThingType = {
    id: string;
    title: string;
};

export type ThingTypeDataGrid = {
    key: string;
    value: string;
    label: string;
};

export type ThingInStore = {
    id: number;
    thingId: string;
    name: string;
    description: string;
    prix: number | undefined;
};
