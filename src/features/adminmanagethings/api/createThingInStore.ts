import {axios} from "@/lib/axios";


export type ThingInStoreDTO = {
    id: number;
    thingId: string;
    name: string;
    description: string;
    prix: number;
};

export const createThingInStore = (data: ThingInStoreDTO, cb: Function): Promise<any> => {
        return axios.post('/thinginstore', data).catch(error => cb(error))
    }
;
