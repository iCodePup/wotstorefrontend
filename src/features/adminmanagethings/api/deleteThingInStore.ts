import {axios} from "@/lib/axios";


export const deleteThingInStore = (id: number, cb: Function): Promise<boolean> => {
        return axios.delete('/thinginstore/' + id,).catch(error => cb(error))
    }
;
